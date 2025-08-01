// WiFi Setup Section
const rescanBtn = document.getElementById('rescanBtn');
const networkSelect = document.getElementById('networkSelect');
const wifiLoading = document.getElementById('wifiLoading');
const wifiError = document.getElementById('wifiError');
const wifiSuccess = document.getElementById('wifiSuccess');
const wifiForm = document.getElementById('wifiForm');

// Function to scan WiFi networks
async function scanWiFiNetworks() {
    try {
        rescanBtn.disabled = true;
        wifiLoading.style.display = 'block';
        wifiError.style.display = 'none';
        wifiSuccess.style.display = 'none';
        
        const response = await fetch('/scan', {
            method: 'GET'
        });
        
        const data = await response.json();
        
        if (response.ok) {
            networkSelect.innerHTML = '<option value="">Select a network...</option>';
            data.networks.forEach(network => {
                const option = document.createElement('option');
                option.value = network.ssid;
                option.textContent = `${network.ssid} (${network.signal}%)`;
                networkSelect.appendChild(option);
            });
            
            wifiSuccess.textContent = `Found ${data.networks.length} WiFi networks`;
            wifiSuccess.style.display = 'block';
        } else {
            throw new Error(data.error || 'Failed to scan networks');
        }
    } catch (err) {
        wifiError.textContent = err.message;
        wifiError.style.display = 'block';
    } finally {
        rescanBtn.disabled = false;
        wifiLoading.style.display = 'none';
    }
}

rescanBtn.addEventListener('click', scanWiFiNetworks);

wifiForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = new FormData(wifiForm);
    const network = formData.get('network');
    const password = formData.get('password');
    
    if (!network || !password) {
        wifiError.textContent = 'Please select a network and enter a password';
        wifiError.style.display = 'block';
        return;
    }
    
    try {
        const response = await fetch('/connect', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ network, password })
        });
        
        const data = await response.json();
        
        if (response.ok) {
            wifiSuccess.textContent = 'Successfully connected to WiFi network!';
            wifiSuccess.style.display = 'block';
            wifiError.style.display = 'none';
        } else {
            throw new Error(data.error || 'Failed to connect to network');
        }
    } catch (err) {
        wifiError.textContent = err.message;
        wifiError.style.display = 'block';
        wifiSuccess.style.display = 'none';
    }
});

// Printer Setup Section
const printerForm = document.getElementById('printerForm');
const printerLoading = document.getElementById('printerLoading');
const printerError = document.getElementById('printerError');
const printerSuccess = document.getElementById('printerSuccess');

printerForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = new FormData(printerForm);
    const printerName = formData.get('printerName');
    const printerModel = formData.get('printerModel');
    const paperSize = formData.get('paperSize');
    
    if (!printerName || !printerModel || !paperSize) {
        printerError.textContent = 'Please fill in all printer configuration fields';
        printerError.style.display = 'block';
        return;
    }
    
    try {
        printerLoading.style.display = 'block';
        printerError.style.display = 'none';
        printerSuccess.style.display = 'none';
        
        const response = await fetch('/configure-printer', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ printerName, printerModel, paperSize })
        });
        
        const data = await response.json();
        
        if (response.ok) {
            printerSuccess.textContent = 'Printer configured successfully!';
            printerSuccess.style.display = 'block';
        } else {
            throw new Error(data.error || 'Failed to configure printer');
        }
    } catch (err) {
        printerError.textContent = err.message;
        printerError.style.display = 'block';
        printerSuccess.style.display = 'none';
    } finally {
        printerLoading.style.display = 'none';
    }
});

// OpenSteri Credentials Section
const credentialsForm = document.getElementById('credentialsForm');
const credentialsLoading = document.getElementById('credentialsLoading');
const credentialsError = document.getElementById('credentialsError');
const credentialsSuccess = document.getElementById('credentialsSuccess');

credentialsForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = new FormData(credentialsForm);
    const joinToken = formData.get('joinToken');
    
    if (!joinToken) {
        credentialsError.textContent = 'Please enter your join token';
        credentialsError.style.display = 'block';
        return;
    }
    
    try {
        credentialsLoading.style.display = 'block';
        credentialsError.style.display = 'none';
        credentialsSuccess.style.display = 'none';
        
        const response = await fetch('/connect-openteri', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ joinToken })
        });
        
        const data = await response.json();
        
        if (response.ok) {
            credentialsSuccess.textContent = 'Successfully connected to OpenSteri.com!';
            credentialsSuccess.style.display = 'block';
        } else {
            throw new Error(data.error || 'Failed to connect to OpenSteri');
        }
    } catch (err) {
        credentialsError.textContent = err.message;
        credentialsError.style.display = 'block';
        credentialsSuccess.style.display = 'none';
    } finally {
        credentialsLoading.style.display = 'none';
    }
}); 