// =====================================
// PurpleLearn Student Management
// Load & Display Students
// =====================================

let students = JSON.parse(localStorage.getItem("students")) || [];

// Demo Data (only if no students exist)
if (students.length === 0) {

    students = [

        {
            id: 1,
            photo: "https://i.pravatar.cc/200?img=21",
            name: "Rahul Sharma",
            email: "rahul@gmail.com",
            mobile: "9876543210",
            enrolledCourses: 3,
            progress: 75,
            certificate: "Completed"
        },

        {
            id: 2,
            photo: "https://i.pravatar.cc/200?img=22",
            name: "Priya Singh",
            email: "priya@gmail.com",
            mobile: "9876543211",
            enrolledCourses: 2,
            progress: 45,
            certificate: "In Progress"
        },

        {
            id: 3,
            photo: "https://i.pravatar.cc/200?img=23",
            name: "Arjun Kumar",
            email: "arjun@gmail.com",
            mobile: "9876543212",
            enrolledCourses: 5,
            progress: 100,
            certificate: "Completed"
        }

    ];

    localStorage.setItem("students", JSON.stringify(students));

}

// =======================
// Display Students
// =======================

function displayStudents(list) {

    const grid = document.getElementById("studentGrid");

    grid.innerHTML = "";

    list.forEach(student => {

        grid.innerHTML += `

        <div class="course-card">

            <img src="${student.photo}" alt="${student.name}">

            <div class="course-info">

                <h3>${student.name}</h3>

                <p><strong>Email:</strong> ${student.email}</p>

                <p><strong>Courses:</strong> ${student.enrolledCourses}</p>

                <p><strong>Progress:</strong> ${student.progress}%</p>

                <p><strong>Certificate:</strong> ${student.certificate}</p>

                <div class="buttons">

                    <button
                        class="details-btn"
                        onclick="viewStudent(${student.id})">

                        View

                    </button>

                    <button
                        class="enroll-btn"
                        onclick="editStudent(${student.id})">

                        Edit

                    </button>

                    <button
                        style="background:#EF4444;color:white;"
                        onclick="deleteStudent(${student.id})">

                        Delete

                    </button>

                </div>

            </div>

        </div>

        `;

    });

}

displayStudents(students);

// =======================
// Search Students
// =======================

document.getElementById("searchStudent")
.addEventListener("input", function () {

    const search = this.value.toLowerCase();

    const filtered = students.filter(student =>
        student.name.toLowerCase().includes(search)
    );

    displayStudents(filtered);

});

// =====================================
// View, Edit & Delete Students
// =====================================

const studentModal = document.getElementById("studentModal");
const closeStudent = document.getElementById("closeStudent");

// Close Modal
closeStudent.onclick = () => {

    studentModal.style.display = "none";

};

// =======================
// View Student
// =======================

function viewStudent(id) {

    const student = students.find(s => s.id === id);

    if (!student) return;

    document.getElementById("studentDetails").innerHTML = `

        <img
            src="${student.photo}"
            style="width:150px;height:150px;border-radius:50%;display:block;margin:auto;object-fit:cover;">

        <h2
            style="text-align:center;margin:20px 0;color:#7C3AED;">

            ${student.name}

        </h2>

        <p><strong>Email:</strong> ${student.email}</p>

        <p><strong>Mobile:</strong> ${student.mobile}</p>

        <p><strong>Enrolled Courses:</strong> ${student.enrolledCourses}</p>

        <p><strong>Progress</strong></p>

<div class="progress-bar">
    <div
        class="progress-fill"
        style="width:${student.progress}%">

        ${student.progress}%

    </div>
</div>

        <p><strong>Certificate Status:</strong> ${student.certificate}</p>

    `;

    studentModal.style.display = "flex";

}

// =======================
// Edit Student
// =======================

function editStudent(id) {

    const student = students.find(s => s.id === id);

    if (!student) return;

    const newName = prompt("Student Name", student.name);
    if (newName === null) return;

    const newEmail = prompt("Email", student.email);
    if (newEmail === null) return;

    const newMobile = prompt("Mobile Number", student.mobile);
    if (newMobile === null) return;

    const newProgress = prompt("Progress (%)", student.progress);
    if (newProgress === null) return;

    student.name = newName;
    student.email = newEmail;
    student.mobile = newMobile;
    student.progress = Number(newProgress);

    localStorage.setItem("students", JSON.stringify(students));

    displayStudents(students);

    alert("Student updated successfully!");

}

// =======================
// Delete Student
// =======================

function deleteStudent(id) {

    if (!confirm("Delete this student?")) return;

    students = students.filter(student => student.id !== id);

    localStorage.setItem("students", JSON.stringify(students));

    displayStudents(students);

    alert("Student deleted successfully!");

}

// =======================
// Close Modal on Outside Click
// =======================

window.onclick = function (event) {

    if (event.target === studentModal) {

        studentModal.style.display = "none";

    }

};