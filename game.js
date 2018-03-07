$(document).ready(function() {
  const wordBank = [
    "bulbasaur",
    "snorlax",
    "jynx",
    "squirtle",
    "butterfree",
    "pikachu",
    "nidoqueen",
    "nidoking",
    "sandshrew",
    "clefable",
    "vulpix",
    "oddish",
    "venomoth",
    "dugtrio",
    "meowth",
    "primeape",
    "psyduck",
    "growlith",
    "poliwag",
    "alakazam",
    "machamp",
    "weepinbell",
    "tentacruel",
    "geodude",
    "rapidash",
    "slowbro",
    "magnemite",
    "dodrio",
    "grimer",
    "cloyster",
    "gengar",
    "onix",
    "drowzee",
    "electrode",
    "exeggutor",
    "cubone",
    "hitmonlee",
    "lickitung",
    "weezing",
    "rhydon",
    "chansey",
    "tangela",
    "starmie",
    "scyther",
    "magmar",
    "tauros",
    "lapras",
    "ditto",
    "vaporeon",
    "porygon",
    "aerodactyl",
    "zapdos",
    "dragonite",
    "mewtwo"
  ];

  let wordArray = new Array();
  let previousGuesses = new Array();
  let currentWord = new String();
  let livesRemaining;

  titleScreen();
  //title screen
  function titleScreen() {
    $("#content").append(
      '<div id="gameTitle"></div><div id="BeginButton" class="button">BEGIN</div>'
    );
    $("#BeginButton").on("click", function() {
      gameScreen();
    });
    $("#opening")[0].play();
  } //display game

  //display the game screen

  function gameScreen() {
    livesRemaining = 7;
    $("#content").empty(); //empties titleScreen in order to create the gameScreen
    $("#content").append('<div id="wordContainer"></div>');
    $("#content").append(
      '<div id="guesses">' + "Previous guesses:" + "<br>" + "</div>"
    );
    $("#content").append(
      '<div id="lives">' + "Lives Remaining: " + livesRemaining + "</div>"
    );
    $("#content").append('<div id="playerFeedback"></div>');

    //for the button
    getWord();
    let numberOfTiles = wordArray.length;

    previousGuesses = [];

    for (i = 0; i < numberOfTiles; i++) {
      $("#wordContainer").append('<div class="tile" id=t' + i + "></div>");
    }

    $(document).on("keyup", handleKeyUp);
  }

  function getWord() {
    currentWord = wordBank[Math.floor(Math.random() * wordBank.length)];
    wordArray = currentWord.split("");
  }

  //Key input function
  $(document).on("keyup", handleKeyUp);
  function handleKeyUp(event) {
    if (event.keyCode > 64 && event.keyCode < 91) {
      let found = false; //this variable is used to determine if the typed key is located in the word
      let previouslyEntered = false; //this variable is used to check if the letter has previously been typed
      let input = String.fromCharCode(event.keyCode).toLowerCase(); //converts the code to a letter converting to lowercase

      for (i = 0; i < previousGuesses.length; i++) {
        if (input == previousGuesses[i]) {
          previouslyEntered = true;
        }
      }

      //only run if letter has not already been typed
      if (!previouslyEntered) {
        previousGuesses.push(input); //adds the current letter to previousGuesses array.
        //check whether word contains the letter
        for (i = 0; i < wordArray.length; i++) {
          //if true, append letter to appropriate tile
          if (input == wordArray[i]) {
            found = true;
            $("#t" + i).append(input);
          }
        } //for

        if (found) {
          checkAnswer();
        } else {
          wrongAnswer(input);
        }
      }
    }
  }
  //check for answer
  function checkAnswer() {
    let currentAnswer = "";
    for (i = 0; i < wordArray.length; i++) {
      currentAnswer += $("#t" + i).text();
    }
    if (currentAnswer == currentWord) {
      victoryMessage();
    }
  }
  //For incorrect guesses
  function wrongAnswer(a) {
    livesRemaining--;
    $("#guesses").append(" " + a);
    $("#lives").html("lives Remaining: " + livesRemaining);
    if (livesRemaining == 0) {
      gameOver();
    }
  }
  //Victory

  function victoryMessage() {
    document.activeElement.blur();
    $(document).off("keyup", handleKeyUp);
    $("#playerFeedback").append(
      "You Win!!!<br><br><div id='replay' class='button'>CONTINUE</div>"
    );

    $("#opening")[0].pause();
    $("#winSound")[0].play();
    $("#replay").click(function() {
      $("#winSound")[0].pause();
      $("#opening")[0].play();
      gameScreen();
    });
  }

  //game over
  function gameOver() {
    console.log("game over :(");
    $(document).off("keyup", handleKeyUp);
    $("#playerFeedback").append(
      "Game Over!<br>(answer= " +
        currentWord +
        ")<div id='replay' class='button'>CONTINUE</div>"
    );
    $("#opening")[0].pause();
    $("#failSound")[0].play();
    $("#replay").click(function() {
      $("#failSound")[0].pause();
      $("#opening")[0].play();
      gameScreen();
    });
  }
});
