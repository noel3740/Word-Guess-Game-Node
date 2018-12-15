var Letter = require("./Letter");

//Class that contains a word to be guessed
class Word {
    constructor(wordToGuess) {
        this.wordToGuess = wordToGuess;
        this.wordLetterArray = this.getLetterArrayFromString(wordToGuess);
    }

    //Method will return an array of Letters from the Letter class based on the word
    //passed into it
    getLetterArrayFromString(inputString) {
        let ret = [];

        for (const char of inputString) {
            ret.push(new Letter(char));
        }

        return ret;
    }

    //Method overrides the toString method and will return the word that 
    //represents the guessed word with letters not guessed represented with underlines
    toString() {
        //Join will automatically call the toString method on the Letter class
        return this.wordLetterArray.join("");
    }

    //Method to guess a letter in the word
    //Returns true if guessed correctly and false if not
    guessLetterInWord(guessChar) {
        let guessedCorrectly = false;

        //Run through each letter in the letter array and run the guessLetter method on it
        this.wordLetterArray.forEach(letter => {
            if (!letter.isLetterGuessed) {
                letter.guessLetter(guessChar);

                //If the letter guess flag is now true then set the return variable guessedCorrectly to true
                if (letter.isLetterGuessed) {
                    guessedCorrectly = true;
                }
            }
        });

        return guessedCorrectly;
    }
}

module.exports = Word;