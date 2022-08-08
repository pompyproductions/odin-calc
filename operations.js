console.log("operations.js: flotation device");

const operations = {
    add: (x, y) => x+y,
    subtract: (x, y) => x-y,
    multiply: (x, y) => x*y,
    divide: (x, y) => y === 0 ? "ERR01" : (x/y) // catch error and display on calculator AND verbose
}

let memory = {
    history: [],
    pointer: -1,
    newOperation: (event) => {
        if (memory.length >= memory.pointer) {
            memory = memory.slice(0, memory.pointer + 1)
        };
        memory.history.push(event);
        memory.pointer += 1;
    },
    rollback: (eventId) => {memory.pointer = eventId},
}
// console.log(operations.divide(7,3).toFixed(3));
// console.log(operations.divide(8,3).toFixed(3));

