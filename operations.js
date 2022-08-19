console.log("operations.js: flotation device");

const operations = {
    add: (x, y) => [x[0] + y[0], Math.max(x[1], y[1])],
    subtract: (x, y) => x-y,
    multiply: (x, y) => x*y,
    divide: (x, y) => y === 0 ? "ERR01" : (x/y), // catch error and display on calculator AND verbose

    countDecimalPlaces: (x) => {
        let str = x.toString();
        let src = str.match(/\.(\d+)/);
        if (src) {
            src = src[1].replace(/(0+)$/, "");
            return src.length;
        } return 0
    },
    countZerosAfterPoint: (x) => {
        let str = x.toString();
        let src = str.match(/\.(0+)/);
        if (src) {
            return src[1].length;
        } return 0;
    }
}

// console.log(operations.divide(7,3).toFixed(3));
// console.log(operations.divide(8,3).toFixed(3));
