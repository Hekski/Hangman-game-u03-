// Globala variabler

const startGameBtn = document.querySelector('#start'); // DOM-nod: knappen som du startar spelet med
const resetGameBtn = document.querySelector('#reset'); // DOM-nod: knappen som du startar om spelet med
const letterBtn = document.querySelectorAll("#letterButtons button"); // Array av DOM-noder: Knapparna för bokstäverna

const word = document.querySelector('#word');
const message = document.querySelector("#message"); // DOM-nod: Ger olika meddelanden
const hangmanImg = document.querySelector("#hangman"); // Sträng: sökväg till bild som kommer visas (och ändras) fel svar. t.ex. `/images/h1.png`

let selectedWord;       // Sträng: ett av orden valt av en slumpgenerator
let guessedLetter;      // Användarens gissade bokstav uppfångad av en eventlistener
let foundLetter;        // Värde för matchad gissad bokstav och bokstäver i det aktuella ordet 

let wrongGuesses = 0;   // Värde för antal felaktiga gissningar
let rightGuesses = 0;   // Värde för antal rätta gissningar

let letterBoxEls;       // Array av DOM-noder: Rutorna där bokstäverna ska stå
let liArray;            // Array med koppling till li-objekten


// Eventlisteners

startGameBtn.addEventListener('click', startGame);
// resetGameBtn.addEventListener('click', resetGame);

// Array: med spelets alla ord

const wordList = [
  "abc", 
  // "sheep", 
  // "sloth", 
  // "duck", 
  // "zebra", 
  // "donkey", 
  // "fish",
];

window.onload = startState;

function startState() {
  disableLetterButtons();
}


// Funktion som startar spelet vid knapptryckning, och då tillkallas andra funktioner
// Funktion som återställer variabler och startar ett nytt spel

function startGame() {
  activateLetterButtons();
  startGameBtn.disabled = true;
  // letterBtn.disabled = true;
  message.textContent = 'Pick your letter:';
  selectedWord = getRandomWord();
  generateLIs();
  countLettersFound = 0;

  console.log("Game started with word: " + selectedWord);

  liArray = document.querySelector('#word').childNodes;
  activateLetterButtons();

}

// Funktion som slumpar fram ett ord ut ordlistan

function getRandomWord() {
  let randomNo = Math.floor(Math.random() * wordList.length);
  return wordList[randomNo].toUpperCase();
} 

function generateLIs() {
  const numberOfLetters = selectedWord.length;
    for (let i = 0; i < numberOfLetters; i++) {
    let listItem = document.createElement('li');
    listItem.innerHTML = "_";
    word.append(listItem);
  }
}

// Funktion som körs när du trycker på bokstäverna och gissar bokstav

document.addEventListener('click', (e) => {
  let element = e.target;
  if(element.parentNode.parentNode.id == "letterButtons"){ 
    guessedLetter = element.value;
    element.disabled = true;
    console.log("Clicked button " + guessedLetter);
    gameState();
  }
});

//Function som sköter spelets förlopp

function gameState() {
  console.log("gissad bokstav " + guessedLetter)
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
      hangmanImg.src = "/images/h" + wrongGuesses + ".png"; //rita gubbe
      lose(); // Kolla möjlig förlust

    } else {
      message.textContent = 'Rätt svar, fortsätt...';
      rightGuesses++;
      win(); //Kolla möjlig vinst
  }
  console.log(wrongGuesses + " antal wrongGuesses");
}
  
// Funktion som ropas vid vinst eller förlust, gör olika saker beroende tillståndet

function win() {
  if (rightGuesses == selectedWord.length) {
    console.log(rightGuesses + " antal rightGuesses, VINST!");
    message.textContent = "Du vann!";
    startGameBtn.textContent = "Starta om spelet";
    endState();

  // } else {
  //   // gameState()
  }
}

function lose() {
  if (wrongGuesses == 6) {
  message.textContent = "Du förlorade!";
  startGameBtn.textContent = "Starta om spelet";
  endState();

  // } else {
    //  endState()
  }
}

// function resetGame() {
//   letterBtn.disabled = false;
// }

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

function endState() {
  disableLetterButtons();
  startGameBtn.disabled = false;
}