
    let imgBox = document.getElementById("imgBox");
    let qrImage = document.getElementById("qrImage");
    let qrText = document.getElementById("qrText");
    let qrForm = document.getElementById("qrForm");

    qrText.addEventListener("keypress", function(event) {
        if (event.key === "Enter") {
            event.preventDefault();
            generateQR();
        }
    });

    function generateQR() {
        // Clear previous QR code
        qrImage.src = "";
        imgBox.classList.remove("show-img");

        // Generate new QR code if input is not empty
        if (qrText.value.trim().length > 0) {
            qrImage.src = "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=" + encodeURIComponent(qrText.value.trim());
            imgBox.classList.add("show-img");
        } else {
            qrText.classList.add("error");
            setTimeout(() => {
                qrText.classList.remove("error");
            }, 1000);
        }
    }
