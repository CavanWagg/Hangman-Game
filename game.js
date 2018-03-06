

$(document).ready(function () {

  //controller
  // var alphabet = [
  //   "a", "b", "c", "d",  "e", "f",  "g", "h", "i",  "j", "k", "l", "m", "n",  "o",  "p", "q",  "r",  "s", "t", "u", "v", "w", "x", "y", "z" ];
  
    const wordBank = ['bulbasaur', 'snorlax', 'jynx','squirtle','butterfree','pikachu','Nidoqueen','Nidoking','sandshrew','clefable','vulpix',
    'oddish','venomoth','dugtrio','meowth','primeape','psyduck','growlith','poliwag','alakazam','machamp','weepinbell','tentacruel','geodude',
    'rapidash','slowbro','magnemite','dodrio','grimer','cloyster','gengar','onix','drowzee','electrode','exeggutor','cubone','hitmonlee','lickitung',
    'weezing','rhydon','chansey','tangela','starmie','scyther','magmar','tauros','lapras','ditto','vaporeon','porygon','aerodactyl','zapdos','dragonite',
    'mewtwo'];
  
    var wordArray=new Array;
    var previousGuesses=new Array;
    var currentWord = new String;
    var livesRemaining;
  
  titleScreen();
  //title screen
  function titleScreen(){
    $('#gameContent').append('<div id="gameTitle"></div><div id="startButton" class="button">BEGIN</div>');		
    $('#startButton').on("click",function (){gameScreen()});
  }//display game
  
  
    //display the game screen
    
    function gameScreen(){
    livesRemaining = 6;
    $('#gameContent').empty(); //empties titleScreen in order to create the gameScreen
    $('#gameContent').append('<div id="wordHolder"></div>');
    $('#gameContent').append('<div id="guesses">Previous guesses:</div>');
    $('#gameContent').append('<div id="lives">' + 'Lives Remaining: ' + livesRemaining + '</div>');
    $('#gameContent').append('<div id="feedback"></div>');
    
  
    //for the button
    getWord();
    var numberOfTiles= wordArray.length;
    
    previousGuesses=[];
  
    for(i=0; i<numberOfTiles; i++){
      $('#wordHolder').append('<div class="tile" id=t'+i+'></div>');
    }
  
    $(document).on("keyup",handleKeyUp);
  }
  
  function getWord() {
      currentWord = wordBank[Math.floor(Math.random() * wordBank.length)];
      wordArray = currentWord.split("");
    }
  
  //Key input function 
  $(document).on("keyup",handleKeyUp);
  function handleKeyUp(event) {
  
    if(event.keyCode>64 && event.keyCode<91){
      var found=false; //this variable is used to determine if the typed key is located in the word
      var previouslyEntered=false; //this variable is used to check if the letter has previously been typed
      var input=String.fromCharCode(event.keyCode).toLowerCase(); //converts the code to a letter converting to lowercase
      
    
      for(i=0;i<previousGuesses.length;i++){
        if(input==previousGuesses[i]){previouslyEntered=true;}}
          
        
      //only run if letter has not already been typed  
      if(!previouslyEntered){
        previousGuesses.push(input); //adds the current letter to previousGuesses array.
        //check whether word contains the letter
        for(i=0;i<wordArray.length;i++){
          //if true, append letter to appropriate tile
          if(input==wordArray[i]){found=true;$('#t'+i).append(input);}	
        }//for
          
        if(found){checkAnswer();}
        else{wrongAnswer(input);}
      }
    }
  }
  //check for answer 
  function checkAnswer(){
    var currentAnswer="";	
    for(i=0;i<wordArray.length;i++){
      currentAnswer+=($('#t'+i).text());
    }		
    if(currentAnswer==currentWord){
      victoryMessage();
    };
  };
  //For incorrect guesses
  function wrongAnswer(a){
    livesRemaining--;
    $('#guesses').append(" "+a);
    $('#lives').html('lives Remaining: ' + livesRemaining);
    if(livesRemaining == 0){
      gameOver();
    }
  }
  //Victory 
  
  function victoryMessage(){
    document.activeElement.blur();
    $(document).off("keyup", handleKeyUp);
    $('#feedback').append("You Win!!!<br><br><div id='replay' class='button'>CONTINUE</div>");
    $('#winSound')[0].play();
    $('#replay').click(function(){
      gameScreen();
    }); 
  }
  
  
  //game over
  function gameOver(){
    //play sound effect
    console.log("game over :(")
    $(document).off("keyup", handleKeyUp);
    $('#feedback').append("Game Over!<br>(answer= "+ currentWord +")<div id='replay' class='button'>CONTINUE</div>");
    $('#failSound')[0].play();
    $('#replay').click(function(){
      gameScreen();
    }); 
    
  }
    // $('#replay').on("click",function (){
    // 	if(questionBank.length>0){
    // 		gameScreen()}
    // 	else{finalPage()}
    
  //defeat
  
  
   
  
  });
