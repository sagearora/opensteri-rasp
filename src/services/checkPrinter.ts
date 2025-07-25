import { Device, OutEndpoint, findByIds, usb } from 'usb';
import { format } from 'date-fns';

const PRINTER_VENDOR_ID = 6495;
const PRINTER_PRODUCT_ID = 1;

let device: Device | undefined;
let out_endpoint: OutEndpoint | undefined;

// Store the last known printer connection state
let printerConnectionState = {
    connected: false,
    lastUpdated: new Date().toISOString(),
    vendorId: PRINTER_VENDOR_ID,
    productId: PRINTER_PRODUCT_ID
};

const updatePrinterState = (connected: boolean) => {
    printerConnectionState = {
        ...printerConnectionState,
        connected,
        lastUpdated: new Date().toISOString()
    };
    console.log(`Printer state updated: ${connected ? 'connected' : 'disconnected'} at ${printerConnectionState.lastUpdated}`);
};

const initDevice = (_device: Device) => {
    console.log('Check GoDEX printer status')
    _device.open()
    const ifc = _device.interface(0)
    if (ifc.isKernelDriverActive()) {
        try {
            ifc.detachKernelDriver()
        } catch (e) {
            console.error('Error detaching kernel driver', e)
            _device.close()
            updatePrinterState(false);
            return
        }
    }
    ifc.claim()
    const endpoint = ifc.endpoints.find(e => e.direction === 'out') as OutEndpoint | undefined
    if (!endpoint) {
        ifc.release()
        _device.close()
        console.error('Failed to get out endpoint for GODEX printer')
        updatePrinterState(false);
        return
    }
    out_endpoint = endpoint
    device = _device
    updatePrinterState(true);
}


usb.on('attach', d => {
    if (d.deviceDescriptor.idVendor === PRINTER_VENDOR_ID && d.deviceDescriptor.idProduct === PRINTER_PRODUCT_ID) {
        initDevice(d)
    }
})

usb.on('detach', () => {
    const _device = findByIds(PRINTER_VENDOR_ID, PRINTER_PRODUCT_ID)
    if (!_device) {
        device = undefined
        out_endpoint = undefined
        updatePrinterState(false);
    }
})

const connected = findByIds(PRINTER_VENDOR_ID, PRINTER_PRODUCT_ID)
if (connected) {
    initDevice(connected)
} else {
    updatePrinterState(false);
}

export const isPrinterConnected = () => {
    if (!!device && !!out_endpoint) {
        return true
    }
    return false
}

// Export function to get the current printer state
export const getPrinterState = () => {
    return printerConnectionState;
}

export const sendToPrinter = async (cmd: string) => {
    return new Promise((res, rej) => {
        if (out_endpoint) {
            out_endpoint.transfer(Buffer.from(cmd, 'utf-8'), (error, size) => {
                if (error) {
                    rej(error)
                    return
                }
                res(size)
            })
        }
        rej('Printer not available.')
    })
}

export const PrinterLayoutCmd = `^Q25,3\n^W50\n^H5\n^P1\n^S2\n^AD\n^C1\n^R0\n~Q+0\n^O0\n^D0\n^E12\n~R255`
const MaxContentSize = 14

export const createLabelCmd = ({
    id,
    name,
    category,
    user_name,
    created_at,
    expiry_at,
    qr,
}: {
    id: string;
    name: string,
    category: string,
    user_name: string;
    created_at: string;
    expiry_at: string;
    qr: string;
    }) => {
    return `^L\nDy2-me-dd\nTh:m:s\nAA,4,9,1,1,0,0,#${id} - ${category}\nAC,4,29,1,1,0,0,${name.slice(0, MaxContentSize)}\nAC,4,59,1,1,0,0,${name.slice(MaxContentSize, MaxContentSize * 2)}\nAC,4,100,1,1,0,0,${user_name}\nAA,4,135,1,1,0,0,Date: ${format(created_at, 'YYYY-MM-DD HH:mm')}\nAA,4,162,1,1,0,0,Exp: ${format(expiry_at, 'YYYY-MM-DD HH:mm')}\nW218,9,5,2,M0,8,6,${qr.length},0\n${qr}\nE\n`

}