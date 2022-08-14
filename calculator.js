console.log("calculator.js: flotation device");

let numDisplay = {
    
    container: [
        document.querySelector(".display-top"),
        document.querySelector(".display-middle"),
        document.querySelector(".display-bottom")
    ],
    current: document.querySelector(".display-middle"),


    update: () => {
        if (calculator.currentWhole === 0 && !calculator.currentDecimal) {
            numDisplay.current.textContent = `\
            ${calculator.isNegative ? "-" : ""}`;
        } else {
            numDisplay.current.textContent = `\
            ${calculator.isNegative ? "-" : ""}\
            ${calculator.currentWhole}\
            ${calculator.currentDecimal ? `.${calculator.currentDecimal}` : ""}`
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

    // update: (arr) => {
    //     if (arr[1] > 0) {
    //         numDisplay.current.textContent = (arr[0] >= 0) ?
    //         `${Math.floor(arr[0] / Math.pow(10, arr[1]))}.${arr[0] % Math.pow(10, arr[1])}` :
    //         `${Math.ceil(arr[0] / Math.pow(10, arr[1]))}.${(arr[0]*-1) % Math.pow(10, arr[1])}`;
    //     } else {
    //         numDisplay.current.textContent = `${arr[0]}`;
    //     }
    // },
}

let calculator = {

    isNegative: false,
    currentWhole: 0,
    currentDecimal: null,

    operand: null, // set only first operand, second is submitted directly from current
    operator: null,
    
    willReset: false,


    append: (digit) => {
        if (!calculator.currentDecimal) {
            calculator.currentWhole = calculator.currentWhole * 10 + digit;
        } else {
            calculator.currentDecimal = calculator.currentDecimal * 10 + digit;
        }
    },
    setOperand: (val) => {
        calculator.operand = val;
        calculator.current = [0, -1];
    },
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