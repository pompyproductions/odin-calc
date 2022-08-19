console.log("operations.js: flotation device");

const operations = {
    add: (x, y) => {
        let result = x[0] + y[0];
        return [result, operations.countDecimalPlaces(result)];
    },
    subtract: (x, y) => {
        let result = x[0] - y[0];
        return [result, operations.countDecimalPlaces(result)];
    },
    multiply: (x, y) => {
        let result = x[0] * y[0];
        return [result, operations.countDecimalPlaces(result)];
    },
    divide: (x, y) => {
        let result = x[0] / y[0];
        return [result, PRECISION];
    },
    // divide: (x, y) => y === 0 ? "ERR01" : (x/y),

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
