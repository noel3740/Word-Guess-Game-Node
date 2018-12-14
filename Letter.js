//Class for individual letters
class Letter {

    constructor(char) {
        this.char = char;
        this.isLetterGuessed = false;
        this.placeHolderChar = "_";
    }

    //Overriding toString method to output the placeholder character if the letter is not guessed
    //And the actual letter if it is guessed correctly
    toString() {
        return this.isLetterGuessed ? this.char : this.placeHolderChar;
    }

    //Method to update the isLetterGuessed flag to true if the guessed letter 
    //passed to it matches the actual letter
    guessLetter(guessChar) {
        if (this.char === guessChar) {
            this.isLetterGuessed = true;
        }
    }
}