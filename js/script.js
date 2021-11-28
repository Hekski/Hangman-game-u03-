// Globala variabler
const startGameBtn = document.querySelector('#start'); // DOM-nod: knappen som du startar spelet med
const resetGameBtn = document.querySelector('#reset'); // DOM-nod: knappen som du startar om spelet med
const letterBtn = document.querySelectorAll("#letterButtons button"); // Array av DOM-noder: Knapparna för bokstäverna

const word = document.querySelector('#word');
const message = document.querySelector("#message"); // DOM-nod: Ger olika meddelanden

let selectedWord;    // Sträng: ett av orden valt av en slumpgenerator från arrayen ovan
let hangmanImg;      // Sträng: sökväg till bild som kommer visas (och ändras) fel svar. t.ex. `/images/h1.png`
let newContent;
let guessedLetter;
let score = 0;
let guesses = 0;     // Number: håller antalet gissningar som gjorts
let foundLetter;
// let startGameBtn;  // DOM-nod: knappen som du startar spelet med
let letterBoxEls;    // Array av DOM-noder: Rutorna där bokstäverna ska stå
let liArray;

// Eventlisteners
startGameBtn.addEventListener('click', startGame);
resetGameBtn.addEventListener('click', resetGame);

// Array: med spelets alla ord
const wordList = [
  "ant", 
  "sheepies", 
  // "sloth", 
  // "duck", 
  // "zebra", 
  // "donkey", 
  // "fish",
];

// wordList = wordList.map(function(x){ return x.toUpperCase(); })


// Funktion som startar spelet vid knapptryckning, och då tillkallas andra funktioner
// Funktion som återställer variabler och startar ett nytt spel
function startGame() {
  message.textContent = 'Pick your letter:';
  selectedWord = getRandomWord();
  generateLIs();
  countLettersFound = 0;
  guesses = 0;

  console.log("Game started with word: " + selectedWord);
  startGameBtn.disabled = true;

  liArray = document.querySelector('#word').childNodes; // Array med koppling till li-objekten
}

function guess() {

}

function askAgain() {
  message.textContent = 'Pick an other letter:';
}

function resetGame() {
  letterBtn.disabled = false;
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

let heading = document.querySelector('h1');

document.addEventListener('click', (e) => {
  let element = e.target;
  if(element.parentNode.parentNode.id == "letterButtons"){ 
    guessedLetter = element.value;
    heading.innerText = guessedLetter;
    element.disabled = true;
    console.log("Clicked button " + guessedLetter);
    gameState();
  }
});

function gameState() {
  console.log("gissad bokstav " + guessedLetter)
  foundLetter = 0;
    for(let i = 0; i < selectedWord.length; i++) {
      let currentLetter = selectedWord.charAt(i);
        if(guessedLetter == currentLetter) {        
          liArray[i].innerHTML =  currentLetter;        
          foundLetter++;
        }
      }
      console.log(liArray);
      if (foundLetter == 0) {
          message.textContent = 'Fel svar...';      

        //rita gubbe
      } else {
        message.textContent = 'Rätt svar, fortsätt...';      
      }

    }
  

// }

// Funktion för att återställa knapparna


// Funktion som inaktiverar/aktiverar bokstavsknapparna beroende på vilken del av spelet du är på




// Funktion som ropas vid vinst eller förlust, gör olika saker beroende tillståndet

function win() {
  message.textContent = "Du vann!";
}

function lose() {
  message.textContent = "Du förlorade!";
}

/*

------------------

//Function som sköter spelets förlopp

function gameState(event) {
  let button = event.target || event.srcElement;
  console.log("Clicked button " + guessedLetter);

  let match = false;
  for (let i = 0; 1 < selectedWord.length; i++) {
    if (selectedWord.charAt(i) == guessedLetter) {
      console.log("Letter matched on position " + i);
      match = true;
      break;
    }
  }

  if (match) {
    handleMatch(button);
  } else {
    handleNoMatch();
  }
}


function handleMatch(guessedLetter) {
  console.log("Match");

  buttonEl.disabled = true;
  for (let i = 0; i < selectedWord.length; i++) {
    if (selectedWord.charAt(letterNum) == guessedLetter) {
      letterBoxEls.childNodes[letterNum].querySelector("input").value = selectedWord[letterNum];
      countLettersFound++;
    }
  }

  console.log("countLettersFound: " + countLettersFound);
  if (countLettersFound == selectedWord.length) {
    printMessage("Du är vinnare! Starta spelet igen?");
    prepareForPlaying();
  }
}

function handleNoMatch() {
  console.log("No match");

  guesses++;
  hangmanImg.src = "images/h" + guesses + ".png";

  if (guesses == guessTries) {
    printMessage("Du har förlorat. Starta spelet igen?");
    prepareForPlaying(); 
  }
}

function prepareForPlaying() {
  letterBtn.disabled = true;
}

prepareForPlaying();
*/
