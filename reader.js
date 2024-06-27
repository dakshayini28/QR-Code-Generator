function domReady(fn) {
    if (document.readyState === "complete" || document.readyState === "interactive") {
        setTimeout(fn, 1);
    } else {
        document.addEventListener("DOMContentLoaded", fn);
    }
}

domReady(function () {
    // Function to handle successful scan
    function onScanSuccess(decodeText, decodeResult) {
        // Display the scanned text
        document.getElementById("link-text").textContent = decodeText;
        document.getElementById("result").style.display = "block";
    }

    // Initialize the scanner
    let html5QrcodeScanner = new Html5QrcodeScanner(
        "reader",
        { fps: 10, qrbox: 250 }
    );

    // Event listener to start scanning on button click
    document.querySelector("button.btn-primary").addEventListener("click", function() {
        // Request camera access
        navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } })
            .then(function(stream) {
                html5QrcodeScanner.start(stream);
            })
            .catch(function(err) {
                console.error("Error accessing camera: ", err);
                alert("Error accessing camera. Please grant camera permission.");
            });
    });

    // Event listener to stop scanning on button click
    document.getElementById("copy-button").addEventListener("click", function() {
        const linkText = document.getElementById("link-text").textContent;
        navigator.clipboard.writeText(linkText).then(function() {
            alert("Link copied to clipboard!");
        }, function(err) {
            console.error("Could not copy text: ", err);
        });
    });

    // Render scanner
    html5QrcodeScanner.render(onScanSuccess);
});