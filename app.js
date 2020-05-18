/*
 * Ping game
 */

// variable declarations and initialization
var scores, roundScore, currentPlayer;

// counters are set to 0 for both players
resetCounters()

// handle a new game 
document.querySelector(".btn-new").addEventListener("click", resetCounters);

// handle the rolling of the dice
document.querySelector(".btn-roll").addEventListener("click", function () {

    if (!gameOver()){
        var dice = Math.floor(Math.random() * 6) + 1;

        // display the appropriate dice image
        var diceDOM = document.querySelector(".dice");
        diceDOM.style.display = "block";
        diceDOM.src = "images/dice-" + dice + ".png";

        if (dice !== 1) {
            roundScore += dice;
            document.getElementById(
            "current-" + currentPlayer
            ).textContent = roundScore;
        } else {
            switchPlayers();
        }
}
});

document.querySelector(".btn-hold").addEventListener("click", function () {

    if (!gameOver()){
        //add current round score to total score of current player
        scores[currentPlayer] += roundScore;

        //update the UI
        document.getElementById("score-" + currentPlayer).textContent =
            scores[currentPlayer];

        // check if current player has won the game
        if (scores[currentPlayer] >= 100) {

            document.getElementById('name-'+ currentPlayer).textContent = 'Winner!';
            document.querySelector(".dice").style.display = "none";
            document.querySelector(".player-"+currentPlayer+"-panel").classList.remove("active");
            document.querySelector(".player-"+currentPlayer+"-panel").classList.add("winner");
            } else {
            switchPlayers();
        }
}
});

function switchPlayers() {
  roundScore = 0;
  document.getElementById("current-" + currentPlayer).textContent = roundScore;
  currentPlayer === 0 ? (currentPlayer = 1) : (currentPlayer = 0);

  document.querySelector(".player-0-panel").classList.toggle("active");
  document.querySelector(".player-1-panel").classList.toggle("active");

  document.querySelector(".dice").style.display = "none";
}

function resetCounters() {
    scores = [0, 0];
    roundScore = 0;
    currentPlayer = 0; //player 0 starts the game

    // don't show the dice at the beginning of the game
    document.querySelector(".dice").style.display = "none";

    for (i = 0; i < scores.length; i++) {
        document.getElementById("score-" + i).textContent = "0";
        document.getElementById("current-" + i).textContent = "0";
        player = i+1;
        document.getElementById('name-'+ i).textContent = 'Player '+ player;
      }
  }

function gameOver(){
    if (scores[0]>=100 || scores[1] >= 100) return true;
    else return false;
    
}