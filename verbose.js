// function verbose

const verboseDisplay = {
    container: document.querySelector(".verbose-display"),
    
    switchFocus: (node) => {
        [...verboseDisplay.container.children].forEach((item) => {
            item.classList.remove("latest")});
        node.classList.add("latest");
    },
    
    append: (arr, isFirst) => { // takes operation array as parameter
        let verb = ""
        switch (arr[2]) {
            case "add":
                verb = "plus";
                break;
            case "subtract":
                verb = "minus";
                break;
            case "multiply":
                verb = "times";
                break;
            case "divide":
                verb = "divided by";
                break;
        };
        let first = arr[0][0];
        if (verboseDisplay.container.lastElementChild) { // checks if there's a child and returns bool
            first = "..."
        };

        let newElem = document.createElement("p");
        newElem.textContent = `${first} ${verb} ${arr[1][0]}`;
        newElem.classList.add("verbose-element");
        verboseDisplay.container.appendChild(newElem);
        verboseDisplay.switchFocus(newElem);
        newElem.addEventListener("click", onVerboseClick);
        return newElem;
    },
    
    regen: () => {
        [...verboseDisplay.container.children].forEach((item) => item.remove());
        memory.history.forEach((arr) => verboseDisplay.append(arr));
        if (memory.history.length > memory.pointer + 1) {
            let faded = [...verboseDisplay.container.children].slice(
                memory.pointer + 1, memory.history.length);
            faded.forEach((element) => {element.classList.add("faded")});
        }
    }
}

const onVerboseClick = (event) => {
    let id = [...verboseDisplay.container.children].indexOf(event.target);

    memory.rollback(id);
    verboseDisplay.regen();
    verboseDisplay.switchFocus(verboseDisplay.container.children.item(id));

    console.log(memory.evaluate(memory.history[id]));
    currentNumber = memory.evaluate(memory.history[id]);
    currentOperation = null;
    firstOperand = null;
    resetDisplay();
    updateDisplay();
    willReset = true;
    
};

let memory = {
    history: [],
    pointer: -1,
    
    rollback: (eventId) => {memory.pointer = eventId},
    evaluate: (arr) => operations[arr[2]](arr[0], arr[1]),
    reset: () => {
        memory.history = memory.history.slice(0, 0);
        memory.pointer = -1;
        verboseDisplay.regen();
    },

    append: (arr) => {
        if (memory.history.length > 0) {
            console.log(arr);
            console.log(memory.evaluate(memory.history[memory.pointer]));
            if (arr[0][0] !== memory.evaluate(memory.history[memory.pointer])[0]) {
                memory.pointer = -1
            }
        };
        if (memory.history.length > memory.pointer + 1) {
            memory.history = memory.history.slice(0, memory.pointer + 1);
            verboseDisplay.regen();
        };

        memory.history.push(arr);
        memory.pointer += 1;
        return arr;
    },
}