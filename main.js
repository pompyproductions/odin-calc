console.log("main.js: flotation device");

const INPUTS = {
    "+": "add",
    "-": "subtract",
    "*": "multiply",
    "/": "divide",
    "Enter": "button-enter",
    "Escape": "button-reset",
    ".": "button-decimal",
}
const PRECISION = 6;

// function areArraysEqual(arr1, arr2) {
//     if (arr1.length !== arr2.length) return false;
//     for (let i = 0; i < arr1.length; i++) {
//         if (arr1[i] !== arr2[i]) return false;
//     } return true;
// }

function onDigitClick(ev) {
    if (calculator.operator) {
        numDisplay.focus(2);
    }
    if (ev.target.value === ".") {
        if (calculator.decimalPoint === -1) calculator.decimalPoint = 0;
        numDisplay.update();
        return;
    }
    calculator.append(Number(ev.target.value));
    numDisplay.update();
}

function onOperatorClick(ev) {
    // can definitely write the conditionals better
    if (!calculator.operand) {
        if (!calculator.current) {
            if (ev.target.value === "subtract") {
                calculator.isNegative = true;
            } else if (ev.target.value === "add") {
                calculator.isNegative = false;
            }
            numDisplay.update();
            return;
        };
        calculator.setOperand(calculator.pack());
        numDisplay.write(0, calculator.operand);
    };
    if (calculator.operand && calculator.operator && calculator.current) {
        numDisplay.reset();
        calculator.submitOperation(true);
    }
    calculator.setOperator(ev.target.value);
}
``
function onSubmitClick(ev) {
    if (calculator.operand && calculator.operator && calculator.current) {
        numDisplay.reset();
        calculator.submitOperation(false);
        numDisplay.focus(1);
    }
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
            .querySelector(`[value="${INPUTS[event.key]}"]`)
            .click();
    } else if (["Enter", "Escape"].includes(event.key)) {
        document.querySelector(".others")
            .querySelector(`#${INPUTS[event.key]}`)
            .click();
    } else if (".,".includes(event.key)) {
        document.querySelector(".numbers")
            .querySelector(`#${INPUTS[event.key]}`)
            .click();
    }
});
