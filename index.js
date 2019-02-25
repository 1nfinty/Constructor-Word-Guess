var inquirer = require("inquirer");

var Word = require("./word.js");
var Letter = require("./letter.js");

var codes = ["Copy", "Paste", "Node", "JavaScript", "HTML", "CSS", "Function", "DataBase", "Developer", "Code", "API", "Application", "Attribute", "Browser", "Bug", "Classes", "Cookies", "Domain", "Fields", "Front End", "Back End", "GUI", "Tag", "Navigation", "Folder", "File", "Pluggin", "Property", "Design", "Server", "UI", "Search", "Documentation", "Array", "Object", "Split", "Join", "Parse", "Float", "", "", "", "", "", "", "Minneapolis", "Tulsa", "Arlington", "New Orleans", ""];

var alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

var attempts = 6;
var previousDisplay = "";
var display = "";
var lettersUsed = [];
var gameEnded = false;
var code = "";
var wins = 0;
var lost = 0;

console.log(`
  --------------------------------------  
       TEST YOUR CDOING KNOWLEDGE, 
     GUESS THE "CODE" WORD CORRECTLY
  --------------------------------------  
  `)

startgame();

function startgame() {

    codeDisplay= codes[Math.floor(Math.random() * codes.length)];
    code = codeDisplay.toLowerCase();

    wordtoGuess = new Word;

    for (var i = 0; i < code.length; i++) {
        wordtoGuess.lettersObjects.push(new Letter(code[i]));

        if (code[i] === " ") {
            wordtoGuess.lettersObjects[i].guessed = true;
        }
    }

    attempts = 6;
    lettersUsed = [];
    gameEnded = false;
  
    display = wordtoGuess.print();

    console.log(display.split("").join(" "));

    askLetter();
}


function askLetter() {

    inquirer
        .prompt([
            {
                type: "input",
                message: "letter",
                name: "item"
            },
        ])
        .then(function (response) {

            if (response.item.length !== 1) {
                console.log("Please click just one letter");
                askLetter();
                return;
            }
            else if (lettersUsed.indexOf(response.item) !== -1) {

                console.log("That letter was clicked before, try other letter. This are all the used letters: " + lettersUsed);

                askLetter();
                return;
            }
            else if (alphabet.indexOf(response.item) === -1) {
                console.log("Character not valid, click an alphabet letter");

                askLetter();
                return;
            }

            else {
                lettersUsed.push(response.item);
            }

            previousDisplay = display;
            wordtoGuess.verify(response.item);
            display = wordtoGuess.print();

            if (display === previousDisplay) {
                attempts--;

                console.log("You have " + attempts + " attempts left. This are all the used letters: " + lettersUsed);
            }
            else {
                if (display === code) {
                    gameEnded = true;
                }
            }
            console.log(display.split("").join(" "));

            if (attempts > 0 && gameEnded === false) {
                askLetter();
            }
            else if (gameEnded) {
                console.log("Congrats you win" + "\n");
                wins++;
                askUser();
            }
            else {
                console.log("Sorry you lost");
                console.log("The word name is: " + codeDisplay.toUpperCase());
                lost++;
                askUser();
            }
        });
}

function askUser() {
    console.log("this is your stats: wins " + wins + " | lost " + lost + "\n");


    inquirer
        .prompt([
            {
                type: "confirm",
                message: "Do you want other word to guess?",
                name: "confirm",
                default: true
            },
        ])
        .then(function (response) {
            if (response.confirm) {
                startgame();
            }
            else {
                console.log("Bye bye, come back soon");
            }
        });
}