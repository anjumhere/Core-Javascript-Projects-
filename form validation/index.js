const form = document.querySelector("form");
const email = document.querySelector("#email");
const password = document.querySelector("#password");
const confirmPass = document.querySelector("#confirmPassword");

// Error messages
const emailError = document.querySelector("#emailError");
const passwordError = document.querySelector("#passwordError");
const confirmError = document.querySelector("#confirmError");

// Empty messages
let noEmail = document.querySelector("#emptyMail");
let emptyPass = document.querySelector("#emptyPass");

// Success messages
const passEmail = document.querySelector("#emailSuccess");
const passPassword = document.querySelector("#passwordSuccess");
const confirmSuccess = document.querySelector("#confirmSuccess");
const successmsg = document.querySelector("#success");

// Password requirements
const passRequire = document.querySelector("#requirements");

// CHANGE 8: Added individual requirement elements
const reqLength = document.querySelector("#req-length");
const reqUppercase = document.querySelector("#req-uppercase");
const reqLowercase = document.querySelector("#req-lowercase");
const reqNumber = document.querySelector("#req-number");
const reqSpecial = document.querySelector("#req-special");

// Regex patterns
const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&^_\-+=.]{8,}$/;

// CHANGE 8: Individual password requirement checks
const requirements = {
  minLength: /.{8,}/,
  hasUpperCase: /[A-Z]/,
  hasLowerCase: /[a-z]/,
  hasNumber: /\d/,
  hasSpecialChar: /[@$!%*#?&^_\-+=.]/,
};

// CHANGE 1: Added real-time email validation
email.addEventListener("input", validateEmailRealtime);
email.addEventListener("blur", validateEmailRealtime);

function validateEmailRealtime() {
  if (email.value === "") {
    // Reset all when empty
    noEmail.style.display = "none";
    emailError.style.display = "none";
    passEmail.style.display = "none";
    email.classList.remove("valid", "invalid");
  } else if (!emailRegex.test(email.value)) {
    emailError.style.display = "initial";
    noEmail.style.display = "none";
    passEmail.style.display = "none";
    email.classList.add("invalid");
    email.classList.remove("valid");
  } else {
    passEmail.style.display = "initial";
    emailError.style.display = "none";
    noEmail.style.display = "none";
    email.classList.add("valid");
    email.classList.remove("invalid");
  }
}

// CHANGE 2 & 8: Added real-time password validation with live requirement updates
password.addEventListener("input", validatePasswordRealtime);
password.addEventListener("blur", validatePasswordRealtime);

function validatePasswordRealtime() {
  if (password.value === "") {
    // Reset all when empty
    emptyPass.style.display = "none";
    passwordError.style.display = "none";
    passPassword.style.display = "none";
    passRequire.style.display = "none";
    password.classList.remove("valid", "invalid");

    // CHANGE 8: Reset all requirements to invalid
    reqLength.classList.remove("valid");
    reqLength.classList.add("invalid");
    reqUppercase.classList.remove("valid");
    reqUppercase.classList.add("invalid");
    reqLowercase.classList.remove("valid");
    reqLowercase.classList.add("invalid");
    reqNumber.classList.remove("valid");
    reqNumber.classList.add("invalid");
    reqSpecial.classList.remove("valid");
    reqSpecial.classList.add("invalid");
  } else {
    // CHANGE 3: Show requirements while typing
    passRequire.style.display = "initial";
    emptyPass.style.display = "none";

    // CHANGE 8: Update each requirement in real-time
    updateRequirement(reqLength, requirements.minLength.test(password.value));
    updateRequirement(
      reqUppercase,
      requirements.hasUpperCase.test(password.value),
    );
    updateRequirement(
      reqLowercase,
      requirements.hasLowerCase.test(password.value),
    );
    updateRequirement(reqNumber, requirements.hasNumber.test(password.value));
    updateRequirement(
      reqSpecial,
      requirements.hasSpecialChar.test(password.value),
    );

    if (!passwordRegex.test(password.value)) {
      passwordError.style.display = "initial";
      passPassword.style.display = "none";
      password.classList.add("invalid");
      password.classList.remove("valid");
    } else {
      passPassword.style.display = "initial";
      passwordError.style.display = "none";
      password.classList.add("valid");
      password.classList.remove("invalid");
    }
  }
}

// CHANGE 8: Helper function to update requirement status
function updateRequirement(element, isValid) {
  if (isValid) {
    element.classList.remove("invalid");
    element.classList.add("valid");
  } else {
    element.classList.remove("valid");
    element.classList.add("invalid");
  }
}

// CHANGE 4: Added real-time confirm password validation
confirmPass.addEventListener("input", validateConfirmPasswordRealtime);
confirmPass.addEventListener("blur", validateConfirmPasswordRealtime);

function validateConfirmPasswordRealtime() {
  if (confirmPass.value === "") {
    confirmError.style.display = "none";
    confirmSuccess.style.display = "none";
    confirmPass.classList.remove("valid", "invalid");
  } else if (password.value !== confirmPass.value) {
    confirmError.style.display = "initial";
    confirmSuccess.style.display = "none";
    confirmPass.classList.add("invalid");
    confirmPass.classList.remove("valid");
  } else {
    confirmSuccess.style.display = "initial";
    confirmError.style.display = "none";
    confirmPass.classList.add("valid");
    confirmPass.classList.remove("invalid");
  }
}

// Form submission
function formData(e) {
  e.preventDefault();

  // Confirming if everything is valid
  let isValid = true;

  // Email Validation
  let emailAns = emailRegex.test(email.value);
  if (email.value === "") {
    noEmail.style.display = "initial";
    passEmail.style.display = "none";
    emailError.style.display = "none";
    email.classList.add("invalid");
    email.classList.remove("valid");
    isValid = false;
  } else if (!emailAns) {
    emailError.style.display = "initial";
    noEmail.style.display = "none";
    passEmail.style.display = "none";
    email.classList.add("invalid");
    email.classList.remove("valid");
    isValid = false;
  } else {
    emailError.style.display = "none";
    passEmail.style.display = "initial";
    noEmail.style.display = "none";
    email.classList.add("valid");
    email.classList.remove("invalid");
  }

  // Password Validation
  let passwordAns = passwordRegex.test(password.value);
  if (password.value === "") {
    emptyPass.style.display = "initial";
    passPassword.style.display = "none";
    passwordError.style.display = "none";
    passRequire.style.display = "none";
    password.classList.add("invalid");
    password.classList.remove("valid");
    isValid = false;
  } else if (!passwordAns) {
    passRequire.style.display = "initial";
    passwordError.style.display = "initial";
    emptyPass.style.display = "none";
    passPassword.style.display = "none";
    password.classList.add("invalid");
    password.classList.remove("valid");
    isValid = false;
  } else {
    passPassword.style.display = "initial";
    passwordError.style.display = "none";
    passRequire.style.display = "none";
    emptyPass.style.display = "none";
    password.classList.add("valid");
    password.classList.remove("invalid");
  }

  // CHANGE 6: Fixed confirm password validation logic
  if (confirmPass.value === "") {
    confirmError.style.display = "initial";
    confirmSuccess.style.display = "none";
    confirmPass.classList.add("invalid");
    confirmPass.classList.remove("valid");
    isValid = false;
  } else if (password.value !== confirmPass.value) {
    confirmError.style.display = "initial";
    confirmSuccess.style.display = "none";
    confirmPass.classList.add("invalid");
    confirmPass.classList.remove("valid");
    isValid = false;
  } else {
    confirmSuccess.style.display = "initial";
    confirmError.style.display = "none";
    confirmPass.classList.add("valid");
    confirmPass.classList.remove("invalid");
  }

  // CHANGE 7: Added form reset and auto-hide success message after submission
  if (isValid) {
    successmsg.style.display = "initial";
    console.log("Form submitted successfully!");
    console.log("Email:", email.value);
    console.log("Password:", password.value);

    // Reset form after 2.5 seconds
    setTimeout(() => {
      // Clear input values
      email.value = "";
      password.value = "";
      confirmPass.value = "";

      // Hide all messages
      successmsg.style.display = "none";
      passEmail.style.display = "none";
      passPassword.style.display = "none";
      confirmSuccess.style.display = "none";
      noEmail.style.display = "none";
      emptyPass.style.display = "none";
      emailError.style.display = "none";
      passwordError.style.display = "none";
      confirmError.style.display = "none";
      passRequire.style.display = "none";

      // Remove validation classes
      email.classList.remove("valid", "invalid");
      password.classList.remove("valid", "invalid");
      confirmPass.classList.remove("valid", "invalid");

      // CHANGE 8: Reset requirement checkmarks
      reqLength.classList.remove("valid");
      reqLength.classList.add("invalid");
      reqUppercase.classList.remove("valid");
      reqUppercase.classList.add("invalid");
      reqLowercase.classList.remove("valid");
      reqLowercase.classList.add("invalid");
      reqNumber.classList.remove("valid");
      reqNumber.classList.add("invalid");
      reqSpecial.classList.remove("valid");
      reqSpecial.classList.add("invalid");
    }, 2500);
  } else {
    successmsg.style.display = "none";
    console.log("Form validation failed!");
  }
}

form.addEventListener("submit", formData);
