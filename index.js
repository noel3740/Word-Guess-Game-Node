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
let lettersGuessed;
let wins = 0;
let losses = 0;

//Function to start a new game
startNewGame = () => {
    numGuessRemain = 12;
    lettersGuessed = [];

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
        losses++;
        console.log();
        console.log('\x1b[31m%s\x1b[0m',"===============================================================");
        console.log('\x1b[31m%s\x1b[0m',`You have lost!!! The correct word was: ${wordToGuess.wordToGuess}`);
        console.log('\x1b[31m%s\x1b[0m',"===============================================================");
        console.log();
        //Prompt user to see if they want to play another round
        playAgainPrompt();
        return;
    }

    console.log();
    console.log('\x1b[33m%s\x1b[0m', `WINS: ${wins}`);
    console.log('\x1b[33m%s\x1b[0m', `LOSSES: ${losses}`);
    console.log('\x1b[35m%s\x1b[0m', `CURRENT WORD: ${wordToGuess.toString()}`);
    console.log();
    console.log("Number of guesses remaining: ", numGuessRemain);
    console.log("Letters already guessed: ", lettersGuessed.toString());
    console.log();
    console.log("==============================");

    inquirer.prompt([
        {
            name: "guess",
            message: "Guess a letter:",
            validate: validateUserLetterGuess
        }
    ]).then(answer => {
        lettersGuessed.push(answer.guess);
        wordToGuess.guessLetterInWord(answer.guess);

        //If there are still underscores in the word then the user has not guessed correctly yet
        //Prompt the user to guess another letter
        if (wordToGuess.toString().indexOf("_") >= 0) {
            console.log("==============================");
            promptGuess();
        }
        //User has guessed the word correctly
        else {
            userWins();
        }
    });
};

//Function that runs when the user wins
userWins = () => {
    wins++;

    console.log();
    console.log('\x1b[32m%s\x1b[0m',"===============================================================");
    console.log('\x1b[32m%s\x1b[0m',`You have won!!! The correct word was: ${wordToGuess.wordToGuess}`);
    console.log('\x1b[32m%s\x1b[0m',"===============================================================");
    console.log();

    //Prompt user to see if they want to play another round
    playAgainPrompt();
};

//Function to prompt user to see if they want to play another round
playAgainPrompt = () => {
    inquirer.prompt([
        {
            type: "confirm",
            name: "playAgain",
            message: "Would you like to play again?",
            default: "y"
        }
    ]).then(answer => {
        //If the user wants to play again then start a new game otherwise display the final results
        if (answer.playAgain) {
            console.log("===============================================================");
            console.log();

            startNewGame();
        } else {
            console.log("WINS: ", wins);
            console.log("LOSSES: ", losses);
        }
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
    //Only allow letters
    else if (!(/^[a-zA-Z]+$/.test(guess))) {
        return "Only letters are allowed!";
    }
    //Passed all validation
    else {
        return true;
    }
}

startNewGame();
