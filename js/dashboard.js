// Dashboard Statistics

const dashboardData = {
    totalCourses: 12,
    videosWatched: 95,
    progress: "82%",
    certificates: 5
};

document.getElementById("totalCourses").textContent =
dashboardData.totalCourses;

document.getElementById("videosWatched").textContent =
dashboardData.videosWatched;

document.getElementById("progress").textContent =
dashboardData.progress;

document.getElementById("certificates").textContent =
dashboardData.certificates;

// Notification

const notification = document.querySelector(".notification");

notification.addEventListener("click", () => {
    alert("🔔 You have 3 new course updates!");
});