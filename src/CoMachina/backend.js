// Refresh Button
function refreshWebView() {
    console.log("Refreshing WebView...");
    window.chrome.webview.postMessage('refreshWebView2');
}

// Microsoft Bing/Copilot Button
function openCopilot() {
    window.chrome.webview.postMessage('openCopilot');
}

// Quick help in Dropdown with question/answers
function dropdownChanged() {
    var selectedIndex = document.getElementById('dropdown').selectedIndex;
    window.chrome.webview.postMessage("showAnswerForDropdown:" + selectedIndex.toString());
}

// Handle scrolling to bottom
function scrollToBottom() {
    var logContainer = document.getElementById('logContainer');
    logContainer.scrollTop = logContainer.scrollHeight;
}

// Handle log messages to logContainer
window.addEventListener('DOMContentLoaded', () => {
    window.chrome.webview.addEventListener('message', (event) => {
        const logContainer = document.getElementById('logContainer');
        logContainer.innerHTML += event.data;
    });
});

// Interop code > Checkboxes and Buttons for System / Privacy / Personalization / Diagnostic features
function getSelectedItems() {
    var checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');
    var selectedItems = [];
    checkboxes.forEach(function (checkbox) {
        selectedItems.push({ id: checkbox.id, checked: checkbox.checked });
    });

    return selectedItems;
}

function updateLog(id, isChecked) {
    var logContainer = document.getElementById('logContainer');
    var logMessage = isChecked ? `Feature ID '${id}' is enabled.` : `Feature ID '${id}' is disabled.`;
    logContainer.innerHTML += logMessage + '<br>';
}

function searchFeatures() {
    console.log('Search Features clicked');
    var selectedItems = getSelectedItems();
    window.chrome.webview.postMessage(JSON.stringify({ action: 'search', checkboxes: selectedItems }));
}

function enableFeatures() {
    console.log('Enable Features clicked');
    var selectedItems = getSelectedItems();
    if (selectedItems.length > 0) {
        window.chrome.webview.postMessage(JSON.stringify({ action: 'enable', checkboxes: selectedItems }));
    }
}

function disableFeatures() {
    console.log('Disable Features clicked');
    var selectedItems = getSelectedItems();
    if (selectedItems.length > 0) {
        window.chrome.webview.postMessage(JSON.stringify({ action: 'disable', checkboxes: selectedItems }));
    }
}

function openAccountSettings() {
    window.chrome.webview.postMessage('openAccountSettings');
}

function openBackupSettings() {
    window.chrome.webview.postMessage('openBackupSettings');
}

function openPinSettings() {
    window.chrome.webview.postMessage('openPinSettings');
}

function openUpdateSettings() {
    window.chrome.webview.postMessage('openUpdateSettings');
}

function openWallpaperSettings() {
    window.chrome.webview.postMessage('openWallpaperSettings');
}

function openThemeSettings() {
    window.chrome.webview.postMessage('openThemeSettings');
}

function checkEventViewerLogs() {
    window.chrome.webview.postMessage('checkEventViewer');
}

//  App Installer code
function installSelectedApps() {
    var selectedApps = [];

    // Get all toggle switches
    var toggles = document.querySelectorAll('.toggle-switch-checkbox');

    // Iterate through toggle switches
    toggles.forEach(function (toggle) {
        var appId = toggle.id.replace('Toggle', ''); // Extract appId from toggle ID
        var wingetIdElement = document.getElementById(appId + 'WingetId');

        if (wingetIdElement) {
            var wingetId = wingetIdElement.innerText;

            selectedApps.push({
                id: appId,
                checked: toggle.checked,
                wingetId: wingetId
            });
        } else {
            console.log(`Error: Winget ID element not found for ${toggle.id}`);
        }
    });

    // Log selected apps to console for debugging
    console.log('Selected Apps:', selectedApps);

    // Send selected apps to WebView2
    var message = JSON.stringify({
        action: 'installSelectedApps',
        checkboxes: selectedApps // No need to wrap in an additional object
    });

    console.log('Sending message:', message);
    window.chrome.webview.postMessage(message);
}

// Set up click event for button outside of function definition
document.getElementById('btnInstallSelectedApps').onclick = function () {
    // Call the installSelectedApps function when button is clicked
    installSelectedApps();
};

// Appx Uninstaller (Crapware)
// Declare selectedPackages in the global scope
var selectedPackages = selectedPackages || [];

function updateSelectedPackages(packageFamilyName) {
    // Make sure selectedPackages is an array before using indexOf
    selectedPackages = selectedPackages || [];

    var index = selectedPackages.indexOf(packageFamilyName);
    if (index === -1) {
        selectedPackages.push(packageFamilyName);
    } else {
        selectedPackages.splice(index, 1);
    }
}

function removeSelectedPackages() {
    console.log("Removing selected packages...");
    console.log(selectedPackages);
    window.chrome.webview.postMessage(JSON.stringify({ action: 'removeSelectedPackages', selectedPackages: selectedPackages }));
}

/*function loadInstalledPackages() {
    console.log("Loading installed packages...");
    window.chrome.webview.postMessage(JSON.stringify({ action: 'loadInstalledPackages' }));
}*/

function searchCustomCrapware() {
    console.log("Searching for custom crapware...");
    window.chrome.webview.postMessage('searchCustomCrapware');
}

function removeCustomCrapware() {
    console.log("Removing custom crapware...");
    window.chrome.webview.postMessage('removeCustomCrapware');
}