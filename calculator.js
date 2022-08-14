console.log("calculator.js: flotation device");

let numDisplay = {
    
    container: [
        document.querySelector(".display-top"),
        document.querySelector(".display-middle"),
        document.querySelector(".display-bottom")
    ],
    current: document.querySelector(".display-middle"),


    update: (arr) => {
        if (arr[1] > 0) {
            numDisplay.current.textContent = (arr[0] >= 0) ?
            `${Math.floor(arr[0] / Math.pow(10, arr[1]))}.${arr[0] % Math.pow(10, arr[1])}` :
            `${Math.ceil(arr[0] / Math.pow(10, arr[1]))}.${(arr[0]*-1) % Math.pow(10, arr[1])}`;
        } else {
            numDisplay.current.textContent = `${arr[0]}`;
        }
    },
    focus: (val) => {
        numDisplay.current.classList.remove("display-focus");
        numDisplay.current = numDisplay.container[val];
        numDisplay.current.classList.add("display-focus");
    },
    reset: () => {
        numDisplay.container.forEach(elem => {elem.textContent = "";});
        numDisplay.focus(1);
    }
}

let calculator = {
    isNegative: false,
    willReset: false,
    operand: null, // set only first operand, second is submitted directly from current
    operator: null,
    current: [0, -1],


    append: (digit) => {
        if (current[0] >= 0) {
            current[0] = current[0] * 10 + digit;
        } else {
            current[0] = current[0] * 10 - digit;
        };
        if (current[1] > -1) {current[1]++};
    },
    setOperand: (val) => {calculator.operand = val},
    setOperator: (val) => {
        if (!operand && current === [0, -1]) { // no operand or anything
            if (val === "-" && !isNegative) {
                isNegative = true;
                numDisplay.update();
            };
        }
        // } else if () {

        // }
        calculator.operator = val;
        // switch (val) {
        //     case "add":
        //         document.querySelector(".display-middle").innerHTML = "&plus;";
        //         break;
        //     case "subtract":
        //         document.querySelector(".display-middle").innerHTML = "&minus;";
        //         break;
        //     case "multiply":
        //         document.querySelector(".display-middle").innerHTML = "&times;";
        //         break;
        //     case "divide":
        //         document.querySelector(".display-middle").innerHTML = "&divide;";
        //         break;
        // }
    },
    reset: () => {
        currentNumber = 0;
        currentOperation = null;
        firstOperand = null;
        
        memory.reset();
        updateDisplay();
    },
    submitOperation: () => {console.log([
        calculator.operand,
        calculator.current,
        calculator.operator
    ])},
}