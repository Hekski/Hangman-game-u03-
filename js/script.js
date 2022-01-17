// DOM-nodes

const startGameBtn = document.querySelector("#start"); // The start button
const letterBtn = document.querySelectorAll("#letterButtons button"); // The letter buttons
const word = document.querySelector("#word"); // The container of the placeholders for the word letters
const letterBoxes = document.querySelector(".letterBoxes"); // The placeholders for the word letters
const message = document.querySelector("#message"); // Placeholder to recieve messages
const hangmanImg = document.querySelector("#hangman"); // Path to the image that is replaced in case of a wrong guess
const gruntImg = document.querySelector("#grunt"); // Decorative picture

// Variables

let selectedWord; // One of the words chosen by the random generator
let guessedLetter; // The user's guessed letter captured by an event listener
let foundLetter; // Value for the matched guessed letter and the letters in the current word

// Values for the amount of right or wrong guesses

let wrongGuesses = 0;
let rightGuesses = 0;

// Array connecting the Li-objects

let liArray;

// Eventlistener

startGameBtn.addEventListener("click", startGame);

// Array: The words of the game

const wordList = ["squid", "masks", "umbrella", "Cookie", "prize", "money"];

// Sound files

let sounds = {
  doll: "doll.mp3",
  fly: "fly.mp3",
  green: "green.mp3",
  red: "red.mp3",
  track: "track.mp3",
};

window.onload = startState;

function startState() {
  disableLetterButtons();
  message.textContent = "Welcome...";

  // document.body.style.animation = 0;
}

// Function that starts the game at the push of a button, and calls other functions

function startGame() {
  activateLetterButtons();
  hangmanImg.src = "images/start.png";
  startGameBtn.disabled = true;
  message.textContent = "Pick your letter...";
  selectedWord = getRandomWord();
  generateLIs();
  // console.log("Game started with word: " + selectedWord);

  liArray = document.querySelector("#word").childNodes;
  playSound(sounds.doll);
}

// Function that randomizes a word out of the word list

function getRandomWord() {
  let randomNo = Math.floor(Math.random() * wordList.length);
  return wordList[randomNo].toUpperCase();
}

// Function that creates li objects according to the number of letters in the selected word

function generateLIs() {
  const numberOfLetters = selectedWord.length;
  word.innerHTML = "";
  for (let i = 0; i < numberOfLetters; i++) {
    let listItem = document.createElement("li");
    listItem.innerHTML = "_";
    hangmanImg.src = "images/h0.png";
    word.append(listItem);
  }
}

// Function that runs when a guessed letter is clicked

document.addEventListener("click", (e) => {
  let element = e.target;
  if (element.parentNode.parentNode.id == "letterButtons") {
    guessedLetter = element.value;
    element.disabled = true;
    // console.log("Clicked button " + guessedLetter);
    gameState();
  }
});

// Function that handles the course of the game

function gameState() {
  // console.log("gissad bokstav " + guessedLetter);
  foundLetter = 0;
  for (let i = 0; i < selectedWord.length; i++) {
    let currentLetter = selectedWord.charAt(i);
    if (guessedLetter == currentLetter) {
      liArray[i].innerHTML = currentLetter;
      foundLetter++;
    }
  }
  if (foundLetter == 0) {
    message.textContent = "Wrong answer...";
    wrongGuesses++; // An increase of the value of missed guesses that can not exceed selectedWord.length
    hangmanImg.src = "images/h" + wrongGuesses + ".png"; // Adding i picture if the guess is wrong
    playSound(sounds.red);

    lose(); // Checking for possible loss
  } else {
    message.textContent = "Right answer, continue...";
    rightGuesses = rightGuesses + foundLetter;
    playSound(sounds.green);
    win(); // Checking for possible win
  }
}

// Functions that are called upon win or loss

function win() {
  if (rightGuesses == selectedWord.length) {
    // console.log(rightGuesses + " antal rightGuesses, VINST!");
    message.textContent = "Congratulations...";
    startGameBtn.textContent = "Play again?";
    playSound(sounds.track);
    document.body.style.animation = "fadeBackGroundWin 2s forwards 1";
    document.body.style.backgroundColor = "black";
    hangmanImg.src = "images/win.png";
    endState();
  }
}

function lose() {
  if (wrongGuesses == 7) {
    message.textContent = "You lose...";
    startGameBtn.textContent = "Play again?";
    document.body.style.animation = "fadeBackGround 3s forwards 1";
    document.body.style.backgroundColor = "black";
    playSound(sounds.fly);
    endState();
  }
}

// Function to reset the buttons

function disableLetterButtons() {
  for (let i = 0; i < letterBtn.length; i++) {
    letterBtn[i].disabled = true;
  }
}

// Function to activate the buttons

function activateLetterButtons() {
  for (let i = 0; i < letterBtn.length; i++) {
    letterBtn[i].disabled = false;
  }
}

// Function that handles the end phase of the game

function endState() {
  rightGuesses = 0;
  wrongGuesses = 0;
  disableLetterButtons();
  startGameBtn.disabled = false;
}

// Function to play soundfiles

function playSound(file, volume = 0.4) {
  let audio = new Audio("./sound/" + file);
  audio.volume = volume;
  audio.play();
}
