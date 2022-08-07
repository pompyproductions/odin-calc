console.log("main.js: flotation device");


const appendNumber = function(btn) {
    if (btn.target.value === ".") {
        console.log(". function TBD");
    } else {
        currentNumber = currentNumber * 10 + Number(btn.target.value);
        currentDisplay.innerText = currentNumber.toString();
        console.log(currentNumber);
    }
}

document.querySelectorAll(".number").forEach(btn =>
    btn.addEventListener("click", appendNumber));



let currentNumber = 0;
let currentDisplay = document.querySelector(".display-middle");
currentDisplay.textContent = currentNumber.toString();
currentDisplay.classList.add("display-focus");