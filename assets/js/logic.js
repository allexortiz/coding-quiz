var startBtn = document.getElementById("start-btn");
var questionSection = document.getElementById("question-section");
var choicesList = document.getElementById("choices-list");
var timerEl = document.querySelector(".timer-count");

// Keep track of the current question index
var currentQuestionIndex = 0;
// var timeRemaining = questions.length * 15;
var timeRemaining = 10;

function displayTime() {
    timerEl.textContent = timeRemaining;

    if (timeRemaining <= 0) {
        var wordBlank = document.getElementById("wordBlank");
        if (wordBlank) {
            wordBlank.textContent = "GAME OVER";
            wordBlank.style.display = "block";
        }
    }
}

function displayQuestion(question) {
    questionSection.textContent = question.Question;
    displayChoices(question.Choices);
}

function displayChoices(choices) {
    // Clear existing choices
    choicesList.innerHTML = "";
    // Display new choices
    choices.forEach(function (choice, index) {
        var choiceItem = document.createElement("li");
        choiceItem.textContent = choice;
        choiceItem.setAttribute("data-index", index);
        choicesList.appendChild(choiceItem);
    });
}

function startGame() {
    // Display the first question
    displayQuestion(questions[currentQuestionIndex]);

    var timeInterval = setInterval(function () {
        displayTime();
        timeRemaining--;

        // Check if the timer has reached 0
        if (timeRemaining <= 0) {
            clearInterval(timeInterval);
            var wordBlank = document.getElementById("wordBlank");
            if (wordBlank) {
                wordBlank.textContent = "GAME OVER";
            }
            // Re-enable the start button when the game is over
            startBtn.removeAttribute("disabled");
            return;  // Exit the function to prevent further execution
        }

        // Check if we've reached the last question
        if (currentQuestionIndex >= questions.length - 1) {
            clearInterval(timeInterval);
            // Optionally, do something when all questions are answered
            console.log("All questions answered!");
            // Re-enable the start button when the game is over
            startBtn.removeAttribute("disabled");
        }
    }, 1000);
}


// Event listener for choices
choicesList.addEventListener("click", function (event) {
    var selectedIndex = event.target.getAttribute("data-index");
    if (selectedIndex !== null) {
        // Handle the user's choice (compare with the correct answer, etc.)
        console.log("User chose:", questions[currentQuestionIndex].Choices[selectedIndex]);

        // Move to the next question
        currentQuestionIndex++;

        // Display the next question (if available)
        if (currentQuestionIndex < questions.length) {
            displayQuestion(questions[currentQuestionIndex]);
        } else {
            // Optionally, do something when all questions are answered
            console.log("All questions answered!");
        }
    }
});

startBtn.addEventListener("click", function (event) {
    event.preventDefault();

    // Disable the Start button to prevent multiple game instances
    startBtn.setAttribute("disabled", "true");

    startGame();
});
