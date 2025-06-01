// Disease Select - Toggle Display Based on Selection
document.getElementById('disease-select').addEventListener('change', function() {
    const diseaseList = document.getElementById('disease-list');
    const otherDiseaseInput = document.getElementById('other-disease'); 
    const selectedValue = this.value;

    if (selectedValue === 'Yes') {
        diseaseList.style.display = 'block'; // Show disease dropdown
    } else {
        diseaseList.style.display = 'none'; // Hide disease dropdown and input field
        otherDiseaseInput.style.display = 'none'; // Hide "Other disease" input
    }
});

// Show "Other Disease" input if "Other" is selected in the disease dropdown
document.getElementById('disease-select-list').addEventListener('change', function() {
    const otherDiseaseInput = document.getElementById('other-disease');
    if (this.value === 'Other') {
        otherDiseaseInput.style.display = 'block'; // Show input field for entering other disease
    } else {
        otherDiseaseInput.style.display = 'none'; // Hide "Other disease" input if any other disease is selected
    }
});

// Add a new file input field with a corresponding text input for the report name
document.getElementById('add-report').addEventListener('click', function() {
    const container = document.getElementById('additional-reports-container');

    // Create a new div to hold both inputs
    const reportEntry = document.createElement('div');
    reportEntry.classList.add('input-group', 'mt-2');

    // Create text input for report name
    const reportNameInput = document.createElement('input');
    reportNameInput.type = 'text';
    reportNameInput.classList.add('form-control', 'report-name');
    reportNameInput.placeholder = 'Enter Report Name (e.g., Blood Test, MRI Scan)';

    // Create file input for uploading report
    const reportFileInput = document.createElement('input');
    reportFileInput.type = 'file';
    reportFileInput.classList.add('form-control', 'report-file');
    reportFileInput.accept = 'application/pdf';

    // Append both inputs to the new div
    reportEntry.appendChild(reportNameInput);
    reportEntry.appendChild(reportFileInput);

    // Append the new entry to the container
    container.appendChild(reportEntry);
});

// Validate before submitting
document.querySelector('form').addEventListener('submit', function(event) {
    const reportNames = document.querySelectorAll('.report-name');
    const reportFiles = document.querySelectorAll('.report-file');
    let isValid = true;

    reportNames.forEach((nameInput, index) => {
        const fileInput = reportFiles[index];

        if ((nameInput.value.trim() && !fileInput.value) || (!nameInput.value.trim() && fileInput.value)) {
            alert('Please provide both Report Name and Report File for each report.');
            isValid = false;
        }
    });

    if (!isValid) {
        event.preventDefault(); // Stop form submission if validation fails
    }
});

let isContactVerified = false;
let isEmailVerified = false;
let isPasswordValid = false;

// Contact OTP Logic
let otpContact = null;
document.getElementById('sendOtpContact').addEventListener('click', function() {
    const contactField = document.getElementById('contactField');
    if (!contactField.value || !/^\d{10}$/.test(contactField.value)) {
        alert('Please enter a valid 10-digit contact number');
        return;
    }

    otpContact = Math.floor(1000 + Math.random() * 9000);  // Simulating OTP
    alert('OTP sent: ' + otpContact);  // In real scenarios, send OTP via backend.
    document.getElementById('otpContactContainer').style.display = 'block';
});

document.getElementById('verifyOtpContact').addEventListener('click', function() {
    const enteredOtp = document.getElementById('otpContact').value;
    if (enteredOtp == otpContact) {
        document.getElementById('contactField').classList.add('verified');
        document.getElementById('otpContactContainer').style.display = 'none';
        isContactVerified = true; // Set verification flag
    } else {
        alert('Invalid OTP');
        isContactVerified = false;
    }
});

document.getElementById('resendOtpContact').addEventListener('click', function() {
    otpContact = Math.floor(1000 + Math.random() * 9000);  // Simulating OTP
    alert('OTP resent: ' + otpContact);
});

// Email OTP Logic
let otpEmail = null;
document.getElementById('sendOtpEmail').addEventListener('click', function() {
    const emailField = document.getElementById('emailField');
    if (!emailField.value || !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(emailField.value)) {
        alert('Please enter a valid email address');
        return;
    }

    otpEmail = Math.floor(1000 + Math.random() * 9000);  // Simulating OTP
    alert('OTP sent: ' + otpEmail);  // In real scenarios, send OTP via backend.
    document.getElementById('otpEmailContainer').style.display = 'block';
});

document.getElementById('verifyOtpEmail').addEventListener('click', function() {
    const enteredOtp = document.getElementById('otpEmail').value;
    if (enteredOtp == otpEmail) {
        document.getElementById('emailField').classList.add('verified');
        document.getElementById('otpEmailContainer').style.display = 'none';
        isEmailVerified = true; // Set verification flag
    } else {
        alert('Invalid OTP');
        isEmailVerified = false;
    }
});

document.getElementById('resendOtpEmail').addEventListener('click', function() {
    otpEmail = Math.floor(1000 + Math.random() * 9000);  // Simulating OTP
    alert('OTP resent: ' + otpEmail);
});

// Password Validation
function validatePassword() {
    const passwordField = document.getElementById('passwordField');
    const confirmPasswordField = document.getElementById('confirmPasswordField');

    const password = passwordField.value;
    const confirmPassword = confirmPasswordField.value;

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{6,16}$/;

    if (password === confirmPassword && passwordRegex.test(password)) {
        passwordField.classList.add('verified');
        confirmPasswordField.classList.add('verified');
        alert('Password is valid and matched!');
        isPasswordValid = true; // Set password validation flag
    } else {
        passwordField.classList.remove('verified');
        confirmPasswordField.classList.remove('verified');
        isPasswordValid = false; // Reset flag if validation fails

        if (password !== confirmPassword) {
            alert('Passwords do not match.');
        } else if (!passwordRegex.test(password)) {
            alert('Password must be between 6-16 characters long and contain at least 1 capital letter, 1 small letter, 1 number, and 1 special character.');
        }
    }
}

// Add event listener for password validation
document.getElementById('validatePasswordBtn').addEventListener('click', validatePassword);

// Prevent Form Submission if Conditions Are Not Met
document.querySelector('form').addEventListener('submit', function(event) {
    if (!isContactVerified || !isEmailVerified || !isPasswordValid) {
        alert('Please verify your Contact and Email OTPs, and validate your Password before registering.');
        event.preventDefault(); // Stop form submission
    }
});

// Function to reset contact validation if modified after verification
document.getElementById('contactField').addEventListener('input', function() {
    isContactVerified = false; // Reset validation flag
    document.getElementById('contactField').classList.remove('verified'); 
    document.getElementById('otpContactContainer').style.display = 'none';
});

// Function to reset email validation if modified after verification
document.getElementById('emailField').addEventListener('input', function() {
    isEmailVerified = false; // Reset validation flag
    document.getElementById('emailField').classList.remove('verified'); 
    document.getElementById('otpEmailContainer').style.display = 'none';
});

// Function to reset password validation if modified after verification
document.getElementById('passwordField').addEventListener('input', function() {
    isPasswordValid = false; // Reset validation flag
    document.getElementById('passwordField').classList.remove('verified'); 
});

document.getElementById('confirmPasswordField').addEventListener('input', function() {
    isPasswordValid = false; // Reset validation flag
    document.getElementById('confirmPasswordField').classList.remove('verified'); 
});

// Prevent form submission if validation flags are false
document.querySelector('form').addEventListener('submit', function(event) {
    if (!isContactVerified || !isEmailVerified || !isPasswordValid) {
        event.preventDefault(); // Stop form submission
    }
});

//To validate essential details
function validateField(fieldId, regex, errorMessage) {
    const field = document.getElementById(fieldId);
    const value = field.value.trim();

    if (value === "" && (fieldId === "panNumber" || fieldId === "voterId")) {
        // Skip validation for optional fields if empty
        field.classList.remove("is-invalid");
        return true;
    }

    if (!regex.test(value)) {
        field.classList.add("is-invalid");
        alert(errorMessage);
        return false;
    } else {
        field.classList.remove("is-invalid");
        field.classList.add("is-valid");
        return true;
    }
}

document.getElementById("aadharNumber").addEventListener("input", function() {
    validateField("aadharNumber", /^\d{12}$/, "Aadhar Number must be exactly 12 digits.");
});

document.getElementById("panNumber").addEventListener("input", function() {
    validateField("panNumber", /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, "PAN Number must be in the format: ABCDE1234F.");
});

document.getElementById("voterId").addEventListener("input", function() {
    validateField("voterId", /^[A-Z]{3}[0-9]{7}$/, "Voter ID must be in the format: ABC1234567.");
});

document.querySelector("form").addEventListener("submit", function(event) {
    let isAadharValid = validateField("aadharNumber", /^\d{12}$/, "Aadhar Number must be exactly 12 digits.");
    let isPanValid = validateField("panNumber", /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, "PAN Number must be in the format: ABCDE1234F.");
    let isVoterValid = validateField("voterId", /^[A-Z]{3}[0-9]{7}$/, "Voter ID must be in the format: ABC1234567.");

    if (!isAadharValid || !isPanValid || !isVoterValid) {
        event.preventDefault(); // Stop form submission if any field is invalid
        alert("Please correct the errors before submitting.");
    }
});

// Function to Validate Essential Details Fields
function validateField(fieldId, regex, errorMessage, showAlert = false) {
    const field = document.getElementById(fieldId);
    const value = field.value.trim();

    if (value === "" && (fieldId === "panNumber" || fieldId === "voterId")) {
        // Skip validation for optional fields if empty
        field.classList.remove("is-invalid");
        field.classList.remove("is-valid");
        return true;
    }

    if (!regex.test(value)) {
        field.classList.add("is-invalid");
        field.classList.remove("is-valid");
        if (showAlert) alert(errorMessage); // Show alert only during form submission
        return false;
    } else {
        field.classList.remove("is-invalid");
        field.classList.add("is-valid");
        return true;
    }
}

// Attach Real-Time Validation (No Alerts)
document.getElementById("aadharNumber").addEventListener("input", function() {
    validateField("aadharNumber", /^\d{12}$/, "Aadhar Number must be exactly 12 digits.");
});

document.getElementById("panNumber").addEventListener("input", function() {
    validateField("panNumber", /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, "PAN Number must be in the format: ABCDE1234F.");
});

document.getElementById("voterId").addEventListener("input", function() {
    validateField("voterId", /^[A-Z]{3}[0-9]{7}$/, "Voter ID must be in the format: ABC1234567.");
});

// Prevent Form Submission if Essential Details Are Invalid
document.querySelector("form").addEventListener("submit", function(event) {
    let isAadharValid = validateField("aadharNumber", /^\d{12}$/, "Aadhar Number must be exactly 12 digits.", true);
    let isPanValid = validateField("panNumber", /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, "PAN Number must be in the format: ABCDE1234F.", false);
    let isVoterValid = validateField("voterId", /^[A-Z]{3}[0-9]{7}$/, "Voter ID must be in the format: ABC1234567.", false);

    const panNumberField = document.getElementById("panNumber");
    const panCardField = document.getElementById("panCard");
    const voterIdField = document.getElementById("voterId");
    const voterIdCardField = document.getElementById("voterIdCard");

    let isValid = true;

    // PAN Number & PAN Card Check
    if ((panNumberField.value.trim() && !panCardField.value) || (!panNumberField.value.trim() && panCardField.value)) {
        alert("If you enter a PAN Number, you must upload the PAN Card (and vice versa).");
        isValid = false;
    }

    // Voter ID & Voter ID Card Check
    if ((voterIdField.value.trim() && !voterIdCardField.value) || (!voterIdField.value.trim() && voterIdCardField.value)) {
        alert("If you enter a Voter ID, you must upload the Voter ID Card (and vice versa).");
        isValid = false;
    }

    if (!isAadharValid || !isPanValid || !isVoterValid || !isValid) {
        event.preventDefault(); // Stop form submission if any validation fails
    }
});

//To validate relatives details
document.addEventListener("DOMContentLoaded", function () {
    let maxFields = 4; // 1 required + 3 additional
    let relativeContainer = document.getElementById("relativeFields");
    let addRelativeButton = document.getElementById("addRelative");
    let fieldCount = 1;

    addRelativeButton.addEventListener("click", function () {
        if (fieldCount < maxFields) {
            let newGroup = document.createElement("div");
            newGroup.classList.add("relative-group");
            newGroup.innerHTML = `
                <input type="text" class="form-control" name="relativeName[]" placeholder="Relative/Friend's Name">
                <input type="text" class="form-control" name="relation[]" placeholder="Relation">
                <input type="tel" class="form-control" name="contactNumber[]" placeholder="Contact Number">
                <button type="button" class="btn btn-danger removeRelative">-</button>
            `;
            relativeContainer.appendChild(newGroup);
            fieldCount++;
        }
    });

    relativeContainer.addEventListener("click", function (e) {
        if (e.target.classList.contains("removeRelative")) {
            e.target.parentElement.remove();
            fieldCount--;
        }
    });
});