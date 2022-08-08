console.log("main.js: flotation device");

function updateDisplay() {
    if (!currentNumber && !firstOperand) {
        currentDisplay.textContent = "";
    } else {
        currentDisplay.textContent = currentNumber.toString()
    };
}
function switchDisplay(to) {
    currentDisplay.classList.remove("display-focus");
    currentDisplay = document.querySelector(to);
    currentDisplay.classList.add("display-focus");
} 
function resetDisplay() {
    switchDisplay(".display-middle");
    document.querySelector(".display-top").textContent = "";
    document.querySelector(".display-bottom").textContent = "";
}


const appendNumber = function(event) {
    
    if (currentOperation && currentDisplay.classList.contains("display-middle")) {
        switchDisplay(".display-bottom");
    }
    if (willReset) {
        currentNumber = 0;
        willReset = false;
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


const resetDisplay = function() {
    switchDisplay(".display-middle");
    document.querySelector(".display-top").textContent = "";
    document.querySelector(".display-bottom").textContent = "";
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
let currentDisplay = document.querySelector(".display-middle");
currentDisplay.classList.add("display-focus");


document.querySelectorAll(".number").forEach(btn =>
    btn.addEventListener("click", appendNumber));
document.querySelectorAll(".operator").forEach(btn =>
    btn.addEventListener("click", setOperation));
document.getElementById("button-enter").addEventListener("click", applyOperation);
document.getElementById("button-reset").addEventListener("click", resetCalculator);