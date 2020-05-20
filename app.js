/*
 * Ping game
 */

// variable declarations and initialization
var scores, roundScore, currentPlayer, gameOver, previousRoll;
var count =0;

// counters are set to 0 for both players
resetCounters()

// handle a new game 
document.querySelector(".btn-new").addEventListener("click", resetCounters);

// handle the rolling of the dice
document.querySelector(".btn-roll").addEventListener("click", function () {

    if (!gameOver){

        var dices = []

        for(i=0; i<2;i++){    
            dices[i] = Math.floor(Math.random() * 6) + 1;

            // display the appropriate dice image
            document.getElementById('dice-'+i).style.display="block";
            document.getElementById('dice-' +i).src= 'images/dice-'+ dices[i] + '.png';
        }
     
        if (dices[0] === 1 || dices[1] === 1) switchPlayers();
        else {

            roundScore += (dices[0]+dices[1]);
            document.getElementById( "current-" + currentPlayer).textContent = roundScore;
            // previousRoll= dice;
            

     /*        //if a six is rolled twice in a row, reset total score to 0
            if (dice === 6 && dice === previousRoll) {
                scores[currentPlayer] = 0;
                document.getElementById("score-" + currentPlayer).textContent = "0";
                switchPlayers();          
        }
            else{     
                
                roundScore += dice;
                document.getElementById( "current-" + currentPlayer).textContent = roundScore;
                previousRoll= dice;
            }    */   
            
        
        }
    }
    
});

document.querySelector(".btn-hold").addEventListener("click", function () {

    if (!gameOver){
        //add current round score to total score of current player
        scores[currentPlayer] += roundScore;

        //update the UI
        document.getElementById("score-" + currentPlayer).textContent =
            scores[currentPlayer];

        var winningScore;
        var input = document.getElementById('winning-score').value;
    
        //if a custom winning score is provided, get its value otherwise set it to 100
        input ? winningScore = input : winningScore=100;

        // check if current player has won the game
        if (scores[currentPlayer] >= winningScore) {
            gameOver = true;

            document.getElementById('name-'+ currentPlayer).textContent = 'Winner!';
            hideDices()
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

  hideDices()

  previousRoll= -1;
}

function resetCounters() {
    scores = [0, 0];
    roundScore = 0;
    currentPlayer = 0; //player 0 starts the game
    gameOver = false;
    previousRoll = -1;

    // don't show the dice at the beginning of the game
    hideDices()


    for (i = 0; i < scores.length; i++) {
        document.getElementById("score-" + i).textContent = "0";
        document.getElementById("current-" + i).textContent = "0";
        player = i+1;
        document.getElementById('name-'+ i).textContent = 'Player '+ player;
        document.querySelector(".player-"+i+"-panel").classList.remove("active");
        document.querySelector(".player-"+i+"-panel").classList.remove("winner");
        document.getElementById('dice-'+i).style.display = "none";

      }

  
      //add the active class to the first player
      document.querySelector(".player-0-panel").classList.add("active");
  }

  function hideDices(){

    for (i = 0; i < 2; i++) {
        document.getElementById('dice-'+i).style.display = "none";
      }

  }
