console.log("calculator.js: flotation device");

let numDisplay = {
    
    container: [
        document.querySelector(".display-top"),
        document.querySelector(".display-middle"),
        document.querySelector(".display-bottom")
    ],
    current: document.querySelector(".display-middle"),


    update: () => {
        if (!calculator.current) {
            numDisplay.current.textContent = `${calculator.isNegative ? "–" : ""}`;
        } else if (calculator.decimalPoint === -1) {
            numDisplay.current.textContent = [
                `${calculator.isNegative ? "–" : ""}`,
                `${calculator.current}`
            ].join("");
        } else {
            let arr = [
                `${calculator.isNegative ? "–" : ""}`,
                `${Math.floor(calculator.current / Math.pow(10, calculator.decimalPoint))}`,
                ".",
                `${"0".repeat(calculator.zerosAfterDecimalPoint)}`
            ];
            if (calculator.current % Math.pow(10, calculator.decimalPoint)) {
                arr.push(`${calculator.current % Math.pow(10, calculator.decimalPoint)}`);
            };
            numDisplay.current.textContent = arr.join("");
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
    },
    write: (id, val) => {
        let txt;
        if (val[1] === -1) {
            txt = val[0].toString();
        } else {
            txt = val[0].toFixed(val[1]);
        };
        numDisplay.container[id].textContent = txt.replace("-", "–");
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
    decimalPoint: -1,
    current: 0,
    zerosAfterDecimalPoint: 0,

    operand: null, // set only first operand, second is submitted directly from current
    operator: null,
    
    willReset: false,


    append: (digit) => {
        calculator.current = calculator.current * 10 + digit;
        if (calculator.decimalPoint !== -1) {
            calculator.decimalPoint++;
            if (digit === 0 && !(calculator.current % Math.pow(10, calculator.decimalPoint))) {
                calculator.zerosAfterDecimalPoint++;
            }
        }
    },
    setOperand: (val) => {
        calculator.operand = val;
        calculator.resetCurrent();
    },
    setOperator: (val) => {
        calculator.operator = val;
        switch (val) {
            case "add":
                numDisplay.container[1].innerHTML = "&plus;";
                break;
            case "subtract":
                numDisplay.container[1].innerHTML = "&minus;";
                break;
            case "multiply":
                numDisplay.container[1].innerHTML = "&times;";
                break;
            case "divide":
                numDisplay.container[1].innerHTML = "&divide;";
                break;
        }
    },
    // reset: () => {
    //     currentNumber = 0;
    //     currentOperation = null;
    //     firstOperand = null;
        
    //     memory.reset();
    //     updateDisplay();
    // },
    resetCurrent: () => {
        calculator.current = 0;
        calculator.decimalPoint = -1;
        calculator.isNegative = false;
        calculator.zerosAfterDecimalPoint = 0;
    },
    submitOperation: () => {
        let newOperation = [
            calculator.operand, 
            calculator.packNumber(), 
            calculator.operator
        ];
        memory.append(newOperation);
        numDisplay.write(0, memory.evaluate(newOperation));
    },
    packNumber: () => {
        let packedNum = calculator.current;
        if (calculator.isNegative) {
            packedNum *= -1
        };
        if (calculator.decimalPoint !== -1) {
            packedNum /= Math.pow(10, calculator.decimalPoint)
        };
        return [
            packedNum,
            calculator.decimalPoint === -1 ? 0 : calculator.decimalPoint
        ]
    }
}