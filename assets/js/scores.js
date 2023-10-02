function printHighscores() {
    // either get scores from localstorage or set to empty array
    var highscores = JSON.parse(window.localStorage.getItem("highscores")) || [];
  
    // sort highscores by score property in descending order
    highscores.sort(function(a, b) {
      return b.score - a.score;
    });
  
    highscores.forEach(function(score) {
      // create li tag for each high score
      if(score === null) {
        return;
      }
      var liTag = document.createElement("li");
      liTag.textContent = score.initials + " - " + score.score;
      console.log(liTag.textContent)
      // display on page
      var olEl = document.getElementById("highscores");
      olEl.appendChild(liTag);
    });
  }
  
  function clearHighscores() {
    // Remove highscores from local storage
    window.localStorage.removeItem("highscores");
     // Optionally, you can reload the page to reflect the cleared highscores
    window.location.reload();
  }
  
  document.getElementById("clear-btn").addEventListener("click", clearHighscores);
  
  // run function when page loads
  printHighscores();
  