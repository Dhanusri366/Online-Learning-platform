// =======================================
// PurpleLearn Discussion Forum
// Load Discussions
// =======================================

let discussions = JSON.parse(localStorage.getItem("discussions")) || [];

// Sample Data
if (discussions.length === 0) {

    discussions = [

        {
            id: 1,
            title: "Difference between let, var and const?",
            student: "Rahul Sharma",
            category: "Programming",
            description: "Can someone explain the difference between let, var and const with examples?",
            date: new Date().toLocaleDateString(),
            replies: [
                {
                    id: 1,
                    student: "Sarah Johnson",
                    reply: "let is block scoped, var is function scoped and const cannot be reassigned.",
                    date: new Date().toLocaleString()
                }
            ]
        },

        {
            id: 2,
            title: "React useState not updating",
            student: "Priya Singh",
            category: "Web Development",
            description: "My React state is not updating immediately after setState(). Why?",
            date: new Date().toLocaleDateString(),
            replies: []
        }

    ];

    localStorage.setItem("discussions", JSON.stringify(discussions));

}

// =======================================
// Display Discussions
// =======================================

function displayDiscussions(list){

    const container = document.getElementById("discussionContainer");

    container.innerHTML = "";

    list.forEach(discussion=>{

        container.innerHTML += `

        <div class="course-card">

            <div class="course-info">

                <h3>${discussion.title}</h3>

                <p><strong>Student:</strong> ${discussion.student}</p>

                <p><strong>Date:</strong> ${discussion.date}</p>

                <p>${discussion.description}</p>

                <p><strong>Total Replies:</strong> ${discussion.replies.length}</p>

                <div class="buttons">

                    <button
                        class="details-btn"
                        onclick="viewDiscussion(${discussion.id})">

                        View Discussion

                    </button>

                    <button
                        class="enroll-btn"
                        onclick="replyDiscussion(${discussion.id})">

                        Reply

                    </button>

                </div>

            </div>

        </div>

        `;

    });

}

displayDiscussions(discussions);

// =======================================
// Ask Question Modal
// =======================================

const questionModal = document.getElementById("questionModal");

document.getElementById("askQuestionBtn").onclick = ()=>{

    questionModal.style.display="flex";

};

document.getElementById("closeQuestion").onclick=()=>{

    questionModal.style.display="none";

};

document.getElementById("cancelQuestion").onclick=()=>{

    questionModal.style.display="none";

};

// =======================================
// Search Discussion
// =======================================

document.getElementById("searchDiscussion")
.addEventListener("input",function(){

    const search=this.value.toLowerCase();

    const filtered=discussions.filter(d=>

        d.student.toLowerCase().includes(search)

    );

    displayDiscussions(filtered);

});

// =======================================
// Post Question
// =======================================

document.getElementById("questionForm")
.addEventListener("submit",function(e){

    e.preventDefault();

    const title=document.getElementById("questionTitle").value.trim();

    const category=document.getElementById("questionCategory").value;

    const description=document.getElementById("questionDescription").value.trim();

    if(title==="" || description===""){

        alert("Please fill all required fields.");

        return;

    }

    discussions.unshift({

        id:Date.now(),

        title,

        category,

        description,

        student:"Current Student",

        date:new Date().toLocaleDateString(),

        replies:[]

    });

    localStorage.setItem("discussions",JSON.stringify(discussions));

    displayDiscussions(discussions);

    this.reset();

    questionModal.style.display="none";

    alert("Question posted successfully!");

});

// =======================================
// View Discussion & Reply
// =======================================

const discussionModal = document.getElementById("discussionModal");

document.getElementById("closeDiscussion").onclick = () => {
    discussionModal.style.display = "none";
};

// ===============================
// View Discussion
// ===============================

function viewDiscussion(id) {

    const discussion = discussions.find(d => d.id === id);

    if (!discussion) return;

    let replyHTML = "";

    if (discussion.replies.length === 0) {

        replyHTML = "<p>No replies yet.</p>";

    } else {

        discussion.replies.forEach(reply => {

            replyHTML += `

            <div class="reply-card">

                <h4>${reply.student}</h4>

                <p>${reply.reply}</p>

                <small>${reply.date}</small>

                <div class="buttons">

                    <button
                        class="details-btn"
                        onclick="editReply(${discussion.id},${reply.id})">

                        Edit

                    </button>

                    <button
                        style="background:#EF4444;color:white;"
                        onclick="deleteReply(${discussion.id},${reply.id})">

                        Delete

                    </button>

                </div>

            </div>

            `;

        });

    }

    document.getElementById("discussionDetails").innerHTML = `

        <h2>${discussion.title}</h2>

        <p><strong>Student:</strong> ${discussion.student}</p>

        <p><strong>Category:</strong> ${discussion.category}</p>

        <p><strong>Date:</strong> ${discussion.date}</p>

        <hr>

        <p>${discussion.description}</p>

        <hr>

        <h3>Replies</h3>

        ${replyHTML}

        <button
            class="login-btn"
            style="margin-top:20px;"
            onclick="replyDiscussion(${discussion.id})">

            Add Reply

        </button>

    `;

    discussionModal.style.display = "flex";

}

// ===============================
// Add Reply
// ===============================

function replyDiscussion(id) {

    const discussion = discussions.find(d => d.id === id);

    if (!discussion) return;

    const text = prompt("Enter your reply:");

    if (!text || text.trim() === "") return;

    discussion.replies.push({

        id: Date.now(),

        student: "Current Student",

        reply: text,

        date: new Date().toLocaleString()

    });

    localStorage.setItem("discussions", JSON.stringify(discussions));

    displayDiscussions(discussions);

    viewDiscussion(id);

}

// ===============================
// Edit Reply
// ===============================

function editReply(discussionId, replyId) {

    const discussion = discussions.find(d => d.id === discussionId);

    const reply = discussion.replies.find(r => r.id === replyId);

    const updated = prompt("Edit Reply", reply.reply);

    if (!updated || updated.trim() === "") return;

    reply.reply = updated;

    reply.date = new Date().toLocaleString();

    localStorage.setItem("discussions", JSON.stringify(discussions));

    viewDiscussion(discussionId);

}

// ===============================
// Delete Reply
// ===============================

function deleteReply(discussionId, replyId) {

    if (!confirm("Delete this reply?")) return;

    const discussion = discussions.find(d => d.id === discussionId);

    discussion.replies = discussion.replies.filter(r => r.id !== replyId);

    localStorage.setItem("discussions", JSON.stringify(discussions));

    displayDiscussions(discussions);

    viewDiscussion(discussionId);

}

// ===============================
// Close Modal on Outside Click
// ===============================

window.onclick = function (event) {

    if (event.target === questionModal) {
        questionModal.style.display = "none";
    }

    if (event.target === discussionModal) {
        discussionModal.style.display = "none";
    }

};