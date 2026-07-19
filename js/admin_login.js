// ==============================
// PurpleLearn Admin Login
// ==============================

const form = document.getElementById("adminLoginForm");

const email = document.getElementById("email");
const password = document.getElementById("password");

const emailError = document.getElementById("emailError");
const passwordError = document.getElementById("passwordError");

const loginMessage = document.getElementById("loginMessage");

// Admin Credentials
const adminEmail = "admin@gmail.com";
const adminPassword = "admin123";

// Login
form.addEventListener("submit", function (e) {

    e.preventDefault();

    emailError.textContent = "";
    passwordError.textContent = "";
    loginMessage.textContent = "";

    let valid = true;

    // Email Validation
    if (email.value.trim() === "") {

        emailError.textContent = "Email is required";
        valid = false;

    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {

        emailError.textContent = "Enter a valid email";
        valid = false;

    }

    // Password Validation
    if (password.value.trim() === "") {

        passwordError.textContent = "Password is required";
        valid = false;

    }

    if (!valid) return;

    // Authentication
    if (
        email.value === adminEmail &&
        password.value === adminPassword
    ) {

        localStorage.setItem("adminLoggedIn", "true");
        localStorage.setItem("adminName", "Administrator");

        loginMessage.style.color = "green";
        loginMessage.textContent = "Login Successful...";

        setTimeout(() => {

            window.location.href = "admin_dashboard.html";

        }, 1000);

    } else {

        loginMessage.style.color = "red";
        loginMessage.textContent = "Invalid email or password";

    }

});