const display = document.querySelector(".display");
const value = display.querySelector(".value");
const nrBtn = document.querySelectorAll(".nr");
const operatorBtn = document.querySelectorAll(".operator");
const equalsBtn = document.querySelector(".equals");
const allClearBtn = document.querySelector(".ac");
const dotBtn = document.querySelector(".dot");
const delBtn = document.querySelector(".del");

let num1 = null;
let num2 = null;
let operator = null;
let result = null;
// Set to true when dividing by zero
let locked = false;
let justCalculated = false;
let decimal = false;

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
                value.textContent = "ERR - PRESS AC";
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

function appendChar(char) {
    if (locked) return;
    if (justCalculated) {
        value.textContent = "";
        justCalculated = false;
    }
    if (value.textContent.length >= 12) return;
    value.textContent += char;
}

nrBtn.forEach(btn => {
    btn.addEventListener("click", e => {
        appendChar(e.target.textContent);
    });
});

dotBtn.addEventListener("click", e => {
    if (decimal) return;
    appendChar(e.target.textContent);
    decimal = true;
});

delBtn.addEventListener("click", e => {
    if (locked) return;
    if (value.textContent.length === 0) return;
    value.textContent = value.textContent.slice(0, -1);
});

operatorBtn.forEach(btn => {
    btn.addEventListener("click", e => {
        if (locked || value.textContent === "") return;
        if (operator) {
            num2 = value.textContent;
            result = operate(operator, num1, num2);
            if (locked) return;
            value.textContent = result;
            num1 = result;
            operator = e.target.textContent;
            justCalculated = true;
        } else {
            num1 = value.textContent;
            value.textContent = "";
            decimal = false;
            operator = e.target.textContent;
        }
    });
});

equalsBtn.addEventListener("click", e => {
    if (locked || num1 === null) {
        return;
    } else {
        num2 = value.textContent;
        result = operate(operator, num1, num2);
        if (locked) return;
        value.textContent = result;
        operator = null;
        justCalculated = true;
    }
});

allClearBtn.addEventListener("click", e => {
    value.textContent = "";
    num1 = null;
    num2 = null;
    result = null;
    locked = false;
    decimal = false;
});

document.addEventListener("keydown", e => {
    if (e.key >= "0" && e.key <= "9") {
        appendChar(e.key);
    }
    if (e.key === "." && !decimal) {
        appendChar(".");
        decimal = true;
    }
    if (e.key === "Backspace") {
        value.textContent = value.textContent.slice(0, -1);
    }
});