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

// The gif that will appear when the player wins    
const celebImage = document.querySelector(".img");

// First sample word
let word = "magnolia";

let remainingGuesses = 8;

let guessedLetter = [];


// Get wordArray from API source 823 words
const getWord = async function () {
    const data = await fetch("https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt");
    const words = await data.text();
    const wordArray = words.split("\n");  /* turns words to an array with seperated elements */
    // console.log(wordArray)
    getRandomWord(wordArray);
};

getWord();

// Get random word from wordArray
const getRandomWord = function (wordArray) {
    const randomIndex = Math.floor(Math.random() * wordArray.length);
    let randomWord = wordArray[randomIndex];
    randomWord = randomWord.trim();
    word = randomWord;
    wordSymbol(word);
};


// Letter placeholders, tell user how many letters needed
const wordSymbol = function (word) {
    let words = "";
    for (let letter of word) {
        words += "●";
    };
    wordInProgress.innerText = words;
};


// Process input when click 
guessButton.addEventListener("click", function(e){
    message.innerText = "";
    e.preventDefault();         /* prevent reload page after each click */
    const inputValue = input.value;
    input.value = "";
    
    const goodGuess = checkInput(inputValue);
    if (goodGuess) 
        {makeGuess(goodGuess);};
});


// Check and only return value if input is one letter
const checkInput = function (input) {
    const acceptedLetter = /[a-zA-Z]/;   /* regular expression that just accepts letter */
    if (input === "") {
        message.innerText = "Please enter a letter from A to Z";
    } else if (input.length > 1) {
        message.innerText = "Please enter just ONE letter from A to Z";
    } else if (!input.match(acceptedLetter)) {
        message.innerText = "Please enter a LETTER from A to Z";
    } else {
        return input;
    };
};


// Check if input letter is duplicated. If not, update guessed letters, remaining guesses and word in progress
const makeGuess = function (letter) {
    letter = letter.toUpperCase();
    
    if (guessedLetter.includes(letter)) {
        message.innerText = "You've already guessed that letter, try again";
    } else {
        guessedLetter.push(letter);
        guessedLetterList();
        countGuessRemain(letter);
        updateWordInProgress(guessedLetter);
    }
};

// List of guessed letters
const guessedLetterList = function() {
    guessedLetters.innerHTML = "";
    for (let letter of guessedLetter) {
        const li = document.createElement("li");
        li.innerText = letter;
        guessedLetters.append(li);}
};


// List of correct guessed letters
const updateWordInProgress = function (guessedLetter){
    const wordUpper = word.toUpperCase();
    const wordArray = wordUpper.split("");
    const revealWord = [];
    for (let letter of wordArray)  {
        if (guessedLetter.includes(letter)) {
            revealWord.push(letter);
        } else {
            revealWord.push("●");
        }
    };
    wordInProgress.innerText = revealWord.join("");
    checkIfWin();
};


// Count remaining guesses
const countGuessRemain = function (guess) {
    word = word.toUpperCase();

    if (!word.includes(guess)) {
        message.innerText = `Oops, the word doesn't contain ${guess}`;
        remainingGuesses -= 1;
    } else {
        message.innerText = `Good guess! The word has the letter ${guess}`;
    };

    if (remainingGuesses === 0) {
        startOver();
        message.innerHTML = `Game over. The word was <p class="highlight">${word}</p>`;
    } else if (remainingGuesses === 1) {
        guessRemainSpan.innerText = "1 guess";
    } else if (remainingGuesses > 1) {
        guessRemainSpan.innerText = `${remainingGuesses} guesses`
    }
};


// Check if the player has won
const checkIfWin = function (){
    if (wordInProgress.innerText === word.toUpperCase()) {
        message.classList.add("win");
        message.innerHTML = '<p class="hightlight">You guessed the correct word! Congrats!</p>';
        celebImage.classList.remove("hide");
        startOver();
    }
};


// Play again
const startOver = function () {
    guessButton.classList.add("hide");
    guessRemain.classList.add("hide");
    guessedLetters.classList.add("hide");
    playButton.classList.remove("hide");
};

playButton.addEventListener("click", function() {
    message.classList.remove("win");
    message.innerText = "";
    guessedLetters.innerText = "";
    remainingGuesses = 8;
    guessedLetter = [];
    guessRemainSpan.innerText = `${remainingGuesses} guesses`;
    guessButton.classList.remove("hide");
    guessRemain.classList.remove("hide");
    guessedLetters.classList.remove("hide");
    playButton.classList.add("hide");
    celebImage.classList.add("hide");
    getWord();
});