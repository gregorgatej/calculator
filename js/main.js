function add(num1, num2) {
    return num1 + num2;
}

function subtract(num1, num2) {
    return num1 - num2;
}

function multiply(num1, num2) {
    return num1 * num2;
}

function divide(num1, num2) {
    return num1 / num2;
}

let num1;
let num2;
let operator;
let result;

function operate (operator, num1, num2) {
    num1 = Number(num1);
    num2 = Number(num2);
    switch(operator) {
        case '+':
            return add(num1, num2);
        case '-':
            return subtract(num1, num2);
        case 'x':
            return multiply(num1, num2);
        case '÷':
            if (num2 === 0) {
                throw new Error("Division by zero");
            }
            return divide(num1, num2);
        default:
            throw new Error(`Unknown operator: ${operator}`);
    }
}

const display = document.querySelector(".display");
const nrBtn = document.querySelectorAll(".nr");
const operatorBtn = document.querySelectorAll(".operator");
const equalsBtn = document.querySelector(".equals");
const allClearBtn = document.querySelector(".ac");

nrBtn.forEach(btn => {
    btn.addEventListener("click", e => {
        const selectedNumber = e.target.textContent;
        display.textContent += selectedNumber;
    });
});

operatorBtn.forEach(btn => {
    btn.addEventListener("click", e => {
        if (operator) {
            // TODO: support operator chaining
        }
        num1 = display.textContent;
        display.textContent = "";
        operator = e.target.textContent;
    });
});

equalsBtn.addEventListener("click", e => {
    num2 = display.textContent;
    result = operate(operator, num1, num2);
    display.textContent = result;
});

allClearBtn.addEventListener("click", e => {
    display.textContent = "";
    num1 = null;
    num2 = null;
    result = null;
});