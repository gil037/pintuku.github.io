document.getElementById('wifiForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Clear previous error messages
    document.getElementById('ssidError').style.display = 'none';
    document.getElementById('passwordError').style.display = 'none';

    let ssid = document.getElementById('ssid').value.trim();
    let password = document.getElementById('password').value.trim();
    let valid = true;

    // Validate SSID
    if (!ssid) {
        document.getElementById('ssidError').innerText = 'SSID tidak boleh kosong';
        document.getElementById('ssidError').style.display = 'block';
        valid = false;
    }

    // Validate Password
    if (!password) {
        document.getElementById('passwordError').innerText = 'Password tidak boleh kosong';
        document.getElementById('passwordError').style.display = 'block';
        valid = false;
    }

    // If all inputs are valid, show success message and clear the form
    if (valid) {
        alert('Semua inputan terisi dengan benar!');
        
        // Clear the form inputs
        document.getElementById('ssid').value = '';
        document.getElementById('password').value = '';
    }
});
