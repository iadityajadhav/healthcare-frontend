// Toggle Forgot Password Options
document.getElementById("forgotPasswordButton").addEventListener("click", function() {
    document.getElementById("forgotPasswordOptions").style.display = "block";
});

// Function to generate a random 6-digit OTP
function generateOTP() {
    return Math.floor(100000 + Math.random() * 900000); // Generates a 6-digit OTP
}

let generatedOTP = ""; // Store the OTP globally for verification

// Handle sending OTP via email
document.getElementById("sendOtpEmail").addEventListener("click", function () {
    generatedOTP = generateOTP(); // Generate new OTP
    alert(`OTP sent to your email: ${generatedOTP}`); // Show OTP in popup
    document.getElementById("otpConfirmation").style.display = "block";
});

// Handle sending OTP via mobile number
document.getElementById("sendOtpMobile").addEventListener("click", function () {
    generatedOTP = generateOTP(); // Generate new OTP
    alert(`OTP sent to your mobile number: ${generatedOTP}`); // Show OTP in popup
    document.getElementById("otpConfirmation").style.display = "block";
});

// Confirm OTP and display reset password form
document.getElementById("confirmOtp").addEventListener("click", function () {
    const enteredOTP = document.getElementById("otp").value.trim();
    if (enteredOTP === generatedOTP.toString()) {
        alert("OTP confirmed successfully!");
        document.getElementById("passwordResetContainer").style.display = "block";
    } else {
        alert("Invalid OTP. Please try again.");
    }
});

// Resend OTP
document.getElementById("resendOtp").addEventListener("click", function () {
    generatedOTP = generateOTP(); // Generate new OTP
    alert(`OTP has been resent: ${generatedOTP}`); // Show new OTP in popup
});

//To validate Username and Password to login
document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent form submission

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    // Validate Username (12-digit Aadhaar Number)
    const aadhaarRegex = /^\d{12}$/;
    if (!aadhaarRegex.test(username)) {
        alert("Something went wrong, please enter your 12 digit unique Aadhar Number as Username.");
        return;
    }

    // Validate Password (6-16 characters, at least 1 uppercase, 1 lowercase, 1 number, and 1 special character)
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,16}$/;
    if (!passwordRegex.test(password)) {
        alert("Password must be 6-16 characters long and include at least one uppercase letter, one lowercase letter, one special character, and one number.");
        return;
    }

    alert("Login Successful!");
    this.submit(); // Proceed with form submission if validation passes
});

// Function to validate password based on given criteria
function isValidPassword(password) {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,16}$/;
    return passwordRegex.test(password);
}

// Handle setting new password with validation
document.getElementById("setNewPassword").addEventListener("click", function () {
    const newPassword = document.getElementById("newPassword").value.trim();
    const confirmPassword = document.getElementById("confirmPassword").value.trim();

    // Clear previous error messages
    document.getElementById("newPasswordError").innerHTML = '';
    document.getElementById("confirmPasswordError").innerHTML = '';

    // Validate new password
    if (!isValidPassword(newPassword)) {
        document.getElementById("newPasswordError").innerHTML = 
            "Password must be 6-16 characters long and include at least one uppercase letter, one lowercase letter, one special character, and one number.";
        return;
    }

    // Check if passwords match
    if (newPassword !== confirmPassword) {
        document.getElementById("confirmPasswordError").innerHTML = "Passwords do not match.";
        return;
    }

    alert("New password set successfully!");
    
    // Reset fields and hide password reset container
    document.getElementById("passwordResetContainer").style.display = "none";
    document.getElementById("forgotPasswordOptions").style.display = "none";
    document.getElementById("otpConfirmation").style.display = "none";
});