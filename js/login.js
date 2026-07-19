const loginForm = document.getElementById("loginForm");

const email = document.getElementById("email");
const password = document.getElementById("password");

const emailError = document.getElementById("emailError");
const passwordError = document.getElementById("passwordError");
const loginMessage = document.getElementById("loginMessage");

loginForm.addEventListener("submit", function (e) {

    e.preventDefault();

    emailError.textContent = "";
    passwordError.textContent = "";
    loginMessage.textContent = "";

    let valid = true;

    // Email Validation
    if (email.value.trim() === "") {
        emailError.textContent = "Email is required";
        valid = false;
    }
    else {

        const emailPattern =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(email.value)) {
            emailError.textContent = "Enter a valid email address";
            valid = false;
        }

    }

    // Password Validation
    if (password.value.trim() === "") {
        passwordError.textContent = "Password is required";
        valid = false;
    }

    if (!valid) return;

    // Authentication

    if (
        email.value === "student@gmail.com" &&
        password.value === "student123"
    ) {

        localStorage.setItem("isLoggedIn", "true");

        localStorage.setItem("studentName", "John Doe");

        loginMessage.style.color = "green";
        loginMessage.textContent = "Login Successful! Redirecting...";

        setTimeout(() => {

            window.location.href = "student_home.html";

        }, 1200);

    }
    else {

        loginMessage.style.color = "red";
        loginMessage.textContent = "Invalid email or password";

    }

});