// JavaScript for dynamically adding Qualification/Degree and Certificates
let qualificationCount = 1; // Tracks the number of qualification entries
const maxQualifications = 4; // Max limit (1 required + 3 optional)

document.getElementById("add-qualification").addEventListener("click", function () {
    if (qualificationCount >= maxQualifications) {
        alert("You can only add up to 4 qualifications.");
        return;
    }

    qualificationCount++; // Increase count

    // Create a new Qualification Entry
    const newQualificationGroup = document.createElement("div");
    newQualificationGroup.classList.add("qualification-group", "mt-3");
    newQualificationGroup.id = `qualification-group-${qualificationCount}`;
    newQualificationGroup.innerHTML = `
        <label class="form-label">Qualification/Degree</label>
        <input type="text" class="form-control qualification-field" placeholder="Enter Qualification/Degree" required>

        <label class="form-label mt-2">Qualification/Degree Certificate</label>
        <input type="file" class="form-control certificate-field" accept="image/*,application/pdf" required>

        <label class="form-label mt-2">University/College Name</label>
        <input type="text" class="form-control university-field" placeholder="Enter University/College Name" required>

        <button type="button" class="btn btn-sm btn-danger mt-2 remove-qualification">-</button>
    `;

    // Append the new qualification group before the "+" button
    document.getElementById("qualification-container").appendChild(newQualificationGroup);

    // Move the "+" button to stay at the bottom
    document.getElementById("qualification-container").appendChild(document.getElementById("add-qualification"));

    // Add event listener to remove button
    newQualificationGroup.querySelector(".remove-qualification").addEventListener("click", function () {
        newQualificationGroup.remove(); // Remove the qualification group
        qualificationCount--; // Decrease count
    });
});

// Variables to store OTPs
let otpContact, otpEmail;

// Validation Flags
let isContactVerified = false;
let isEmailVerified = false;
let isPasswordVerified = false;

// Function to reset verification when user edits a field
function resetVerification(fieldId, verificationFlagName, otpContainerId, otpButtonId) {
    const field = document.getElementById(fieldId);
    field.classList.remove("verified");
    window[verificationFlagName] = false; // Reset verification flag

    if (otpContainerId) {
        document.getElementById(otpContainerId).style.display = "none";
    }
    if (otpButtonId) {
        document.getElementById(otpButtonId).disabled = false; // 🔹 RE-ENABLE OTP button
    }
}

// Reset verification when user edits Contact
document.getElementById("contactField").addEventListener("input", function () {
    document.getElementById("otpContact").value = "";  // Clear OTP input
    resetVerification("contactField", "isContactVerified", "otpContactContainer", "sendOtpContact");
});

// Reset verification when user edits Email
document.getElementById("emailField").addEventListener("input", function () {
    document.getElementById("otpEmail").value = "";  // Clear OTP input
    resetVerification("emailField", "isEmailVerified", "otpEmailContainer", "sendOtpEmail");
});

// Reset verification when user edits Password
document.getElementById("passwordField").addEventListener("input", function () {
    resetVerification("passwordField", "isPasswordVerified", "", "");
});

document.getElementById("confirmPasswordField").addEventListener("input", function () {
    resetVerification("confirmPasswordField", "isPasswordVerified", "", "");
});

// Function to send OTP for Contact
document.getElementById("sendOtpContact").addEventListener("click", function () {
    const contactField = document.getElementById("contactField").value;
    if (!/^\d{10}$/.test(contactField)) {
        alert("Please enter a valid 10-digit contact number.");
        return;
    }

    otpContact = Math.floor(1000 + Math.random() * 9000); // Generate OTP
    alert("OTP sent: " + otpContact); // Replace with actual backend API call

    document.getElementById("otpContactContainer").style.display = "block";
});

// Function to send OTP for Email
document.getElementById("sendOtpEmail").addEventListener("click", function () {
    const emailField = document.getElementById("emailField").value;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailField)) {
        alert("Please enter a valid email address.");
        return;
    }

    otpEmail = Math.floor(1000 + Math.random() * 9000); // Generate OTP
    alert("OTP sent: " + otpEmail); // Replace with actual backend API call

    document.getElementById("otpEmailContainer").style.display = "block";
});

// Resend OTP functions
document.getElementById("resendOtpContact").addEventListener("click", function () {
    document.getElementById("sendOtpContact").click();
});

document.getElementById("resendOtpEmail").addEventListener("click", function () {
    document.getElementById("sendOtpEmail").click();
});

// OTP Verification for Contact
document.getElementById("verifyOtpContact").addEventListener("click", function () {
    const enteredOtp = document.getElementById("otpContact").value;
    if (enteredOtp == otpContact) {
        document.getElementById("contactField").classList.add("verified");
        document.getElementById("otpContactContainer").style.display = "none";
        document.getElementById("sendOtpContact").disabled = true; // Disable OTP button after verification
        isContactVerified = true;
    } else {
        alert("Invalid OTP");
        isContactVerified = false;
    }
});

// OTP Verification for Email
document.getElementById("verifyOtpEmail").addEventListener("click", function () {
    const enteredOtp = document.getElementById("otpEmail").value;
    if (enteredOtp == otpEmail) {
        document.getElementById("emailField").classList.add("verified");
        document.getElementById("otpEmailContainer").style.display = "none";
        document.getElementById("sendOtpEmail").disabled = true; // Disable OTP button after verification
        isEmailVerified = true;
    } else {
        alert("Invalid OTP");
        isEmailVerified = false;
    }
});

// Password Validation
function validatePassword() {
    const passwordField = document.getElementById("passwordField");
    const confirmPasswordField = document.getElementById("confirmPasswordField");

    const password = passwordField.value;
    const confirmPassword = confirmPasswordField.value;

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{6,16}$/;

    if (password === confirmPassword && passwordRegex.test(password)) {
        passwordField.classList.add("verified");
        confirmPasswordField.classList.add("verified");
        isPasswordVerified = true;
        alert("Password is valid and matched!");
    } else {
        passwordField.classList.remove("verified");
        confirmPasswordField.classList.remove("verified");
        isPasswordVerified = false;

        if (password !== confirmPassword) {
            alert("Passwords do not match.");
        } else {
            alert("Password must be 6-16 characters long, contain at least 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character.");
        }
    }
}
document.getElementById("validatePasswordBtn").addEventListener("click", validatePassword);

document.querySelector("form").addEventListener("submit", function (event) {
    let isFormValid = true; // Flag to track form validity
    let alertMessages = []; // Store all alert messages

    if (!isContactVerified) {
        alertMessages.push("Please verify your contact.");
        isFormValid = false;
    }
    if (!isEmailVerified) {
        alertMessages.push("Please verify your email.");
        isFormValid = false;
    }
    if (!isPasswordVerified) {
        alertMessages.push("Please verify your password.");
        isFormValid = false;
    }

    // Ensure the user hasn't edited a verified field without re-verifying
    if (!document.getElementById("contactField").classList.contains("verified") ||
        !document.getElementById("emailField").classList.contains("verified") ||
        !document.getElementById("passwordField").classList.contains("verified") ||
        !document.getElementById("confirmPasswordField").classList.contains("verified")) {
        
        alertMessages.push("One or more fields were modified after verification. Please verify them again.");
        isFormValid = false;
    }

    // Show all alert messages at once
    if (!isFormValid) {
        alert(alertMessages.join("\n"));
        event.preventDefault(); // Prevent form submission
    }
});

//To verify aadhar number
document.getElementById("aadharField").addEventListener("input", function () {
    const aadharNumber = this.value.trim();
    if (!/^\d{12}$/.test(aadharNumber)) {
        this.classList.add("is-invalid"); // Adds red border for invalid input
    } else {
        this.classList.remove("is-invalid"); // Removes red border when valid
    }
});

// Prevent form submission if Aadhar number is invalid
document.querySelector("form").addEventListener("submit", function (event) {
    const aadharField = document.getElementById("aadharField");
    if (!/^\d{12}$/.test(aadharField.value.trim())) {
        alert("Aadhar number must be exactly 12 digits.");
        event.preventDefault(); // Stop form submission
    }
});