var startBtn = document.getElementById("start-btn");
var alertEl = document.getElementById("alert");
var btnEl = document.getElementById("btn");
var questionSection = document.getElementById("question-section");
var choicesList = document.getElementById("choices-list");
var timerEl = document.querySelector(".timer-count");
var questionsContainer = document.querySelector(".question-container");
var initials = document.getElementById("initials");

// Keep track of the current question index
var currentQuestionIndex = 0;
// var timeRemaining = questions.length * 15;
var timeRemaining = 10;

function displayTime() {
    timerEl.textContent = timeRemaining;

    if (timeRemaining <= 0) {
        var wordBlank = document.getElementById("wordBlank");
        if (wordBlank) {
            wordBlank.style.display = "block";

            // Update the final score element
            var finalScoreElement = document.getElementById("final-score");
            finalScoreElement.textContent = "Your Score: " + timeRemaining;
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
    questionsContainer.style.display = "block"
    // Reset game state
    currentQuestionIndex = 0;
    // timeRemaining = questions.length * 15;
    timeRemaining = 10;

    // Hide the "GAME OVER" message and score display initially
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
                wordBlank.style.display = "block";
                //wordBlank.textContent = "GAME OVER";
                questionsContainer.style.display = "none"

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

function displayHighScorePage() {
    // Get the final score
    var finalScore = timeRemaining;

    // Set the content of the final score element
    var finalScoreElement = document.getElementById("final-score");
    finalScoreElement.textContent = "Your Score: " + finalScore;

    // Navigate to the high scores page
    window.location.href = "highscores.html";
}

// Event listener for choices
choicesList.addEventListener("click", function (event) {
    var selectedIndex = event.target.getAttribute("data-index");
    if (selectedIndex !== null) {
        // Handle the user's choice (compare with the correct answer, etc.)
        console.log("User chose:", questions[currentQuestionIndex].Choices[selectedIndex]);

        if (questions[currentQuestionIndex].Choices[selectedIndex] !== questions[currentQuestionIndex].Answer) {
            alertEl.textContent = "Ooops Wrong Answer ";
            alertEl.style.backgroundColor = "red";
            alertEl.style.color = "blueviolet";
            //reduce your timer count
            timeRemaining -= 15;
        } else {
            alertEl.textContent = "Oh Correct Answer ";
            alertEl.style.backgroundColor = "green";
            alertEl.style.color = "blueviolet";
        }

        // Move to the next question
        currentQuestionIndex++;

        // Display the next question (if available)
        if (currentQuestionIndex < questions.length) {
            displayQuestion(questions[currentQuestionIndex]);
        } else {
            displayHighScorePage()
            // Optionally, do something when all questions are answered
            console.log("All questions answered!");

        }
    }
});

function resetGame() {
    // Enable the Start button
    startBtn.removeAttribute("disabled");

     // Calculate user's score based on the remaining time
     var userScore = timeRemaining

    // Start the game
    startGame();

    var userInitials = {
        initials: initials.value.trim(),
        score: userScore
    };
}

startBtn.addEventListener("click", function (event) {
    event.preventDefault();

    // Disable the Start button to prevent multiple game instances
    startBtn.setAttribute("disabled", "true");

    // Start the game
    startGame();
});

btnEl.addEventListener("click", function () {
    var highscores = JSON.parse(localStorage.getItem("highscores")) || [];

    // Calculate user's score based on the remaining time
    var userScore = timeRemaining

    var userInitials = {
        initials: initials.value.trim(),
        score: userScore
    };

    highscores.push(userInitials);
    localStorage.setItem("highscores", JSON.stringify(highscores));
    displayHighScorePage();
});
