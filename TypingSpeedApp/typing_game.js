//define time limit for a user
let TIME_LIMIT = 60;

//define dummy text to be used

let quotes_arr = [
    "The journey of a thousand miles begins with one step.",
    "With hard work and effort, you can achieve anything.",
    "Work harder than you think you did yesterday.",
    "The only way to do great work is to love what you do.",
    "Do not be embarrassed by your failures, learn from them and start again."
];

//Select all elements
let wpm_txt = document.querySelector(".wpm_val");
let cpm_txt = document.querySelector(".cpm_val");
let error_txt = document.querySelector(".error_val");
let timer_txt = document.querySelector(".timer_val");
let accuracy_txt = document.querySelector(".accuracy_val");
let quote_txt = document.querySelector(".quote");
let input_txt = document.querySelector(".quote_input");
let restart_btn = document.querySelector(".restart_btn");
let wpm = document.querySelector(".wpm");
let cpm = document.querySelector(".cpm");


//Initial values

let time_left = TIME_LIMIT;
let time_elapsed = 0;
let total_errors = 0;
let errors = 0;
let accuracy = 0;
let character_typed = 0;
let current_quote = "";
let quote_index = 0;
let timer = null;


// All functionalities 

function startGame() {

    //Reset All Values
    resetValues();

    // display dummy quote
    displayQuote();

    // clear old timer and start new timer

    clearInterval(timer);

    //Start the timer
    startTimer();

}

function restart() {

    //Reset values
    resetValues();

}

function resetValues() {

    time_left = TIME_LIMIT;
    time_elapsed = 0;
    errors = 0;
    total_errors = 0;
    accuracy = 0;
    character_typed = 0;
    quote_index = 0;

    //set value of input text box
    input_txt.value = "";
    input_txt.disabled = false;

    quote_txt.textContent = 'Click on the area below to start the game.';

    error_txt.textContent = 0;
    accuracy_txt.textContent = 100;
    timer_txt.textContent = TIME_LIMIT;

    // Remove cpm,wpm & restart button

    wpm.style.display = "none";
    cpm.style.display = "none";
    restart_btn.style.display = "none";

}

function displayQuote() {

    quote_txt.innerHTML = '';
    curr_quote = quotes_arr[quote_index];

    // separate each character and make an element out of it.
    curr_quote.split('').forEach(char => {
        const charSpan = document.createElement('span')
        charSpan.innerText = char
        quote_txt.appendChild(charSpan)
    })

    if (quote_index < quotes_arr.length - 1)
        quote_index++;
    else
        quote_index = 0;
}

function startTimer() {
    timer = setInterval(displayTimer, 1000);
}

function displayTimer() {

    if (time_left > 0) {
        time_left--;

        time_elapsed++;
        timer_txt.textContent = time_left;

    }

    else {
        finishGame();
    }

}

function finishGame() {
    //Stop the timer
    clearInterval(timer);

    //Disable the input text box
    input_txt.disabled = true;

    //calculate cpm & wpm & update 

    cpm_val = Math.round((character_typed / time_elapsed) * 60);
    wpm_val = Math.round((((character_typed / 5) / time_elapsed) * 60));

    cpm_txt.textContent = cpm_val;
    wpm_txt.textContent = wpm_val;

    //Display cpm, wpm & restart button
    wpm.style.display = "block";
    cpm.style.display = "block";
    restart_btn.style.display = "block";

    quote_txt.textContent = "Click on the area below to start the game.";

}

function processInputText() {

    // get current value from the input text box
    curr_val = input_txt.value;
    curr_input_arr = curr_val.split('');

    character_typed++;

    errors = 0;

    qouteArr = quote_txt.querySelectorAll("span");


    //Checking correct & incorrect typed character
    qouteArr.forEach((charSpan, index) => {

        const character = curr_input_arr[index];

        //If character is not typed
        if (character == null) {

            charSpan.classList.remove('incorrect_char');
            charSpan.classList.remove('correct_char');

        }
        //correct typed character
        else if (character === charSpan.innerText) {
            charSpan.classList.add('correct_char');
            charSpan.classList.remove('incorrect_char');
        }
        //incorrect type character
        else {
            charSpan.classList.add('incorrect_char');
            charSpan.classList.remove('correct_char');

            errors++;
        }
    });

    //display the errors

    error_txt.textContent = total_errors + errors;

    //update accuracy value

    let correct_chars = (character_typed - (total_errors + errors));
    let accuracy_val = ((correct_chars / character_typed) * 100);
    accuracy_txt.textContent = Math.round(accuracy_val);

    // if current text is completely typed
    // irrespective of errors
    if (curr_val.length == curr_quote.length) {
        displayQuote();

        // update total errors
        total_errors += errors;

        // clear the input area
        input_txt.value = "";
    }

}