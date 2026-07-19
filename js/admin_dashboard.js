// ======================================
// PurpleLearn Admin Dashboard
// ======================================

// Check Login
if (localStorage.getItem("adminLoggedIn") !== "true") {
    window.location.href = "admin-login.html";
}

// Display Admin Name
const adminName = localStorage.getItem("adminName") || "Administrator";
document.getElementById("adminName").textContent = adminName;

// Logout
document.getElementById("logoutBtn").addEventListener("click", () => {

    localStorage.removeItem("adminLoggedIn");
    localStorage.removeItem("adminName");

    window.location.href = "admin-login.html";

});

// Dashboard Counts
let totalStudents = 0;
let totalFaculty = 0;
let activeStudents = 0;

// Load Courses
fetch("course.json")
.then(response => response.json())
.then(courses => {

    document.getElementById("courseCount").textContent =
        courses.length;

});

// Students from Local Storage
const students =
JSON.parse(localStorage.getItem("students")) || [];

totalStudents = students.length;

activeStudents = students.filter(student =>
    student.active === true
).length;

// Faculty from Local Storage
const faculty =
JSON.parse(localStorage.getItem("faculty")) || [];

totalFaculty = faculty.length;

// Update Cards
document.getElementById("studentCount").textContent =
totalStudents;

document.getElementById("facultyCount").textContent =
totalFaculty;

document.getElementById("activeCount").textContent =
activeStudents;