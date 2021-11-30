const startGameBtn = document.querySelector('#start'); // DOM-nod: knappen som du startar spelet med
const letterBtn = document.querySelectorAll('#letterButtons button'); // Array av DOM-noder: Knapparna för bokstäverna

const word = document.querySelector('#word');
const letterBoxes = document.querySelector('.letterBoxes');
const message = document.querySelector('#message'); // DOM-nod: Ger olika meddelanden
const hangmanImg = document.querySelector('#hangman'); // Sträng: sökväg till bild som byts ut vid fel gissning
const gruntImg = document.querySelector('#grunt'); // Sträng: Dekorativ bild


let selectedWord;       // Sträng: ett av orden valt av en slumpgenerator
let guessedLetter;      // Användarens gissade bokstav uppfångad av en eventlistener
let foundLetter;        // Värde för matchad gissad bokstav och bokstäver i det aktuella ordet 

let wrongGuesses = 0;   // Värde för antal felaktiga gissningar
let rightGuesses = 0;   // Värde för antal rätta gissningar

let letterBoxEls;       // Array av DOM-noder: Rutorna där bokstäverna ska stå
let liArray;            // Array med koppling till li-objekten


// Eventlisteners

startGameBtn.addEventListener('click', startGame);


// Array: med spelets alla ord

const wordList = [
  'abc', 
  // 'sheep', 
  // 'sloth', 
  // 'duck', 
  // 'zebra', 
  // 'donkey', 
  // 'fish',
];

// Ljudfiler

let sounds = {
  doll: 'doll.mp3',
  fly: 'fly.mp3',
  green: 'green.mp3',
  red: 'red.mp3',
  track: 'track.mp3',
};

window.onload = startState;

function startState() {
  disableLetterButtons();
}


// Funktion som startar spelet vid knapptryckning, och då tillkallas andra funktioner
// Funktion som återställer variabler och startar ett nytt spel

function startGame() {
  document.body.style.backgroundColor = "black";
  activateLetterButtons();
  hangmanImg.src = '/images/start.png';
  startGameBtn.disabled = true;
  message.textContent = 'Lets play a little game, pick your letter';
  selectedWord = getRandomWord();
  generateLIs();
  // addGrunt();
  // noLIs();

  console.log('Game started with word: ' + selectedWord);

  liArray = document.querySelector('#word').childNodes;
  activateLetterButtons();
  playSound(sounds.doll);

}

// Funktion som slumpar fram ett ord ut ordlistan

function getRandomWord() {
  let randomNo = Math.floor(Math.random() * wordList.length);
  return wordList[randomNo].toUpperCase();
} 

// Funktion som skapar li-objekt efter antalet bokstäver i utvalt ord

function generateLIs() {
  const numberOfLetters = selectedWord.length;
    word.innerHTML = ''; // Tack Björn :)
    for (let i = 0; i < numberOfLetters; i++) {
    let listItem = document.createElement('li');
    listItem.innerHTML = '_';
    word.append(listItem);
    
  }
}

// Funktion som nollställer antalet li-objekt inför ny omgång

function noLIs() {
  let listItem = document.createElement('');
  listItem.innerHTML = '_';
  word.append(listItem);
}

// Funktion som körs när du trycker på bokstäverna och gissar bokstav

document.addEventListener('click', (e) => {
  let element = e.target;
  if(element.parentNode.parentNode.id == 'letterButtons'){ 
    guessedLetter = element.value;
    element.disabled = true;
    console.log('Clicked button ' + guessedLetter);
    gameState();
  }
});

//Function som sköter spelets förlopp

function gameState() {
  console.log('gissad bokstav ' + guessedLetter)
  foundLetter = 0;
  for(let i = 0; i < selectedWord.length; i++) {
    let currentLetter = selectedWord.charAt(i);
      if(guessedLetter == currentLetter) {        
        liArray[i].innerHTML = currentLetter;        
        foundLetter++;
      }
    }
    if (foundLetter == 0) {
      message.textContent = 'Fel svar...';
      wrongGuesses++; //öka pott av missar som inte får överstiga selectedWord.length
      hangmanImg.src = '/images/h' + wrongGuesses + ".png"; //rita gubbe
      playSound(sounds.red);

      lose(); // Kolla möjlig förlust

    } else {
      message.textContent = 'Right answer, continue...';
      rightGuesses++;
      playSound(sounds.green);
      win(); //Kolla möjlig vinst
  }
  console.log(wrongGuesses + ' antal antal felgissningar');
}
  
// Funktion som ropas vid vinst eller förlust, gör olika saker beroende tillståndet

function win() {
  if (rightGuesses == selectedWord.length) {
    console.log(rightGuesses + ' antal rightGuesses, VINST!');
    // hangmanImg.src = "/images/win.png";
    message.textContent = 'Congratulations...';
    startGameBtn.textContent = 'Starta om spelet';
    playSound(sounds.track);


    endState();
  }
}

function lose() {
  if (wrongGuesses == 9) {
  message.textContent = 'You lose...';
  startGameBtn.textContent = 'Replay?';
  document.body.style.backgroundColor = "red";
  playSound(sounds.fly);
  endState();
  }
}

// Funktion för att återställa knapparna

function disableLetterButtons() {
  for (let i = 0; i < letterBtn.length; i++) {
    letterBtn[i].disabled = true;
  }
}

function activateLetterButtons() {
  for (let i = 0; i < letterBtn.length; i++) {
    letterBtn[i].disabled = false;
  }
}

// function addGrunt() {
//   let gruntImg = document.createElement('img');
//   gruntImg.src = "/images/grunt.png";
//   letterBoxes.append(gruntImg);
// }

// function removeGrunt() {
//   let gruntImg = document.removeElement('img');
//   letterBoxes.prepend(gruntImg);
// }

function endState() {
  rightGuesses = 0;
  wrongGuesses = 0;
  disableLetterButtons();
  startGameBtn.disabled = false;
}

function playSound(file, volume = 0.1) {
  // if (isSoundEnabled() == 0) return;
  let audio = new Audio('./sound/' + file);
  audio.volume = volume;
  audio.play();
}