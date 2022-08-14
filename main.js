console.log("main.js: flotation device");

const inputs = {
    "+": "add",
    "-": "subtract",
    "*": "multiply",
    "/": "divide",
    "Enter": "button-enter",
    "Escape": "button-reset",
    ".": "button-decimal",
}

function areArraysEqual(arr1, arr2) {
    if (arr1.length !== arr2.length) return false;
    for (let i = 0; i < arr1.length; i++) {
        if (arr1[i] !== arr2[i]) return false;
    } return true;
}

function onDigitClick(ev) {
    console.log(ev.target);
}

function onOperatorClick(ev) {
    console.log(ev.target);
    if (!calculator.operand && calculator.current === [0, -1]) {
        if (ev.target.value === "subtract") {
            console.log("make it negative");
        } else if (ev.target.value === "add") {
            console.log("make it positive");
        }
    }
    // if (calculator.current === [0, -1])
}

function onSubmitClick(ev) {
    console.log(ev.target);
}

function onResetClick(ev) {
    console.log(ev.target);
}



// const applyOperation = function(event) {
//     if (!currentOperation || !currentNumber) {return};

//     let arr = [firstOperand, currentNumber, currentOperation];
//     memory.newOperation(arr);
//     currentNumber = memory.evaluate(arr);
//     verboseDisplay.create(arr);
//     // catch eventual error statements (e.g. "ERR01") here with switch/case
    
//     currentOperation = null;
//     firstOperand = null;
    
//     resetDisplay();
    
//     willReset = true;
//     updateDisplay();
// }


let currentDisplay = document.querySelector(".display-middle");
currentDisplay.classList.add("display-focus");

// add click events
document.querySelectorAll(".number").forEach(btn =>
    btn.addEventListener("click", onDigitClick));
document.querySelectorAll(".operator").forEach(btn =>
    btn.addEventListener("click", onOperatorClick));
document.getElementById("button-enter").addEventListener("click", onSubmitClick);
document.getElementById("button-reset").addEventListener("click", onResetClick);

// link key events to click events
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
