/*var phrase1 = "She sells seashells by the seashore";
var phrase2 = "Tip of the iceberg";
var phrase3 = "A blessing in disguise";
var phrase4 = "A wolf in sheep's clothing";
var phrase5 = "Beat around the bush";
var phrase6 = "A penny saved is a penny earned";
var phrase7 = "You can lead a horse to water but you can't make him drink";
var phrase8 = "Time is money";
var phrase9 = "An apple a day keeps the doctor away";
var phrase10 = "Don't judge a book by its cover"
var phrases = [phrase1, phrase2, phrase3, phrase4, phrase5, phrase6, phrase7, phrase8, phrase9]; */
var found_letters = [];
var chosen_phrase_letters = [];
//var display_phrase = "";
var display_phrase = document.getElementById("display_phrase");
var feedback_phrase = document.getElementById("feedback_phrase");
var chosen_phrase = "";
var blank_out_phrase = "";
var won = false;
var background_color;
var letters = document.querySelectorAll(".hangman_buttons")
//var solve_text = document.getElementById("solve_text");
document.addEventListener("keypress", convert_keypress);

function convert_keypress(event) {
    if ((event.keyCode > 64 && event.keyCode < 91) || (event.keyCode > 96 && event.keyCode < 123)) {
        //console.log(event.keyCode);
        //console.log(String.fromCharCode(event.keyCode));
        guess(String.fromCharCode(event.keyCode));
    }
}

function is_letter(str) {
    str = str.charCodeAt(0);
    if ((str >= 65 && str < 91) || (str >= 97 && str < 123)) {
        return true;
    }
    else {
        return false;
    }
}

function findUnique(str){
    // The variable that contains the unique values
    let uniq = [];
     
    for(let i = 0; i < str.length; i++){
      // Checking if the uniq contains the character
      if(uniq.includes(str[i]) === false && (is_letter(str[i]) === true)) {
        // If the character not present in uniq
        // Concatenate the character with uniq
        uniq.push(str[i]); 
      }
    }
    return uniq;
  }

function make_hangman() {
    var rand_int = Math.floor(Math.random() * (phrases2.length));
    console.log(rand_int);
    chosen_phrase = phrases2[rand_int].phrase;
    console.log(chosen_phrase);
    for (let cha of chosen_phrase) {
        if (is_letter(cha) === true) {
            blank_out_phrase = blank_out_phrase.concat("_ ");
        }
        else if (cha == " ") {
            blank_out_phrase = blank_out_phrase.concat(" &#160; ");
        }
        else {
            blank_out_phrase = blank_out_phrase.concat(cha);
        }
    }
    display_phrase.innerHTML = blank_out_phrase;
    //console.log(blank_out_phrase);
}

function guess(letter) {
    //console.log(won);
    console.log("You pressed " + letter + "!");
    if ((found_letters.includes(letter.toUpperCase()) === true) || (won === true)) {
        return;
    }
    if ((chosen_phrase.includes(letter.toUpperCase()) === true) || (chosen_phrase.includes(letter.toLowerCase()) === true)) {
        feedback_phrase.innerHTML = "Correct!";
        document.getElementById(letter.toUpperCase()).style.backgroundColor = "#66ff99";
        if (found_letters.includes(letter) === false) {
            found_letters.push(letter.toUpperCase());
        }
        blank_out_phrase = "";
        console.log(found_letters);
        for (let cha of chosen_phrase) {
            if ((is_letter(cha) === true) && (found_letters.includes(cha.toUpperCase()) === false)) {
                blank_out_phrase = blank_out_phrase.concat("_ ");
            }
            else if (cha == " ") {
                blank_out_phrase = blank_out_phrase.concat(" &#160; ");
            }
            else {
                blank_out_phrase = blank_out_phrase.concat(cha);
            }
        }
        display_phrase.innerHTML = blank_out_phrase;
        console.log(blank_out_phrase);
        console.log(chosen_phrase);
        console.log(findUnique(blank_out_phrase.toUpperCase()));
        console.log(found_letters);
        chosen_phrase_letters = findUnique(chosen_phrase.toUpperCase());
        if (chosen_phrase_letters.sort().join(',') === found_letters.sort().join(',')) {
            feedback_phrase.innerHTML = "You win!";
            won = true;
        }
    }
    else {
        feedback_phrase.innerHTML = "Incorrect!";
        document.getElementById(letter.toUpperCase()).style.backgroundColor = "#ff9999";
    }
}

function reset() {
    won = false;
    found_letters = [];
    blank_out_phrase = "";
    display_phrase.innerHTML = "";
    feedback_phrase.innerHTML = "Click a letter to guess the phrase!";
    letters.forEach(letter => {
        letter.style.backgroundColor = "white";
    });
    make_hangman();
}

function solve_hangman(text) {
    if ((won === false) && (text.toUpperCase() === chosen_phrase.toUpperCase())) {
        feedback_phrase.innerHTML = "Correct! You win!";
        display_phrase.innerHTML = chosen_phrase;
        found_letters = chosen_phrase_letters;
        won = true;
    }
    else if (won === true) {
        return;
    }
    else {
        feedback_phrase.innerHTML = "Incorrect! Keep trying!";
    }
}

function solve_prompt() {
    var solve_text = prompt("Guess the phrase. The casing doesn't matter, but the punctuation does.", "");
    solve_hangman(solve_text);
}
//make_hangman()
//console.log(is_letter("!"));