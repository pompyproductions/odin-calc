console.log("main.js: flotation device");

function updateDisplay() {
    if (!currentNumber && !firstOperand) {
        currentDisplay.textContent = "";
    } else {
        currentDisplay.textContent = currentNumber.toString()
    };
    console.log(currentNumber);
}

const appendNumber = function(event) {
    if (currentOperation && currentDisplay.classList.contains("display-middle")) {
        currentDisplay.classList.remove("display-focus");
        currentDisplay = document.querySelector(".display-bottom");
        currentDisplay.classList.add("display-focus");
    }
    if (event.target.value === ".") {
        console.log(". function TBD");
    } else {
        currentNumber = currentNumber * 10 + Number(event.target.value);
        updateDisplay();
    }
}

const setOperation = function(event) {    
    if (!firstOperand) {
        // don't do anything when calculator is empty
        if (currentNumber === 0) {return};
        
        // otherwise apply the first operand and reset current
        firstOperand = currentNumber;
        currentNumber = 0;
        document.querySelector(".display-top").textContent = firstOperand.toString();
    };

    switch (event.target.value) {
        case "add":
            document.querySelector(".display-middle").innerHTML = "&plus;";
            break;
        case "subtract":
            document.querySelector(".display-middle").innerHTML = "&minus;";
            break;
        case "multiply":
            document.querySelector(".display-middle").innerHTML = "&times;";
            break;
        case "divide":
            document.querySelector(".display-middle").innerHTML = "&divide;";
            break;
    };
    currentOperation = event.target.value;
}

const resetCalculator = function(event) {
    currentNumber = 0;
    updateDisplay();
}

const applyOperation = function(event) {
    console.log(`${firstOperand} ${currentOperation} ${currentNumber}`);
}

// const switchDisplay = function(next) {
//     currentDisplay.classList.remove("display-focus");
//     currentDisplay = document.querySelector(next);
//     currentDisplay.classList.add("display-focus");
// }

let firstOperand = null; // null means unset
let currentOperation = null;
let currentNumber = 0;
let currentDisplay = document.querySelector(".display-middle");
currentDisplay.classList.add("display-focus");


document.querySelectorAll(".number").forEach(btn =>
    btn.addEventListener("click", appendNumber));
document.querySelectorAll(".operator").forEach(btn =>
    btn.addEventListener("click", setOperation));
document.getElementById("button-enter").addEventListener("click", applyOperation);
document.getElementById("button-reset").addEventListener("click", resetCalculator);
