// ==============================
// PurpleLearn Quiz Module
// ==============================

const questionNumber = document.getElementById("questionNumber");
const question = document.getElementById("question");
const options = document.getElementById("options");

const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const submitBtn = document.getElementById("submitBtn");

let quizData = [];
let currentQuestion = 0;

// Stores selected answer for each question
let userAnswers = [];

// Load Quiz Questions
fetch("quiz.json")
    .then(response => response.json())
    .then(data => {

        quizData = data;

        loadQuestion();

    })
    .catch(error => {

        console.error("Unable to load quiz:", error);

    });


// Display Question

function loadQuestion() {

    const q = quizData[currentQuestion];

    questionNumber.textContent =
        `Question ${currentQuestion + 1} of ${quizData.length}`;

    question.textContent = q.question;

    options.innerHTML = "";

    q.options.forEach((option, index) => {

        const optionDiv = document.createElement("div");

        optionDiv.className = "option";

        optionDiv.innerHTML = `

            <label>

                <input
                    type="radio"
                    name="answer"
                    value="${index}"

                    ${userAnswers[currentQuestion] == index ? "checked" : ""}>

                ${option}

            </label>

        `;

        optionDiv.querySelector("input").addEventListener("change", () => {

            userAnswers[currentQuestion] = index;

        });

        options.appendChild(optionDiv);

    });

}


// Next Question

nextBtn.addEventListener("click", () => {

    if (currentQuestion < quizData.length - 1) {

        currentQuestion++;

        loadQuestion();

    }

});


// Previous Question

prevBtn.addEventListener("click", () => {

    if (currentQuestion > 0) {

        currentQuestion--;

        loadQuestion();

    }

});
// ==============================
// PurpleLearn Quiz Module
// ==============================

// ---------- Timer ----------
let timeLeft = 600; // 10 minutes
const timer = document.getElementById("timer");

const countdown = setInterval(() => {

    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;

    timer.textContent =
        `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

    if (timeLeft <= 0) {

        clearInterval(countdown);

        alert("⏰ Time is up! Quiz submitted automatically.");

        submitQuiz();

    }

    timeLeft--;

}, 1000);


// ---------- Submit Quiz ----------

submitBtn.addEventListener("click", submitQuiz);

function submitQuiz() {

    clearInterval(countdown);

    let correct = 0;
    let wrong = 0;
    let totalMarks = 0;

    quizData.forEach((q, index) => {

        if (userAnswers[index] === q.correctAnswer) {

            correct++;
            totalMarks += q.marks;

        } else {

            wrong++;

        }

    });

    const percentage =
        ((correct / quizData.length) * 100).toFixed(1);

    const status =
        percentage >= 50
            ? "✅ PASS"
            : "❌ FAIL";

    document.getElementById("resultContent").innerHTML = `

        <p><strong>Total Questions:</strong> ${quizData.length}</p>

        <p><strong>Correct Answers:</strong> ${correct}</p>

        <p><strong>Wrong Answers:</strong> ${wrong}</p>

        <p><strong>Score:</strong> ${totalMarks}</p>

        <p><strong>Percentage:</strong> ${percentage}%</p>

        <h2 style="color:${percentage>=50 ? 'green' : 'red'}">
            ${status}
        </h2>

    `;

    document.getElementById("resultModal").style.display = "flex";

}

// ========================================
// Better Submission & Save Result
// ========================================

// Replace the existing submit button listener
submitBtn.removeEventListener("click", submitQuiz);

submitBtn.addEventListener("click", () => {

    const unanswered = quizData.length - userAnswers.filter(answer => answer !== undefined).length;

    if (unanswered > 0) {

        const confirmSubmit = confirm(
            `You still have ${unanswered} unanswered question(s).\n\nDo you want to submit the quiz?`
        );

        if (!confirmSubmit) {
            return;
        }
    }

    submitQuiz();

});


// Improved submit function
function submitQuiz() {

    clearInterval(countdown);

    let correct = 0;
    let wrong = 0;
    let totalMarks = 0;

    quizData.forEach((q, index) => {

        if (userAnswers[index] === q.correctAnswer) {

            correct++;
            totalMarks += q.marks;

        } else {

            wrong++;

        }

    });

    const percentage = ((correct / quizData.length) * 100).toFixed(1);

    const status = percentage >= 50 ? "PASS" : "FAIL";

    // Save quiz result
    localStorage.setItem("quizScore", totalMarks);
    localStorage.setItem("quizPercentage", percentage);
    localStorage.setItem("quizStatus", status);

    document.getElementById("resultContent").innerHTML = `

        <h2 style="color:#7C3AED;">Quiz Result</h2>

        <hr>

        <p><strong>Total Questions:</strong> ${quizData.length}</p>

        <p><strong>Correct Answers:</strong> ${correct}</p>

        <p><strong>Wrong Answers:</strong> ${wrong}</p>

        <p><strong>Score:</strong> ${totalMarks}/${quizData.length}</p>

        <p><strong>Percentage:</strong> ${percentage}%</p>

        <h2 style="color:${status === "PASS" ? "green" : "red"}">
            ${status === "PASS" ? "✅ PASS" : "❌ FAIL"}
        </h2>

    `;

    document.getElementById("resultModal").style.display = "flex";

}