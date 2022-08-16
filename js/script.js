const inputs = document.querySelector(".inputs");
const resetBtn = document.querySelector(".reset-btn");
const hint = document.querySelector(".hint span");
const typingInput = document.querySelector(".typing-input");
const wrongLetter = document.querySelector(".wrong-letter span");
const guessLeft = document.querySelector(".guess-left span")

let word;
let inccorrects = [];
let corrects = [];
let maxGuesses;

function randomWord() {
    let ranObj = wordList[Math.floor(Math.random() * wordList.length)];
    word = ranObj.word;
    maxGuesses = 8; corrects = []; inccorrects = [];

    hint.innerText = ranObj.hint; 
    guessLeft.innerText = maxGuesses;
    wrongLetter.innerText = inccorrects;
    
    let html = "";
    for (let i = 0; i < word.length; i++) {
        html += `<input type="text" disabled>`;
    }
    inputs.innerHTML = html;
}
randomWord();

function initGame(e) {
    let key = e.target.value;
    if(key.match(/^[A-Za-z]+$/) && !inccorrects.includes(` ${key}`) && !corrects.includes(key)){
        console.log(key);
        if(word.includes(key)) {
           for (let i = 0; i < word.length; i++){
            if(word[i] === key) {
                corrects.push(key);
                inputs.querySelectorAll("input")[i].value = key;
            }
           }
        } else {
            maxGuesses--;
            inccorrects.push(` ${key}`);
        }
        guessLeft.innerText = maxGuesses;
        wrongLetter.innerText = inccorrects;
    }
    typingInput.value = "";

   setTimeout(() => {
     if (corrects.length === word.length) {
        alert(`Congrats! you found the word ${word}`)
        randomWord();
    } else if(maxGuesses < 1 ) {
        alert("Game over!");
        for (let i = 0; i < word.length; i++){
            inputs.querySelectorAll("input")[i].value = word[i];
           }
    }
    });
   }

resetBtn.addEventListener("click", randomWord);
typingInput.addEventListener("input", initGame);
document.addEventListener("keydown", () => typingInput.focus());