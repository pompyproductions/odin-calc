console.log("main.js: flotation device");

function updateDisplay() {
    if (!currentNumber && !firstOperand) {
        currentDisplay.textContent = "";
    } else if (currentDecimal > -1) {
        currentDisplay.textContent = `${Math.floor(currentNumber / Math.pow(10, currentDecimal))}.${currentNumber % Math.pow(10, currentDecimal)}`
    } else {
        currentDisplay.textContent = currentNumber.toString();
    };
// 12345.678:
// currentDecimal = 3
// `${Math.floor(12345678 / Math.pow(10, currentDecimal))}.${12345678 % Math.pow(10, currentDecimal)}`


}

function addDecimal() {
    currentDecimal += 1;
}


const appendNumber = function(event) {
    
    if (currentOperation && currentDisplay.classList.contains("display-middle")) {
        switchDisplay(".display-bottom");
    }
    if (willReset) {
        currentNumber = 0;
        willReset = false;
    }

    if (event.target.value === "." && currentDecimal === -1) {
        addDecimal();
    } else {
        currentNumber = currentNumber * 10 + Number(event.target.value);
        if (currentDecimal >= 0) addDecimal();
        updateDisplay();
        console.log(currentDecimal === -1 ? 
            currentNumber : 
            `${currentNumber} / ${Math.pow(10, currentDecimal)}`);
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


const applyOperation = function(event) {
    if (!currentOperation || !currentNumber) {return};

    let arr = [firstOperand, currentNumber, currentOperation];
    memory.newOperation(arr);
    currentNumber = memory.evaluate(arr);
    verboseDisplay.create(arr);
    // catch eventual error statements (e.g. "ERR01") here with switch/case
    
    currentOperation = null;
    firstOperand = null;
    
    resetDisplay();
    
    willReset = true;
    updateDisplay();
}


const resetCalculator = function() {
    currentNumber = 0;
    currentOperation = null;
    firstOperand = null;
    
    memory.reset();
    updateDisplay();
}

let willReset = false;
let firstOperand = null; // null means unset
let currentOperation = null;
let currentNumber = 0;
let currentDecimal = -1; // -1 means unset
let currentDisplay = document.querySelector(".display-middle");
currentDisplay.classList.add("display-focus");


document.querySelectorAll(".number").forEach(btn =>
    btn.addEventListener("click", appendNumber));
document.querySelectorAll(".operator").forEach(btn =>
    btn.addEventListener("click", setOperation));
document.getElementById("button-enter").addEventListener("click", applyOperation);
document.getElementById("button-reset").addEventListener("click", resetCalculator);

document.addEventListener('keydown', (event) => {
    // console.log(event.key);
    if (!isNaN(event.key)) {
        document.querySelector(".numbers")
            .querySelector(`[value="${event.key}"]`)
            .click();
    } else if ("+-*/".includes(event.key)) {
        document.querySelector(".operators")
            .querySelector(`[value="${inputs[event.key]}"]`)
            .click();
    } else if (["Enter", "Escape"].includes(event.key)) {
        document.querySelector(".others")
            .querySelector(`#${inputs[event.key]}`)
            .click();
    } else if (".,".includes(event.key)) {
        document.querySelector(".numbers")
            .querySelector(`#${inputs[event.key]}`)
            .click();
    }
});

const inputs = {
    "+": "add",
    "-": "subtract",
    "*": "multiply",
    "/": "divide",
    "Enter": "button-enter",
    "Escape": "button-reset",
    ".": "button-decimal"
}