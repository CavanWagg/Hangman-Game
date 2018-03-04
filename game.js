'use strict';

const wordBank = ['abyss','axiom','bandwagon','bookworm','blizzard','boxcar','croquet','dwarves','espionage',
'galvanize','haphazard','jaundice','jiujitsu','jawbreaker','kazoo','jukebox','larynx','kiwifruit','microwave',
'knapsack', 'oxygen', 'numbskull', 'pajama', 'pnuemonia','rickshaw','snazzy','strength', 
'syndrome', 'vortex', 'witchcraft', 'zephyr'];


var keysPressed = [];
      
var keyCodes = {
  65: "a", 
  66: "b", 
  67: "c", 
  68: "d", 
  69: "e", 
  70: "f", 
  71: "g", 
  72: "h", 
  73: "i", 
  74: "j", 
  75: "k", 
  76: "l", 
  77: "m", 
  78: "n", 
  79: "o", 
  80: "p", 
  81: "q", 
  82: "r", 
  83: "s", 
  84: "t", 
  85: "u", 
  86: "v", 
  87: "w", 
  88: "x", 
  89: "y", 
  90: "z" 
}


function assignWord(){
  let word = wordBank[Math.floor(Math.random() * wordBank.length)];
  return word;
}

function updateHangman(frame){
  board.text(frame);
}

function createWordSquares(){
  for(var i=0, len = word.length; i < len; i++){
    var id = 'letter_' + i;
    $('<div>', {id: id, class: 'wordy'}).appendTo(wordContainer);
  }
}
assignWord();
updateHangman(frames[1]);
createWordSquares();






$(document).keydown(function(e) {
  if(e.keyCode > 64 && e.keyCode < 91){
    $("#results").text("You pressed: " + keyCodes[e.keyCode]);

    if($.inArray(e.keyCode, keysPressed) !== -1){
      $("#results").append("<span class='warning';> - you have guessed this letter already!!</span>");
    }

    keysPressed.push(e.keyCode);
    keysPressed = $.unique(keysPressed);
  } else {
    $("#results").text("Guess a letter you twit!");
  }
  var keys = keysPressed.map(function(value){
    return keyCodes[value];
  }).sort().join(', ');
  
  $("#keysPressed").text(keys);
});








//Select word randomly from list of words

//   let word = wordBank[Math.floor(Math.random() * wordBank.length)];

//   let answerArray = [];
//   for ( let i = 0; i < word.length; i++) {
//     answerArray[i] = "_";
  
//   }
//   console.log(answerArray);

//    let remainingLetters = word.length;
 
//    while (remainingLetters > 0) {

// //      // Game code goes here
// //  // Show the player their progress
// //  // Take input from the player
//     let guess = //keyinput 

// //  // Update answerArray and remainingLetters for every correct guess
// //     document.getElementById('para');
// //     document.write(answerArray.join);
// //   }
  

