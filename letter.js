var Letter = function (str) {

    this.character = str;
    this.guessed = false;

    this.toString = function(){
   
        if (this.guessed){  
            return this.character;
        }
        else{
            return "_";
        }
    }

    this.guess = function(letterClicked){
            if (letterClicked === this.character){
                 this.guessed = true;
             
            }
        }
    }

module.exports = Letter;
