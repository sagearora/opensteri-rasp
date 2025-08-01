// WiFi Setup Section - Elements
const wifiStatus = document.getElementById('wifiStatus');
const wifiConnectForm = document.getElementById('wifiConnectForm');
const wifiEditForm = document.getElementById('wifiEditForm');
const connectedNetwork = document.getElementById('connectedNetwork');
const connectionDetails = document.getElementById('connectionDetails');
const editWifiBtn = document.getElementById('editWifiBtn');
const disconnectWifiBtn = document.getElementById('disconnectWifiBtn');
const cancelEditBtn = document.getElementById('cancelEditBtn');

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
        showWiFiStatus(status);
    } else {
        showConnectForm();
    }
}

// Function to show WiFi connection status
function showWiFiStatus(status) {
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
    wifiStatus.style.display = 'none';
    wifiConnectForm.style.display = 'block';
    wifiEditForm.style.display = 'none';
    wifiError.style.display = 'none';
    wifiSuccess.style.display = 'none';
}

// Function to show WiFi edit form
function showEditForm() {
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
    }
}

// Event Listeners
rescanBtn.addEventListener('click', scanWiFiNetworks);
editRescanBtn.addEventListener('click', loadNetworksForEdit);

editWifiBtn.addEventListener('click', showEditForm);
cancelEditBtn.addEventListener('click', () => {
    if (currentWifiStatus && currentWifiStatus.connected) {
        showWiFiStatus(currentWifiStatus);
    } else {
        showConnectForm();
    }
});

disconnectWifiBtn.addEventListener('click', async () => {
    if (confirm('Are you sure you want to disconnect from the current WiFi network?')) {
        try {
            wifiLoading.style.display = 'block';
            wifiError.style.display = 'none';
            
            // Use nmcli to disconnect
            const response = await fetch('/disconnect', {
                method: 'POST'
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
});

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

// WiFi Edit Form Submit
editWifiForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = new FormData(editWifiForm);
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
            wifiSuccess.textContent = 'Successfully updated WiFi connection!';
            wifiSuccess.style.display = 'block';
            // Refresh status after successful connection
            setTimeout(checkWiFiStatus, 2000);
        } else {
            throw new Error(data.error || 'Failed to update network connection');
        }
    } catch (err) {
        wifiError.textContent = err.message;
        wifiError.style.display = 'block';
        wifiSuccess.style.display = 'none';
    } finally {
        wifiLoading.style.display = 'none';
    }
});

// Initialize WiFi status on page load
document.addEventListener('DOMContentLoaded', () => {
    checkWiFiStatus();
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
    const joinCode = formData.get('joinToken'); // Keep the form field name as joinToken for backward compatibility
    
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
            credentialsSuccess.textContent = 'Successfully joined OpenSteri! Access token saved.';
            credentialsSuccess.style.display = 'block';
            
            // Show additional success details if available
            if (data.printer_id) {
                credentialsSuccess.innerHTML += `<br><small>Printer ID: ${data.printer_id}</small>`;
            }
        } else {
            throw new Error(data.error || 'Failed to join OpenSteri');
        }
    } catch (err) {
        credentialsError.textContent = err.message;
        credentialsError.style.display = 'block';
        credentialsSuccess.style.display = 'none';
        
        // Display additional error details if available
        if (err.response && err.response.data) {
            const errorData = err.response.data;
            if (errorData.details) {
                credentialsError.innerHTML += `<br><small>${errorData.details}</small>`;
            }
        }
    } finally {
        credentialsLoading.style.display = 'none';
    }
});

// Token Status Check
const checkTokenBtn = document.getElementById('checkTokenBtn');
const tokenStatus = document.getElementById('tokenStatus');
const tokenStatusText = document.getElementById('tokenStatusText');

checkTokenBtn.addEventListener('click', async () => {
    try {
        tokenStatus.style.display = 'block';
        tokenStatusText.textContent = 'Checking token status...';
        checkTokenBtn.disabled = true;
        
        const response = await fetch('/token-status', {
            method: 'GET'
        });
        
        const data = await response.json();
        
        if (response.ok) {
            if (data.hasToken && data.hasPrinterId) {
                tokenStatus.className = 'status-indicator status-success';
                tokenStatusText.innerHTML = '<span>✅</span> Token and Printer ID available';
            } else if (data.hasToken) {
                tokenStatus.className = 'status-indicator status-warning';
                tokenStatusText.innerHTML = '<span>⚠️</span> Token available but no Printer ID';
            } else {
                tokenStatus.className = 'status-indicator status-error';
                tokenStatusText.innerHTML = '<span>❌</span> No token found';
            }
        } else {
            throw new Error(data.error || 'Failed to check token status');
        }
    } catch (err) {
        tokenStatus.className = 'status-indicator status-error';
        tokenStatusText.innerHTML = `<span>❌</span> Error: ${err.message}`;
    } finally {
        checkTokenBtn.disabled = false;
    }
}); 