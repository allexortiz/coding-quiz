var startBtn = document.getElementById("start-btn");
var questionSection = document.getElementById("question-section");
var choicesList = document.getElementById("choices-list");
var timerEl = document.querySelector(".timer-count");
var answer = document.getElementById("answer");

// Keep track of the current question index
var currentQuestionIndex = 0;
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
    // Reset game state
    currentQuestionIndex = 0;
    timeRemaining = 10;

    // Hide the "GAME OVER" message
    var wordBlank = document.getElementById("wordBlank");
    if (wordBlank) {
        wordBlank.style.display = "none";
    }

    // Display the first question
    displayQuestion(questions[currentQuestionIndex]);

    var timeInterval = setInterval(function () {
        displayTime();

        // Check if the timer has reached 0
        if (timeRemaining <= 0) {
            clearInterval(timeInterval);
            var wordBlank = document.getElementById("wordBlank");
            if (wordBlank) {
                wordBlank.textContent = "GAME OVER";
                wordBlank.style.display = "block";
            }
            // Re-enable the start button when the game is over
            startBtn.removeAttribute("disabled");
            // Exit the function to prevent further execution
            return;
        }

        // Check if we've reached the last question
        if (currentQuestionIndex >= questions.length) {
            clearInterval(timeInterval);
            // Re-enable the start button when the game is over
            startBtn.removeAttribute("disabled");
        }

        timeRemaining--;
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

            // Reset the game when all questions are answered
            resetGame();
        }
    }
});

function resetGame() {
    // Enable the Start button
    startBtn.removeAttribute("disabled");

    // Start the game
    startGame();
}

startBtn.addEventListener("click", function (event) {
    event.preventDefault();

    // Disable the Start button to prevent multiple game instances
    startBtn.setAttribute("disabled", "true");

    // Start the game
    startGame();
});