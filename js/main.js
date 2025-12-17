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

let num1 = null;
let num2 = null;
let operator = null;
let result = null;
// Set to true when dividing by zero
let locked = false;
let justCalculated = false;

function operate (operator, num1, num2) {
    num1 = Number(num1);
    num2 = Number(num2);
    switch(operator) {
        case '+':
            return roundToOneDecimal(add(num1, num2));
        case '-':
            return roundToOneDecimal(subtract(num1, num2));
        case 'x':
            return roundToOneDecimal(multiply(num1, num2));
        case '÷':
            if (num2 === 0) {
                display.textContent = "Not allowed! Press AC to continue";
                locked = true;
                return null;
            }
            return roundToOneDecimal(divide(num1, num2));
        default:
            break;
    }
}

function roundToOneDecimal(result) {
    return Math.round(result * 10) / 10;
}

const display = document.querySelector(".display");
const nrBtn = document.querySelectorAll(".nr");
const operatorBtn = document.querySelectorAll(".operator");
const equalsBtn = document.querySelector(".equals");
const allClearBtn = document.querySelector(".ac");

nrBtn.forEach(btn => {
    btn.addEventListener("click", e => {
        if (locked) return;
        if (justCalculated) {
            display.textContent = "";
            justCalculated = false;
        }
        const selectedNumber = e.target.textContent;
        display.textContent += selectedNumber;
    });
});

operatorBtn.forEach(btn => {
    btn.addEventListener("click", e => {
        if (locked || display.textContent === "") return;
        if (operator) {
            num2 = display.textContent;
            result = operate(operator, num1, num2);
            if (locked) return;
            display.textContent = result;
            num1 = result;
            operator = e.target.textContent;
            justCalculated = true;
        } else {
            num1 = display.textContent;
            display.textContent = "";
            operator = e.target.textContent;
        }
    });
});

equalsBtn.addEventListener("click", e => {
    if (locked || num1 === null) {
        return;
    } else {
        num2 = display.textContent;
        result = operate(operator, num1, num2);
        if (locked) return;
        display.textContent = result;
        operator = null;
        justCalculated = true;
    }
});

allClearBtn.addEventListener("click", e => {
    display.textContent = "";
    num1 = null;
    num2 = null;
    result = null;
    locked = false;
});