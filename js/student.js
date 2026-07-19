// ======================
// PurpleLearn Student Dashboard
// ======================

const availableCourses = document.getElementById("availableCourses");
const searchInput = document.getElementById("searchCourse");
const categoryFilter = document.getElementById("categoryFilter");

let allCourses = [];

// Load Courses

fetch("course.json")
    .then(response => response.json())
    .then(data => {

        allCourses = data;

        displayCourses(allCourses);

    })
    .catch(error => {

        console.error("Error Loading JSON:", error);

    });


// Display Courses

function displayCourses(courseList){

    availableCourses.innerHTML = "";

    if(courseList.length === 0){

        availableCourses.innerHTML =
        "<h2>No Courses Found</h2>";

        return;
    }

    courseList.forEach(course=>{

        const card = document.createElement("div");

        card.className="course-card";

        card.innerHTML=`

        <img src="${course.image}" alt="${course.name}">

        <div class="course-info">

            <h3>${course.name}</h3>

            <p><strong>Category :</strong> ${course.category}</p>

            <p><strong>Instructor :</strong> ${course.instructor}</p>

            <p><strong>Duration :</strong> ${course.duration}</p>

            <p><strong>Level :</strong> ${course.level}</p>

            <p><strong>Fee :</strong> ₹${course.fee}</p>

            <p><strong>Rating :</strong> ⭐ ${course.rating}</p>

            <div class="buttons">

                <button
                    class="details-btn"
                    onclick="viewDetails(${course.id})">

                    View Details

                </button>

                <button
                    class="enroll-btn"
                    onclick="takeAdmission(${course.id})">

                    Take Admission

                </button>

            </div>

        </div>

        `;

        availableCourses.appendChild(card);

    });

}


// Search + Filter

function filterCourses(){

    const search =
        searchInput.value.toLowerCase();

    const category =
        categoryFilter.value;

    const filtered = allCourses.filter(course=>{

        const matchSearch =

            course.name.toLowerCase().includes(search)

            ||

            course.category.toLowerCase().includes(search)

            ||

            course.instructor.toLowerCase().includes(search);

        const matchCategory =

            category==="All"

            ||

            course.category===category;

        return matchSearch && matchCategory;

    });

    displayCourses(filtered);

}

searchInput.addEventListener("keyup",filterCourses);

categoryFilter.addEventListener("change",filterCourses);

// ==========================
// Course Admission
// ==========================

// Get enrolled courses from Local Storage
let enrolledCourses =
    JSON.parse(localStorage.getItem("myCourses")) || [];

// Update Dashboard Count
function updateDashboard() {

    document.getElementById("enrolledCount").textContent =
        enrolledCourses.length;

}

// Save to Local Storage
function saveCourses() {

    localStorage.setItem(
        "myCourses",
        JSON.stringify(enrolledCourses)
    );

    updateDashboard();

}

// Take Admission
function takeAdmission(id) {

    const selectedCourse =
        allCourses.find(course => course.id === id);

    if (!selectedCourse) return;

    // Prevent duplicate admission
    const alreadyEnrolled =
        enrolledCourses.some(course => course.id === id);

    if (alreadyEnrolled) {

        alert("You have already enrolled in this course.");

        return;

    }

    // Add admission date
    selectedCourse.admissionDate =
        new Date().toLocaleDateString();

    // Default Progress
    selectedCourse.progress = 0;

    enrolledCourses.push(selectedCourse);

    saveCourses();

    renderMyCourses();

    alert("🎉 Admission Successful!");

}

// Initialize dashboard
updateDashboard();

// ==========================
// My Courses
// ==========================

const myCoursesContainer = document.getElementById("myCourses");

// Display Enrolled Courses
function renderMyCourses() {

    myCoursesContainer.innerHTML = "";

    if (enrolledCourses.length === 0) {

        myCoursesContainer.innerHTML = `
            <p style="grid-column:1/-1;text-align:center;font-size:18px;">
                No enrolled courses yet.
            </p>
        `;

        return;
    }

    enrolledCourses.forEach(course => {

        const card = document.createElement("div");

        card.className = "course-card";

        card.innerHTML = `

            <img src="${course.image}" alt="${course.name}">

            <div class="course-info">

                <h3>${course.name}</h3>

                <p><strong>Instructor:</strong> ${course.instructor}</p>

                <p><strong>Admission Date:</strong> ${course.admissionDate}</p>

                <p><strong>Progress:</strong> ${course.progress}%</p>

                <progress
                    value="${course.progress}"
                    max="100"
                    style="width:100%;height:12px;">
                </progress>

                <div class="buttons">

                    <button
                        class="enroll-btn"
                        onclick="continueLearning(${course.id})">
                        Continue Learning
                    </button>

                </div>

                <div class="buttons">

                    <button
                        class="details-btn"
                        onclick="viewFaculty(${course.id})">
                        View Faculty
                    </button>

                    <button
                        class="details-btn"
                        onclick="viewSyllabus(${course.id})">
                        View Syllabus
                    </button>

                </div>

            </div>

        `;

        myCoursesContainer.appendChild(card);

    });

}

// Continue Learning
function continueLearning(id) {

    const course = enrolledCourses.find(c => c.id === id);

    if (!course) return;

    if (course.progress < 100) {

        course.progress += 10;

        if (course.progress > 100) {
            course.progress = 100;
        }

        saveCourses();

        renderMyCourses();

        alert(`Progress updated to ${course.progress}%`);

    } else {

        alert("🎉 Congratulations! You have completed this course.");

    }

}

// Load enrolled courses on page load
renderMyCourses();

// ==========================
// Modals & Logout
// ==========================

// View Course Details
function viewDetails(id) {

    const course = allCourses.find(c => c.id === id);

    if (!course) return;

    alert(
`Course: ${course.name}

Description:
${course.description}

Instructor: ${course.instructor}
Duration: ${course.duration}
Level: ${course.level}
Rating: ⭐ ${course.rating}
Fee: ₹${course.fee || 2999}`
    );
}


// View Faculty
function viewFaculty(id) {

    const course = enrolledCourses.find(c => c.id === id);

    if (!course) return;

    const faculty = course.faculty;

    const modal = document.getElementById("facultyModal");
    const content = document.getElementById("facultyContent");

    content.innerHTML = `

        <div style="text-align:center;">

            <img src="${faculty.photo}"
                 width="120"
                 style="border-radius:50%;margin-bottom:15px;">

            <h2>${faculty.name}</h2>

            <p><b>${faculty.designation}</b></p>

        </div>

        <hr><br>

        <p><b>Qualification:</b> ${faculty.qualification}</p>

        <p><b>Experience:</b> ${faculty.experience}</p>

        <p><b>Specialization:</b> ${faculty.specialization}</p>

        <p><b>Email:</b> ${faculty.email}</p>

        <p><b>Phone:</b> ${faculty.phone}</p>

        <br>

        <p>${faculty.bio}</p>

    `;

    modal.style.display = "flex";

}


// View Syllabus
function viewSyllabus(id) {

    const course = enrolledCourses.find(c => c.id === id);

    if (!course) return;

    const s = course.syllabus;

    const modal = document.getElementById("syllabusModal");
    const content = document.getElementById("syllabusContent");

    let modules = "";

    s.modules.forEach(module => {

        modules += `

            <h3>${module.title}</h3>

            <p><b>Topics:</b> ${module.topics}</p>

            <p><b>Lessons:</b> ${module.lessons}</p>

            <p><b>Duration:</b> ${module.duration}</p>

            <hr>

        `;

    });

    content.innerHTML = `

        <h2>${course.name}</h2>

        <p><b>Description:</b> ${course.description}</p>

        <br>

        <p><b>Objectives:</b> ${s.objectives}</p>

        <p><b>Prerequisites:</b> ${s.prerequisites}</p>

        <p><b>Learning Outcomes:</b> ${s.outcomes}</p>

        <br>

        ${modules}

    `;

    modal.style.display = "flex";

}


// Close Modals
document.getElementById("closeFaculty").onclick = () => {

    document.getElementById("facultyModal").style.display = "none";

};

document.getElementById("closeSyllabus").onclick = () => {

    document.getElementById("syllabusModal").style.display = "none";

};


// Close on outside click
window.onclick = function(event){

    const facultyModal = document.getElementById("facultyModal");
    const syllabusModal = document.getElementById("syllabusModal");

    if(event.target === facultyModal){

        facultyModal.style.display = "none";

    }

    if(event.target === syllabusModal){

        syllabusModal.style.display = "none";

    }

};


// Logout
document.getElementById("logoutBtn").addEventListener("click", () => {

    localStorage.removeItem("isLoggedIn");

    window.location.href = "login.html";

});


// Display student name
const studentName = localStorage.getItem("studentName");

if(studentName){

    document.getElementById("studentName").textContent = studentName;

}