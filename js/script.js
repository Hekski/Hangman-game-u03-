// Globala variabler
const startGameBtn = document.querySelector('#start');
const resetGameBtn = document.querySelector('#reset');
const word = document.querySelector('#word');
const letterButtons = document.querySelectorAll("#letterButtons button");
const message = document.querySelector("#message");



let selectedWord;    // Sträng: ett av orden valt av en slumpgenerator från arrayen ovan
// let newContent;
let guesses = 0;     // Number: håller antalet gissningar som gjorts
let hangmanImg;      // Sträng: sökväg till bild som kommer visas (och ändras) fel svar. t.ex. `/images/h1.png`
let msgHolderEl;     // DOM-nod: Ger meddelande när spelet är över
// let startGameBtn;  // DOM-nod: knappen som du startar spelet med
let letterButtonEls; // Array av DOM-noder: Knapparna för bokstäverna
let letterBoxEls;    // Array av DOM-noder: Rutorna där bokstäverna ska stå

// Array: med spelets alla ord
const wordList = [
  "duck", 
  "sheep", 
  "sloth", 
  "ant", 
  "zebra", 
  "donkey", 
  "fish",
];

// 


// Eventlisteners
startGameBtn.addEventListener('click', startGame);
resetGameBtn.addEventListener('click', resetGame);


// Funktion som startar spelet vid knapptryckning, och då tillkallas andra funktioner

function startGame() {
  getRandomWord();
  gameState();
  letterButtons.disabled = false;
}

// Funktion som återställer variabler och startar ett nytt spel

function resetGame() {
  letterButtons.disabled = false;


}

// Funktion som visar regler vid knapptryckning



// Funktion som tar fram bokstävernas rutor, antal rutor beror på vilket ord slumptas fram


function getRandomWord() {
  selectedWord = wordList[Math.floor(Math.random() * wordList.length)];
  const numberOfLetters = selectedWord.length; // räknar antal bokstäver i ordet
    for (let i = 0; i < numberOfLetters; i++) {
    let listItem = document.createElement('li');
    let newContent = document.createTextNode(selectedWord.charAt(i)); 
    listItem.innerHTML = "_";
    // listItem.appendChild(newContent);
    word.append(listItem);
    // console.log(newContent);
  }
}

// Funktion som körs när du trycker på bokstäverna och gissar bokstav

let guessLetter = document.querySelector('h1');
document.addEventListener('click', (e) => {
    let element = e.target;
    if(element.tagName == "BUTTON"){        
        // result.innerText = `${element.value}: ${element.innerText}`;
        guessLetter.innerText = `${element.value}`;
        element.disabled = true;
        // console.log(element.value);
    }
});

//Function som sköter spelets förlopp

function gameState() {
  message.textContent = 'Välj din bokstav:';

  for(let i = 0; i < selectedWord.length; i++) {
      let newContent = document.createTextNode(selectedWord.charAt(i)); 
      console.log(newContent);
      if(guessLetter == newContent) {
        message.textContent = 'Rätt svar, fortsätt...';
        break;
      // Gå vidare till ny inmatning (hur? Inmatnings-state?)
      }
      if (i == 6) {
        lose();

      } else { (slumpTal != variabel) 
        message.textContent = (`Fel, gör om! Försök nr: ${i+1}`);
      }
    }
}

// Funktion för att återställa knapparna


// Funktion som inaktiverar/aktiverar bokstavsknapparna beroende på vilken del av spelet du är på




// Funktion som ropas vid vinst eller förlust, gör olika saker beroende tillståndet

function win() {
  message.textContent = "Du vann!";
}

function lose() {
  message.textContent = "Du förlorade!";
}







//   OnClick Function
//    check = function () {
//     list.onclick = function () {
//       var guess = (this.innerHTML);
//       this.setAttribute("class", "active");
//       this.onclick = null;
//       for (var i = 0; i < word.length; i++) {
//         if (word[i] === geuss) {
//           geusses[i].innerHTML = geuss;
//           counter += 1;
//         } 
//       }
//       var j = (word.indexOf(geuss));
//       if (j === -1) {
//         lives -= 1;
//         comments();
//         animate();
//       } else {
//         comments();
//       }
//     }
//   }