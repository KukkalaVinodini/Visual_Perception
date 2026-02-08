let cameraStream = null;
let capturedImage = null;

/* START CAMERA */
function startCamera() {
    navigator.mediaDevices.getUserMedia({ video: true })
        .then(stream => {
            cameraStream = stream;
            document.getElementById("camera").srcObject = stream;
        })
        .catch(() => alert("Camera access denied"));
}

/* CAPTURE IMAGE */
function captureImage() {
    const video = document.getElementById("camera");
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");

    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    capturedImage = canvas.toDataURL("image/png");

    alert("Image captured successfully");
}

/* ANALYZE IMAGE (FIXED) */
function analyzeImage() {
    const list = document.getElementById("detectedList");
    const caption = document.getElementById("caption");

    // Clear previous results
    list.innerHTML = "";

    // Simulated detected objects
    const detectedObjects = ["Person", "Backpack"];

    detectedObjects.forEach(obj => {
        const li = document.createElement("li");
        li.textContent = obj;
        list.appendChild(li);
    });

    caption.innerText =
        "A person is standing in front of the camera.";
}


/* CLEAR */
function clearAll() {
    document.getElementById("imageInput").value = "";
    document.getElementById("outputImage").style.display = "none";
    document.getElementById("caption").innerText = "Caption will appear here";
    capturedImage = null;

    if (cameraStream) {
        cameraStream.getTracks().forEach(track => track.stop());
        cameraStream = null;
    }
}
function speakCaption() {
    const text = document.getElementById("caption").innerText;

    if (!text || text.includes("appear")) {
        alert("No caption to speak!");
        return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    utterance.rate = 1;
    utterance.pitch = 1;

    window.speechSynthesis.cancel(); // stop previous
    window.speechSynthesis.speak(utterance);
}
/* =========================
   SCROLL REVEAL SCRIPT
   ========================= */

   const reveals = document.querySelectorAll(".reveal");

   function revealOnScroll() {
       for (let i = 0; i < reveals.length; i++) {
           const windowHeight = window.innerHeight;
           const elementTop = reveals[i].getBoundingClientRect().top;
           const elementVisible = 120;
   
           if (elementTop < windowHeight - elementVisible) {
               reveals[i].classList.add("active");
           }
       }
   }
   
   window.addEventListener("scroll", revealOnScroll);
   