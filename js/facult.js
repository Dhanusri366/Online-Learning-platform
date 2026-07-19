// =====================================
// PurpleLearn Faculty Management
// Load & Display Faculty
// =====================================

let faculty = JSON.parse(localStorage.getItem("faculty")) || [];

// Default Faculty (only first time)
if (faculty.length === 0) {

    faculty = [

        {
            id: 1,
            photo: "https://i.pravatar.cc/200?img=11",
            name: "Sarah Johnson",
            designation: "Senior Trainer",
            qualification: "M.Tech",
            experience: "8 Years",
            email: "sarah@purplelearn.com",
            phone: "+91 9876543210"
        },

        {
            id: 2,
            photo: "https://i.pravatar.cc/200?img=12",
            name: "David Miller",
            designation: "Java Trainer",
            qualification: "MCA",
            experience: "6 Years",
            email: "david@purplelearn.com",
            phone: "+91 9876543211"
        },

        {
            id: 3,
            photo: "https://i.pravatar.cc/200?img=13",
            name: "Emily Brown",
            designation: "React Developer",
            qualification: "B.Tech",
            experience: "5 Years",
            email: "emily@purplelearn.com",
            phone: "+91 9876543212"
        }

    ];

    localStorage.setItem("faculty", JSON.stringify(faculty));

}


// =======================
// Display Faculty
// =======================

function displayFaculty(list){

    const grid = document.getElementById("facultyGrid");

    grid.innerHTML = "";

    list.forEach(f => {

        grid.innerHTML += `

        <div class="course-card">

            <img src="${f.photo}" alt="${f.name}">

            <div class="course-info">

                <h3>${f.name}</h3>

                <p><strong>${f.designation}</strong></p>

                <p>${f.qualification}</p>

                <p>${f.experience}</p>

                <div class="buttons">

                    <button
                        class="details-btn"
                        onclick="viewFaculty(${f.id})">

                        View

                    </button>

                    <button
                        class="enroll-btn"
                        onclick="editFaculty(${f.id})">

                        Edit

                    </button>

                    <button
                        style="background:#EF4444;color:white;"
                        onclick="deleteFaculty(${f.id})">

                        Delete

                    </button>

                </div>

            </div>

        </div>

        `;

    });

}

displayFaculty(faculty);


// =======================
// Search
// =======================

document.getElementById("searchFaculty")
.addEventListener("input", function(){

    const search = this.value.toLowerCase();

    const filtered = faculty.filter(f =>

        f.name.toLowerCase().includes(search)

    );

    displayFaculty(filtered);

});
// =====================================
// CRUD Operations
// =====================================

const modal = document.getElementById("facultyModal");
const viewModal = document.getElementById("facultyViewModal");

const form = document.getElementById("facultyForm");

const facultyTitle = document.getElementById("facultyTitle");

const facultyId = document.getElementById("facultyId");
const facultyName = document.getElementById("facultyName");
const designation = document.getElementById("designation");
const qualification = document.getElementById("qualification");
const experience = document.getElementById("experience");
const facultyEmail = document.getElementById("facultyEmail");
const facultyPhone = document.getElementById("facultyPhone");
const facultyPhoto = document.getElementById("facultyPhoto");

// Open Add Faculty Modal
document.getElementById("addFacultyBtn").addEventListener("click", () => {

    form.reset();

    facultyId.value = "";

    facultyTitle.textContent = "Add Faculty";

    modal.style.display = "flex";

});

// Close Modals
document.getElementById("closeFaculty").onclick = () => {

    modal.style.display = "none";

};

document.getElementById("closeFacultyView").onclick = () => {

    viewModal.style.display = "none";

};

// Save Faculty
form.addEventListener("submit", function(e){

    e.preventDefault();

    if (
        facultyName.value.trim() === "" ||
        designation.value.trim() === "" ||
        qualification.value.trim() === ""
    ) {

        alert("Please fill all required fields.");
        return;

    }

    const newFaculty = {

        id: facultyId.value
            ? Number(facultyId.value)
            : Date.now(),

        name: facultyName.value,

        designation: designation.value,

        qualification: qualification.value,

        experience: experience.value,

        email: facultyEmail.value,

        phone: facultyPhone.value,

        photo:
            facultyPhoto.value ||
            `https://i.pravatar.cc/200?u=${Date.now()}`

    };

    if (facultyId.value) {

        const index = faculty.findIndex(f => f.id == newFaculty.id);

        faculty[index] = newFaculty;

    } else {

        faculty.push(newFaculty);

    }

    localStorage.setItem("faculty", JSON.stringify(faculty));

    displayFaculty(faculty);

    modal.style.display = "none";

});

// View Faculty
function viewFaculty(id){

    const f = faculty.find(item => item.id === id);

    if (!f) return;

    document.getElementById("facultyDetails").innerHTML = `
        <img src="${f.photo}"
             style="width:150px;height:150px;border-radius:50%;display:block;margin:auto;object-fit:cover;">

        <h2 style="text-align:center;margin-top:20px;color:#7C3AED;">
            ${f.name}
        </h2>

        <p><strong>Designation:</strong> ${f.designation}</p>
        <p><strong>Qualification:</strong> ${f.qualification}</p>
        <p><strong>Experience:</strong> ${f.experience}</p>
        <p><strong>Email:</strong> ${f.email}</p>
        <p><strong>Contact:</strong> ${f.phone}</p>
    `;

    viewModal.style.display = "flex";

}

// Edit Faculty
function editFaculty(id){

    const f = faculty.find(item => item.id === id);

    if (!f) return;

    facultyTitle.textContent = "Edit Faculty";

    facultyId.value = f.id;
    facultyName.value = f.name;
    designation.value = f.designation;
    qualification.value = f.qualification;
    experience.value = f.experience;
    facultyEmail.value = f.email;
    facultyPhone.value = f.phone;
    facultyPhoto.value = f.photo;

    modal.style.display = "flex";

}

// Delete Faculty
function deleteFaculty(id){

    if (!confirm("Delete this faculty member?")) return;

    faculty = faculty.filter(f => f.id !== id);

    localStorage.setItem("faculty", JSON.stringify(faculty));

    displayFaculty(faculty);

    alert("Faculty deleted successfully!");

}

// Close modal when clicking outside
window.onclick = function(event){

    if(event.target === modal){

        modal.style.display = "none";

    }

    if(event.target === viewModal){

        viewModal.style.display = "none";

    }

};