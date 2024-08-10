document.getElementById('wifiForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Clear previous error messages
    document.getElementById('ipError').style.display = 'none';
    document.getElementById('ssidError').style.display = 'none';
    document.getElementById('passwordError').style.display = 'none';

    let ip = document.getElementById('ip').value.trim();
    let ssid = document.getElementById('ssid').value.trim();
    let password = document.getElementById('password').value.trim();
    let valid = true;

    // Validate IP
    const ipRegex = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    if (!ipRegex.test(ip)) {
        document.getElementById('ipError').innerText = 'IP tidak valid';
        document.getElementById('ipError').style.display = 'block';
        valid = false;
    }

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
        fetch(`http://${ip}/submit`, {
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
        document.getElementById('ip').value = '';
        document.getElementById('ssid').value = '';
        document.getElementById('password').value = '';
    }
});
