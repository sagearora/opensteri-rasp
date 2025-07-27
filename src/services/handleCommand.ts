import { Printer_Command_Type_Enum, PrinterCommandFragment, Sdk } from "../__generated/graphql";

export const handleCommand = async (sdk: Sdk, command: PrinterCommandFragment) => {
    let result: any = null
    switch (command.command) {
        case Printer_Command_Type_Enum.PrintTest:
            result = printLabel(command.data);
            break;
        default:
            console.log('Unknown command:', command);
    }
    await sdk.updatePrinterCommand({
        id: command.id,
        set: {
            executed_at: new Date().toISOString(),
            result,
        }
    })
}

const printLabel = (data: any) => {
    console.log('Printing label:', data);
}