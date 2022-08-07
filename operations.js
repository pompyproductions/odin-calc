console.log("operations.js: flotation device");

const operations = {
    add: (x, y) => x+y,
    subtract: (x, y) => x-y,
    multiply: (x, y) => x*y,
    divide: (x, y) => y === 0 ? "ERR" : (x/y)
}

// console.log(operations.divide(7,3).toFixed(3));
// console.log(operations.divide(8,3).toFixed(3));

