var timeBtn = document.getElementById("time-left");
var startBtn = document.getElementById("start-btn");

var timeRemaining = questions.length * 15;

function displayTime() {
    timeBtn.textContent = timeRemaining;
}

startBtn.addEventListener("click", function(event) {
    event.preventDefault();

    var timeInterval = setInterval(function() {
        displayTime();
        timeRemaining--;
    }, 1000);
});