// WiFi Setup Section - Elements
const wifiStatus = document.getElementById('wifiStatus');
const wifiConnectForm = document.getElementById('wifiConnectForm');
const wifiEditForm = document.getElementById('wifiEditForm');
const connectedNetwork = document.getElementById('connectedNetwork');
const connectionDetails = document.getElementById('connectionDetails');
const editWifiBtn = document.getElementById('editWifiBtn');
const disconnectWifiBtn = document.getElementById('disconnectWifiBtn');
const cancelEditBtn = document.getElementById('cancelEditBtn');

// Compact WiFi elements
const wifiCompactStatus = document.getElementById('wifiCompactStatus');
const compactNetworkName = document.getElementById('compactNetworkName');
const compactNetworkDetails = document.getElementById('compactNetworkDetails');
const compactEditWifiBtn = document.getElementById('compactEditWifiBtn');
const compactDisconnectWifiBtn = document.getElementById('compactDisconnectWifiBtn');

// Form elements
const rescanBtn = document.getElementById('rescanBtn');
const networkSelect = document.getElementById('networkSelect');
const wifiLoading = document.getElementById('wifiLoading');
const wifiError = document.getElementById('wifiError');
const wifiSuccess = document.getElementById('wifiSuccess');
const wifiForm = document.getElementById('wifiForm');

// Edit form elements
const editRescanBtn = document.getElementById('editRescanBtn');
const editNetworkSelect = document.getElementById('editNetworkSelect');
const editPassword = document.getElementById('editPassword');
const editWifiForm = document.getElementById('editWifiForm');

// Current WiFi status
let currentWifiStatus = null;

// Function to check WiFi status
async function checkWiFiStatus() {
    try {
        wifiLoading.style.display = 'block';
        wifiError.style.display = 'none';
        wifiSuccess.style.display = 'none';
        
        const response = await fetch('/status', {
            method: 'GET'
        });
        
        const data = await response.json();
        
        if (response.ok) {
            currentWifiStatus = data;
            updateWiFiUI(data);
        } else {
            throw new Error(data.error || 'Failed to check WiFi status');
        }
    } catch (err) {
        wifiError.textContent = err.message;
        wifiError.style.display = 'block';
        // Show connect form as fallback
        showConnectForm();
    } finally {
        wifiLoading.style.display = 'none';
    }
}

// Function to update WiFi UI based on status
function updateWiFiUI(status) {
    if (status.connected && status.device) {
        showWiFiCompactStatus(status);
    } else {
        showConnectForm();
    }
}

// Function to show WiFi compact status
function showWiFiCompactStatus(status) {
    wifiCompactStatus.style.display = 'block';
    wifiStatus.style.display = 'none';
    wifiConnectForm.style.display = 'none';
    wifiEditForm.style.display = 'none';
    
    // Update compact status display
    compactNetworkName.textContent = status.device.connection || 'Unknown Network';
    
    const details = [];
    if (status.network) {
        details.push(`Signal: ${status.network.signal}%`);
    }
    if (status.ipAddress && status.ipAddress !== 'Unknown') {
        details.push(`IP: ${status.ipAddress}`);
    }
    details.push('Connected');
    
    compactNetworkDetails.textContent = details.join(' • ');
}

// Function to show WiFi connection status
function showWiFiStatus(status) {
    wifiCompactStatus.style.display = 'none';
    wifiStatus.style.display = 'block';
    wifiConnectForm.style.display = 'none';
    wifiEditForm.style.display = 'none';
    
    // Update status display
    connectedNetwork.textContent = status.device.connection || 'Unknown Network';
    
    const details = [];
    if (status.network) {
        details.push(`Signal: ${status.network.signal}%`);
        if (status.network.security) {
            details.push(`Security: ${status.network.security}`);
        }
    }
    if (status.ipAddress && status.ipAddress !== 'Unknown') {
        details.push(`IP: ${status.ipAddress}`);
    }
    
    connectionDetails.textContent = details.length > 0 ? details.join(' • ') : 'Connected';
}

// Function to show WiFi connect form
function showConnectForm() {
    wifiCompactStatus.style.display = 'none';
    wifiStatus.style.display = 'none';
    wifiConnectForm.style.display = 'block';
    wifiEditForm.style.display = 'none';
    wifiError.style.display = 'none';
    wifiSuccess.style.display = 'none';
}

// Function to show WiFi edit form
function showEditForm() {
    wifiCompactStatus.style.display = 'none';
    wifiStatus.style.display = 'none';
    wifiConnectForm.style.display = 'none';
    wifiEditForm.style.display = 'block';
    
    // Pre-populate with current network if available
    if (currentWifiStatus && currentWifiStatus.device) {
        editNetworkSelect.value = currentWifiStatus.device.connection;
    }
    
    // Load available networks
    loadNetworksForEdit();
}

// Function to scan WiFi networks for connect form
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
                const securityText = network.security && network.security !== 'Unknown' ? ` • ${network.security}` : '';
                option.textContent = `${network.ssid} (${network.signal}%${securityText})`;
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

// Function to load networks for edit form
async function loadNetworksForEdit() {
    try {
        editRescanBtn.disabled = true;
        wifiLoading.style.display = 'block';
        
        const response = await fetch('/scan', {
            method: 'GET'
        });
        
        const data = await response.json();
        
        if (response.ok) {
            editNetworkSelect.innerHTML = '<option value="">Select a network...</option>';
            data.networks.forEach(network => {
                const option = document.createElement('option');
                option.value = network.ssid;
                const securityText = network.security && network.security !== 'Unknown' ? ` • ${network.security}` : '';
                option.textContent = `${network.ssid} (${network.signal}%${securityText})`;
                editNetworkSelect.appendChild(option);
            });
        } else {
            throw new Error(data.error || 'Failed to scan networks');
        }
    } catch (err) {
        console.error('Error loading networks for edit:', err);
    } finally {
        editRescanBtn.disabled = false;
        wifiLoading.style.display = 'none';
    }
}

// Event Listeners
rescanBtn.addEventListener('click', scanWiFiNetworks);
editRescanBtn.addEventListener('click', loadNetworksForEdit);

editWifiBtn.addEventListener('click', showEditForm);
compactEditWifiBtn.addEventListener('click', showEditForm);
cancelEditBtn.addEventListener('click', () => {
    if (currentWifiStatus && currentWifiStatus.connected) {
        showWiFiCompactStatus(currentWifiStatus);
    } else {
        showConnectForm();
    }
});

disconnectWifiBtn.addEventListener('click', async () => {
    await disconnectWiFi();
});

compactDisconnectWifiBtn.addEventListener('click', async () => {
    await disconnectWiFi();
});

async function disconnectWiFi() {
    if (confirm('Are you sure you want to disconnect from the current WiFi network?')) {
        try {
            wifiLoading.style.display = 'block';
            wifiError.style.display = 'none';
            
            // Get the current WiFi SSID from the status
            if (!currentWifiStatus || !currentWifiStatus.connected || !currentWifiStatus.device || !currentWifiStatus.device.connection) {
                throw new Error('No WiFi connection found to disconnect');
            }
            
            const ssid = currentWifiStatus.device.connection;
            
            // Use nmcli to disconnect with the SSID
            const response = await fetch('/disconnect', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ ssid })
            });
            
            if (response.ok) {
                showConnectForm();
                wifiSuccess.textContent = 'Successfully disconnected from WiFi network';
                wifiSuccess.style.display = 'block';
            } else {
                const data = await response.json();
                throw new Error(data.error || 'Failed to disconnect');
            }
        } catch (err) {
            wifiError.textContent = err.message;
            wifiError.style.display = 'block';
            
            // Display additional error details if available
            if (err.response && err.response.data) {
                const errorData = err.response.data;
                if (errorData.details) {
                    wifiError.innerHTML += `<br><small>${errorData.details}</small>`;
                }
                if (errorData.solutions && errorData.solutions.length > 0) {
                    wifiError.innerHTML += '<br><strong>Solutions:</strong><ul>';
                    errorData.solutions.forEach(solution => {
                        wifiError.innerHTML += `<li>${solution}</li>`;
                    });
                    wifiError.innerHTML += '</ul>';
                }
            }
        } finally {
            wifiLoading.style.display = 'none';
        }
    }
}

// WiFi Connect Form Submit
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
        wifiLoading.style.display = 'block';
        wifiError.style.display = 'none';
        wifiSuccess.style.display = 'none';
        
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
            // Refresh status after successful connection
            setTimeout(checkWiFiStatus, 2000);
        } else {
            throw new Error(data.error || 'Failed to connect to network');
        }
    } catch (err) {
        wifiError.textContent = err.message;
        wifiError.style.display = 'block';
        wifiSuccess.style.display = 'none';
        
        // Display additional error details if available
        if (err.response && err.response.data) {
            const errorData = err.response.data;
            if (errorData.details) {
                wifiError.innerHTML += `<br><small>${errorData.details}</small>`;
            }
            if (errorData.solutions && errorData.solutions.length > 0) {
                wifiError.innerHTML += '<br><strong>Solutions:</strong><ul>';
                errorData.solutions.forEach(solution => {
                    wifiError.innerHTML += `<li>${solution}</li>`;
                });
                wifiError.innerHTML += '</ul>';
            }
        }
    } finally {
        wifiLoading.style.display = 'none';
    }
});

// Initialize WiFi status on page load
document.addEventListener('DOMContentLoaded', () => {
    // Show initial loading states
    wifiLoading.style.display = 'block';
    credentialsLoading.style.display = 'block';
    printerLoading.style.display = 'block';
    
    // Check statuses
    checkWiFiStatus();
    checkOpensteriStatus();
    checkPrinterStatus();
});

// OpenSteri Connection Section
const credentialsLoading = document.getElementById('credentialsLoading');
const credentialsError = document.getElementById('credentialsError');
const credentialsSuccess = document.getElementById('credentialsSuccess');

// OpenSteri status elements
const opensteriStatus = document.getElementById('opensteriStatus');
const opensteriConnectForm = document.getElementById('opensteriConnectForm');
const joinCodeSection = document.getElementById('joinCodeSection');
const connectedAccount = document.getElementById('connectedAccount');
const opensteriConnectionDetails = document.getElementById('connectionDetails');
const disconnectOpensteriBtn = document.getElementById('disconnectOpensteriBtn');

// Compact OpenSteri elements
const opensteriCompactStatus = document.getElementById('opensteriCompactStatus');
const compactOpensteriDetails = document.getElementById('compactOpensteriDetails');
const compactDisconnectOpensteriBtn = document.getElementById('compactDisconnectOpensteriBtn');

// Form elements
const joinCodeForm = document.getElementById('joinCodeForm');

// Current OpenSteri status
let currentOpensteriStatus = null;

// Function to check OpenSteri connection status
async function checkOpensteriStatus() {
    try {
        credentialsLoading.style.display = 'block';
        credentialsError.style.display = 'none';
        credentialsSuccess.style.display = 'none';
        
        const response = await fetch('/token-status', {
            method: 'GET'
        });
        
        const data = await response.json();
        
        if (response.ok) {
            currentOpensteriStatus = data;
            updateOpensteriUI(data);
        } else {
            throw new Error(data.error || 'Failed to check OpenSteri status');
        }
    } catch (err) {
        credentialsError.textContent = err.message;
        credentialsError.style.display = 'block';
        // Show connect form as fallback
        showOpensteriConnectForm();
    } finally {
        credentialsLoading.style.display = 'none';
    }
}

// Function to update OpenSteri UI based on status
function updateOpensteriUI(status) {
    if (status.hasToken && status.hasPrinterId) {
        showOpensteriCompactStatus(status);
    } else {
        showOpensteriConnectForm();
    }
}

// Function to show OpenSteri compact status
function showOpensteriCompactStatus(status) {
    opensteriCompactStatus.style.display = 'block';
    opensteriStatus.style.display = 'none';
    opensteriConnectForm.style.display = 'none';
    joinCodeSection.style.display = 'none';
    
    // Update compact status display
    const details = [];
    if (status.printerId) {
        details.push(`Printer ID: ${status.printerId}`);
    }
    if (status.token) {
        details.push('Token: Active');
    }
    
    compactOpensteriDetails.textContent = details.length > 0 ? details.join(' • ') : 'Connected';
}

// Function to show OpenSteri connection status
function showOpensteriStatus(status) {
    opensteriCompactStatus.style.display = 'none';
    opensteriStatus.style.display = 'block';
    opensteriConnectForm.style.display = 'none';
    joinCodeSection.style.display = 'none';
    
    // Update status display
    connectedAccount.textContent = 'OpenSteri Account';
    
    const details = [];
    if (status.printerId) {
        details.push(`Printer ID: ${status.printerId}`);
    }
    if (status.token) {
        details.push('Token: Active');
    }
    
    opensteriConnectionDetails.textContent = details.length > 0 ? details.join(' • ') : 'Connected';
}

// Function to show OpenSteri connect form
function showOpensteriConnectForm() {
    opensteriCompactStatus.style.display = 'none';
    opensteriStatus.style.display = 'none';
    opensteriConnectForm.style.display = 'block';
    joinCodeSection.style.display = 'block';
    credentialsError.style.display = 'none';
    credentialsSuccess.style.display = 'none';
}

// Event Listeners for OpenSteri management
disconnectOpensteriBtn.addEventListener('click', async () => {
    await disconnectOpensteri();
});

compactDisconnectOpensteriBtn.addEventListener('click', async () => {
    await disconnectOpensteri();
});

async function disconnectOpensteri() {
    if (confirm('Are you sure you want to disconnect the printer? This will unpair the printer from your account.')) {
        try {
            credentialsLoading.style.display = 'block';
            credentialsError.style.display = 'none';
            credentialsSuccess.style.display = 'none';
            
            // Disconnect the printer by updating paired_at to null
            const response = await fetch('/disconnect-printer-paired', {
                method: 'POST'
            });
            
            if (response.ok) {
                showOpensteriConnectForm();
                credentialsSuccess.textContent = 'Successfully disconnected printer';
                credentialsSuccess.style.display = 'block';
                // Refresh status after successful disconnection
                setTimeout(checkOpensteriStatus, 2000);
            } else {
                const data = await response.json();
                throw new Error(data.error || 'Failed to disconnect printer');
            }
        } catch (err) {
            credentialsError.textContent = err.message;
            credentialsError.style.display = 'block';
        } finally {
            credentialsLoading.style.display = 'none';
        }
    }
}

// Join Code Form Submit
joinCodeForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = new FormData(joinCodeForm);
    const joinCode = formData.get('joinToken');
    
    if (!joinCode) {
        credentialsError.textContent = 'Please enter your join code';
        credentialsError.style.display = 'block';
        return;
    }
    
    try {
        credentialsLoading.style.display = 'block';
        credentialsError.style.display = 'none';
        credentialsSuccess.style.display = 'none';
        
        const response = await fetch('/join', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ join_code: joinCode })
        });
        
        const data = await response.json();
        
        if (response.ok) {
            credentialsSuccess.textContent = 'Successfully joined OpenSteri! Access token saved and heartbeat started.';
            credentialsSuccess.style.display = 'block';
            // Refresh status after successful join
            setTimeout(checkOpensteriStatus, 2000);
        } else {
            throw new Error(data.error || 'Failed to join OpenSteri');
        }
    } catch (err) {
        credentialsError.textContent = err.message;
        credentialsError.style.display = 'block';
        credentialsSuccess.style.display = 'none';
    } finally {
        credentialsLoading.style.display = 'none';
    }
});

// Printer Detection Section
const printerLoading = document.getElementById('printerLoading');
const printerError = document.getElementById('printerError');
const printerSuccess = document.getElementById('printerSuccess');

// Printer status elements
const printerStatus = document.getElementById('printerStatus');
const printerConnectForm = document.getElementById('printerConnectForm');
const connectedPrinter = document.getElementById('connectedPrinter');
const printerDetails = document.getElementById('printerDetails');
const testPrintBtn = document.getElementById('testPrintBtn');
const refreshPrinterBtn = document.getElementById('refreshPrinterBtn');

// Compact printer elements
const printerCompactStatus = document.getElementById('printerCompactStatus');
const compactPrinterName = document.getElementById('compactPrinterName');
const compactPrinterDetails = document.getElementById('compactPrinterDetails');
const compactTestPrintBtn = document.getElementById('compactTestPrintBtn');
const compactRefreshPrinterBtn = document.getElementById('compactRefreshPrinterBtn');

// Printer detection elements
const detectPrinterBtn = document.getElementById('detectPrinterBtn');
const playSetupVideoBtn = document.getElementById('playSetupVideoBtn');

// Video modal elements
const videoModal = document.getElementById('videoModal');
const closeVideoBtn = document.getElementById('closeVideoBtn');
const setupVideo = document.getElementById('setupVideo');

// Current printer status
let currentPrinterStatus = null;

// Function to check printer status
async function checkPrinterStatus() {
    try {
        printerLoading.style.display = 'block';
        printerError.style.display = 'none';
        printerSuccess.style.display = 'none';
        
        const response = await fetch('/printer-status', {
            method: 'GET'
        });
        
        const data = await response.json();
        
        if (response.ok) {
            currentPrinterStatus = data;
            updatePrinterUI(data);
        } else {
            throw new Error(data.error || 'Failed to check printer status');
        }
    } catch (err) {
        printerError.textContent = err.message;
        printerError.style.display = 'block';
        // Show connect form as fallback
        showPrinterConnectForm();
    } finally {
        printerLoading.style.display = 'none';
    }
}

// Function to update printer UI based on status
function updatePrinterUI(status) {
    if (status.connected && status.printer) {
        showPrinterCompactStatus(status);
    } else {
        showPrinterConnectForm();
    }
}

// Function to show printer compact status
function showPrinterCompactStatus(status) {
    printerCompactStatus.style.display = 'block';
    printerStatus.style.display = 'none';
    printerConnectForm.style.display = 'none';
    
    // Update compact status display
    compactPrinterName.textContent = status.printer.name || 'Godex Printer';
    
    const details = [];
    if (status.printer.port) {
        details.push(`Port: ${status.printer.port}`);
    }
    if (status.printer.status) {
        details.push(status.printer.status);
    }
    details.push('Connected');
    
    compactPrinterDetails.textContent = details.join(' • ');
}

// Function to show printer connection status
function showPrinterStatus(status) {
    printerCompactStatus.style.display = 'none';
    printerStatus.style.display = 'block';
    printerConnectForm.style.display = 'none';
    
    // Update status display
    connectedPrinter.textContent = status.printer.name || 'Godex Printer';
    
    const details = [];
    if (status.printer.port) {
        details.push(`Port: ${status.printer.port}`);
    }
    if (status.printer.status) {
        details.push(status.printer.status);
    }
    details.push('Connected');
    
    printerDetails.textContent = details.join(' • ');
}

// Function to show printer connect form
function showPrinterConnectForm() {
    printerCompactStatus.style.display = 'none';
    printerStatus.style.display = 'none';
    printerConnectForm.style.display = 'block';
    printerError.style.display = 'none';
    printerSuccess.style.display = 'none';
}

// Event Listeners for printer management
testPrintBtn.addEventListener('click', async () => {
    await testPrint();
});

compactTestPrintBtn.addEventListener('click', async () => {
    await testPrint();
});

refreshPrinterBtn.addEventListener('click', async () => {
    await checkPrinterStatus();
});

compactRefreshPrinterBtn.addEventListener('click', async () => {
    await checkPrinterStatus();
});

detectPrinterBtn.addEventListener('click', async () => {
    await checkPrinterStatus();
});

playSetupVideoBtn.addEventListener('click', () => {
    videoModal.style.display = 'flex';
    // Reset video to beginning
    if (setupVideo) {
        setupVideo.currentTime = 0;
    }
});

closeVideoBtn.addEventListener('click', () => {
    videoModal.style.display = 'none';
    // Pause video when closing
    if (setupVideo) {
        setupVideo.pause();
    }
});

// Close modal when clicking outside
videoModal.addEventListener('click', (e) => {
    if (e.target === videoModal) {
        videoModal.style.display = 'none';
        if (setupVideo) {
            setupVideo.pause();
        }
    }
});

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && videoModal.style.display === 'flex') {
        videoModal.style.display = 'none';
        if (setupVideo) {
            setupVideo.pause();
        }
    }
});

async function testPrint() {
    try {
        printerLoading.style.display = 'block';
        printerError.style.display = 'none';
        printerSuccess.style.display = 'none';
        
        const response = await fetch('/test-print', {
            method: 'POST'
        });
        
        const data = await response.json();
        
        if (response.ok) {
            printerSuccess.textContent = 'Test print sent successfully! Check your printer for the test label.';
            printerSuccess.style.display = 'block';
        } else {
            throw new Error(data.error || 'Failed to send test print');
        }
    } catch (err) {
        printerError.textContent = err.message;
        printerError.style.display = 'block';
    } finally {
        printerLoading.style.display = 'none';
    }
} 