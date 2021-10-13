// The unordered list where the player’s guessed letters will appear
const guessedLetters = document.querySelector(".guessed-letters");

// The button with the text “Guess!” in it
const guessButton = document.querySelector(".guess");

// The text input where the player will guess a letter
const input = document.querySelector("input");

// The empty paragraph where the word in progress will appear
const wordInProgress = document.querySelector(".word-in-progress");

// The paragraph where the remaining guesses will display
const guessRemain = document.querySelector(".remaining");

// The span inside the paragraph where the remaining guesses will display
const guessRemainSpan = document.querySelector(".remaining span");

// The empty paragraph where messages will appear when the player guesses a letter
const message = document.querySelector(".message");

// The hidden button that will appear prompting the player to play again
const playButton = document.querySelector(".play-again");

// First sample word
const word = "magnolia";

const guessedLetter = [];


// Letter placeholders
const wordSymbol = function (word) {
    let words = "";
    for (let letter of word) {
        words += "●";
    };
    wordInProgress.innerText = words;
};
wordSymbol (word);

guessButton.addEventListener("click", function(e){
    message.innerText = "";
    e.preventDefault();         /* prevent reload page after each click */
    const inputValue = input.value;
    input.value = "";
    // console.log(inputValue);
    const goodGuess = checkInput(inputValue);
    if (goodGuess) 
        {makeGuess(goodGuess);}
    
});

const checkInput = function (input) {
    const acceptedLetter = /[a-zA-Z]/;
    if (input === "") {
        message.innerText = "Please enter a letter from A to Z";
    } else if (input.length > 1) {
        message.innerText = "Please enter just one letter from A to Z";
    } else if (!input.match(acceptedLetter)) {
        message.innerText = "Please enter a letter from A to Z";
    } else {
        return input;
    };
};

const makeGuess = function (letter) {
    letter = letter.toUpperCase();
    
    if (guessedLetter.includes(letter)) {
        message.innerText = "You've already guessed that letter, try again";
    } else {
        guessedLetter.push(letter);
        console.log(guessedLetter);
    }
};