//Load the inquirer package
var inquirer = require("inquirer");
//Load the Word.js file
var Word = require("./Word");

console.log("=================================================");
console.log("Welcome to the Hawaiian themed word guess game!!!");
console.log("=================================================");

//Setup an array with all the words the user can guess from
const words = ["ukulele", "aloha", "poke", "mahalo", "hawaii", "maui", "surf", 
                "turtles", "whales", "Oahu", "Honolulu", "Waikiki", "volcano", 
                "beaches", "harbor", "waterfalls", "mountains", "dolphins", "hula", 
                "leis"];

let wordsToGuessFrom;
let numGuessRemain;
let wordToGuess;
let lettersGuessed = [];

//Function to start a new game
startNewGame = () => {
    numGuessRemain = 12;

    //If wordsToGuessFrom is empty the repopulate with words from the constant variable words
    if (!wordsToGuessFrom || wordsToGuessFrom.length === 0) {
        wordsToGuessFrom = [...words];
    }

    //Randomly choose a word from the wordsToGuessFrom array
    var randomWordIndex = Math.floor(Math.random() * wordsToGuessFrom.length);
    //Remove current word from the wordsToGuessFrom array and create a new Word object from it
    wordToGuess = new Word(wordsToGuessFrom.splice(randomWordIndex, 1)[0]);

    promptGuess();
};

//Function to prompt user to guess
promptGuess = () => {

    if (numGuessRemain === 0) {
        console.log("No more guesses remaining!");
        return;
    }

    console.log("Current Word: ", wordToGuess.toString());
    console.log("Number of guesses remaining: ", numGuessRemain);
    console.log("Letters already guessed: ", lettersGuessed.toString());

    inquirer.prompt([
        {
            name: "guess",
            message: "Guess a letter:",
            validate: validateUserLetterGuess
        }
    ]).then(answer => {
        numGuessRemain--;
        lettersGuessed.push(answer.guess);
        wordToGuess.guessLetterInWord(answer.guess);
        console.log("==============================");
        promptGuess();
    });
};



//Function that will validate the user input when the guess a letter
validateUserLetterGuess = (guess) => {
    //The user's guess can only be one character in length
    if (guess.length !== 1) {
        return "Answer must but 1 character in length!";
    } 
    //The user's guess cannot be one that was already guessed
    else if (lettersGuessed.indexOf(guess) >= 0) {
        return "Letter has already been guessed. Please select another letter.";
    }
    //Passed all validation
    else {
        return true;
    }
}

startNewGame();
