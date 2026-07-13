const courseGrid = document.getElementById("courseGrid");
const searchInput = document.getElementById("searchInput");
const levelFilter = document.getElementById("levelFilter");

const modal = document.getElementById("courseModal");
const closeBtn = document.querySelector(".close");

const modalTitle = document.getElementById("modalTitle");
const modalDescription = document.getElementById("modalDescription");
const modalInstructor = document.getElementById("modalInstructor");
const modalDuration = document.getElementById("modalDuration");
const modalLevel = document.getElementById("modalLevel");
const modalRating = document.getElementById("modalRating");

let courses = [];

fetch("course.json")
    .then(response => response.json())
    .then(data => {
        courses = data;
        displayCourses(courses);
    })
    .catch(error => {
        console.error("Error loading courses:", error);
    });

function displayCourses(courseList) {

    courseGrid.innerHTML = "";

    if (courseList.length === 0) {
        courseGrid.innerHTML = "<h2>No courses found.</h2>";
        return;
    }

    courseList.forEach(course => {

        const card = document.createElement("div");
        card.className = "course-card";

        card.innerHTML = `
            <img src="${course.image}" alt="${course.name}">

            <div class="course-info">

                <h3>${course.name}</h3>

                <p><strong>Instructor:</strong> ${course.instructor}</p>

                <p><strong>Duration:</strong> ${course.duration}</p>

                <p><strong>Level:</strong> ${course.level}</p>

                <p><strong>Rating:</strong> ⭐ ${course.rating}</p>

                <div class="buttons">

                    <button class="details-btn">
                        View Details
                    </button>

                    <button class="enroll-btn">
                        Enroll
                    </button>

                </div>

            </div>
        `;

        const detailBtn = card.querySelector(".details-btn");

        detailBtn.addEventListener("click", () => {

            modal.style.display = "flex";

            modalTitle.textContent = course.name;
            modalDescription.textContent = course.description;
            modalInstructor.textContent = course.instructor;
            modalDuration.textContent = course.duration;
            modalLevel.textContent = course.level;
            modalRating.textContent = course.rating;

        });

        const enrollBtn = card.querySelector(".enroll-btn");

        enrollBtn.addEventListener("click", () => {

            alert(`🎉 Successfully enrolled in ${course.name}!`);

        });

        courseGrid.appendChild(card);

    });

}

function filterCourses() {

    const search = searchInput.value.toLowerCase();
    const level = levelFilter.value;

    const filtered = courses.filter(course => {

        const matchesSearch =
            course.name.toLowerCase().includes(search) ||
            course.instructor.toLowerCase().includes(search);

        const matchesLevel =
            level === "All" ||
            course.level === level;

        return matchesSearch && matchesLevel;

    });

    displayCourses(filtered);

}

searchInput.addEventListener("keyup", filterCourses);

levelFilter.addEventListener("change", filterCourses);

closeBtn.addEventListener("click", () => {

    modal.style.display = "none";

});

window.addEventListener("click", (e) => {

    if (e.target === modal) {

        modal.style.display = "none";

    }

});