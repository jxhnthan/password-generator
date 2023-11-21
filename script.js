// Selects HTML elements for interaction and manipulation
const lengthSlider = document.querySelector(".pass-length input");
const options = document.querySelectorAll(".option input");
const copyIcon = document.querySelector(".input-box span");
const passwordInput = document.querySelector(".input-box input");
const generateBtn = document.querySelector(".generate-btn");
const downloadBtn = document.querySelector(".download-btn");

// Defines character sets for password generation
const characters = {
    lowercase: "abcdefghijklmnopqrstuvwxyz",
    uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    numbers: "0123456789",
    symbols: "!$%&|[](){}:;.,*+-#@<>~"
}

const generatePassword = () => {
    let staticPassword = "",
        randomPassword = "",
        excludeDuplicate = false,
        passLength = lengthSlider.value;

    options.forEach(option => {
        if (option.checked) {
            if (option.id !== "exc-duplicate" && option.id !== "spaces") {
                staticPassword += characters[option.id];
            } else if (option.id === "spaces") {
                staticPassword += `  ${staticPassword}  `;
            } else {
                excludeDuplicate = true;
            }
        }
    });

    for (let i = 0; i < passLength; i++) {
        let randomChar = staticPassword[Math.floor(Math.random() * staticPassword.length)];
        if (excludeDuplicate) {
            !randomPassword.includes(randomChar) || randomChar == " " ? randomPassword += randomChar : i--;
        } else {
            randomPassword += randomChar;
        }
    }

    passwordInput.value = randomPassword;
    return randomPassword;
}

const getPasswordForDownload = () => {
    const passwordToDownload = passwordInput.value;

    const passwordBlob = new Blob([passwordToDownload], { type: 'text/plain' });
    const downloadLink = document.createElement('a');
    downloadLink.download = 'generated_password.txt';
    downloadLink.href = window.URL.createObjectURL(passwordBlob);
    downloadLink.style.display = 'none';
    document.body.appendChild(downloadLink);

    downloadLink.click();

    document.body.removeChild(downloadLink);
    window.URL.revokeObjectURL(downloadLink.href);
}

const updatePassIndicator = () => {
    passIndicator.id = lengthSlider.value <= 8 ? "weak" : lengthSlider.value <= 16 ? "medium" : "strong";
}

const updateSlider = () => {
    document.querySelector(".pass-length span").innerText = lengthSlider.value;
    generatePassword();
    updatePassIndicator();
}

lengthSlider.addEventListener("input", updateSlider);

const copyPassword = () => {
    navigator.clipboard.writeText(passwordInput.value);
    copyIcon.innerText = "check";
    copyIcon.style.color = "#4285f4";
    setTimeout(() => {
        copyIcon.innerText = "copy_all";
        copyIcon.style.color = "#707070";
    }, 1500);
}

copyIcon.addEventListener("click", copyPassword);
generateBtn.addEventListener("click", generatePassword);
downloadBtn.addEventListener("click", getPasswordForDownload);

