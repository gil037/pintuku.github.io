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

    // If all inputs are valid, send data to ESP32
    if (valid) {
        fetch('http://192.168.4.1/submit', { // Gantilah dengan IP ESP32 yang sesuai
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: 'ssid=' + encodeURIComponent(ssid) + '&password=' + encodeURIComponent(password)
        })
        .then(response => {
            if (response.ok) {
                return response.text();
            } else {
                throw new Error('Network response was not ok.');
            }
        })
        .then(data => {
            alert('Data berhasil dikirim ke ESP32: ' + data);
        })
        .catch(error => {
            alert('Terjadi kesalahan: ' + error.message);
        });

        // Clear the form inputs
        document.getElementById('ssid').value = '';
        document.getElementById('password').value = '';
    }
});
