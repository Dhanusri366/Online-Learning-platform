// ======================================
// PurpleLearn Course Management
// ======================================

let courses = [];

// Load data
async function loadCourses() {

    // If localStorage already has courses, use them
    const storedCourses = localStorage.getItem("courses");

    if (storedCourses) {

        courses = JSON.parse(storedCourses);
        displayCourses(courses);
        return;
    }

    // First time load from JSON
    try {

        const response = await fetch("course.json");
        courses = await response.json();

        localStorage.setItem("courses", JSON.stringify(courses));

        displayCourses(courses);

    } catch (error) {

        console.error("Error loading courses:", error);

    }

}

loadCourses();


// ==============================
// Display Courses
// ==============================

function displayCourses(courseList) {

    const grid = document.getElementById("courseGrid");

    grid.innerHTML = "";

    courseList.forEach(course => {

        grid.innerHTML += `

        <div class="course-card">

            <img src="${course.image}" alt="${course.name}">

            <div class="course-info">

                <h3>${course.name}</h3>

                <p><strong>Category:</strong> ${course.category}</p>

                <p><strong>Duration:</strong> ${course.duration}</p>

                <p><strong>Fee:</strong> ₹${course.fee}</p>

                <p><strong>Instructor:</strong> ${course.instructor}</p>

                <div class="buttons">

                    <button
                        class="details-btn"
                        onclick="viewCourse(${course.id})">

                        View

                    </button>

                    <button
                        class="enroll-btn"
                        onclick="editCourse(${course.id})">

                        Edit

                    </button>

                    <button
                        style="background:#EF4444;color:white;"
                        onclick="deleteCourse(${course.id})">

                        Delete

                    </button>

                </div>

            </div>

        </div>

        `;

    });

}


// ==============================
// Search
// ==============================

document.getElementById("searchCourse")
.addEventListener("input", function () {

    const search = this.value.toLowerCase();

    const filtered = courses.filter(course =>

        course.name.toLowerCase().includes(search)

    );

    displayCourses(filtered);

});
// ======================================
// CRUD Operations
// ======================================

const modal = document.getElementById("courseModal");
const viewModal = document.getElementById("viewModal");

const form = document.getElementById("courseForm");

const modalTitle = document.getElementById("modalTitle");

const courseId = document.getElementById("courseId");
const courseName = document.getElementById("courseName");
const category = document.getElementById("category");
const duration = document.getElementById("duration");
const fee = document.getElementById("fee");
const instructor = document.getElementById("instructor");
const image = document.getElementById("image");

// Open Add Modal
document.getElementById("addCourseBtn").addEventListener("click", () => {

    form.reset();

    courseId.value = "";

    modalTitle.textContent = "Add Course";

    modal.style.display = "flex";

});

// Close Modals
document.getElementById("closeModal").onclick = () => {

    modal.style.display = "none";

};

document.getElementById("closeView").onclick = () => {

    viewModal.style.display = "none";

};

// Save Course
form.addEventListener("submit", function(e){

    e.preventDefault();

    if(
        courseName.value.trim()==="" ||
        duration.value.trim()==="" ||
        fee.value.trim()===""
    ){

        alert("Please fill all required fields.");
        return;

    }

    const course = {

        id: courseId.value
            ? Number(courseId.value)
            : Date.now(),

        name: courseName.value,

        category: category.value,

        duration: duration.value,

        fee: Number(fee.value),

        instructor: instructor.value,

        image:
            image.value ||
            "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600"

    };

    if(courseId.value){

        const index = courses.findIndex(c=>c.id==course.id);

        courses[index]=course;

    }else{

        courses.push(course);

    }

    localStorage.setItem("courses",JSON.stringify(courses));

    displayCourses(courses);

    modal.style.display="none";

});
// ======================================
// View, Edit & Delete
// ======================================

// View Course Details
function viewCourse(id) {

    const course = courses.find(c => c.id === id);

    if (!course) return;

    document.getElementById("courseDetails").innerHTML = `
        <img src="${course.image}"
             style="width:100%;height:220px;object-fit:cover;border-radius:15px;">

        <h2 style="margin-top:20px;color:#7C3AED;">
            ${course.name}
        </h2>

        <p><strong>Category:</strong> ${course.category}</p>

        <p><strong>Instructor:</strong> ${course.instructor}</p>

        <p><strong>Duration:</strong> ${course.duration}</p>

        <p><strong>Fee:</strong> ₹${course.fee}</p>
    `;

    viewModal.style.display = "flex";
}


// Edit Course
function editCourse(id) {

    const course = courses.find(c => c.id === id);

    if (!course) return;

    modalTitle.textContent = "Edit Course";

    courseId.value = course.id;
    courseName.value = course.name;
    category.value = course.category;
    duration.value = course.duration;
    fee.value = course.fee;
    instructor.value = course.instructor;
    image.value = course.image;

    modal.style.display = "flex";

}


// Delete Course
function deleteCourse(id) {

    const confirmDelete = confirm("Delete this course?");

    if (!confirmDelete) return;

    courses = courses.filter(course => course.id !== id);

    localStorage.setItem("courses", JSON.stringify(courses));

    displayCourses(courses);

    alert("Course deleted successfully!");

}


// Close modal when clicking outside
window.onclick = function (event) {

    if (event.target === modal) {

        modal.style.display = "none";

    }

    if (event.target === viewModal) {

        viewModal.style.display = "none";

    }

};