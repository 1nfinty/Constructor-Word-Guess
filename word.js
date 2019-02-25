var Letter = require("./Letter");

var Word = function () {

    this.lettersObjects = [];

    this.print = function () {
        var displayWord = "";

        for (var i = 0; i < this.lettersObjects.length; i++) {

            displayWord = displayWord.concat(this.lettersObjects[i].toString());
        }
        return displayWord;

    }
    this.verify = function (character) {

        for (var i = 0; i < this.lettersObjects.length; i++) {
            this.lettersObjects[i].guess(character);
        }
    }
}

module.exports = Word;