var startBtn = document.getElementById("start-btn");
var timerEl = document.querySelector(".timer-count");
var questionSection = document.getElementById("question-section");

var timeRemaining = questions.length * 15;

function displayTime() {
    timerEl.textContent = timeRemaining;
}

function displayQuestion(question) {
    questionSection.textContent = question;
}

startBtn.addEventListener("click", function (event) {
    event.preventDefault();

    // Disable the start button after starting game
    startBtn.setAttribute("disabled", "true");

    var timeInterval = setInterval(function () {
        displayTime();
        timeRemaining--;

        if (timeRemaining <= 0) {
            clearInterval(timeInterval);
            var wordBlank = document.getElementById("wordBlank");
            if (wordBlank) {
                wordBlank.textContent = "GAME OVER";
        }
        // Re-enable the start button when the game is over
        startBtn.removeAttribute("disabled");
    }
    }, 1000);
});