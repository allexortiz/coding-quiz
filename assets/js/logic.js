var startBtn = document.getElementById("start-btn");
var timerEl = document.querySelector(".timer-count");

var timeRemaining = questions.length * 15;

function displayTime() {
    timerEl.textContent = timeRemaining;
}

startBtn.addEventListener("click", function(event) {
    event.preventDefault();

    var timeInterval = setInterval(function() {
        displayTime();
        timeRemaining--;

        if(timeRemaining >= 0) {
            clearInterval(timeInterval);
            wordBlank.textContent = "GAME OVER";
        }
    }, 1000);
});