const btns = document.querySelectorAll("button");
const display = document.querySelector(".display");
const equal = document.getElementById("equal");
const result = document.querySelector(".result");
const clearBtn = document.querySelector("[value=C]");
const eraseBtn = document.querySelector("[value=backSpace]");
const dotBtn = document.getElementById("dot");
const odinBtn = document.querySelector(".odin-btn");
const calc = document.querySelector(".calc");
const worksBtn = document.querySelector(".works-btn");

function displayValue(e) {
    const regexForNum = /^\d+$/;
    const regexForOperator = /[\*/x÷+-]/;
    const regexForDot = /\./;

    const checkOperator = display.textContent[display.textContent.length - 2];

    result.textContent = "0";

    if (regexForNum.test(this.value) || regexForNum.test(e.key)) {     // test the value passed and resets de textContent so it won't display things like 013 or 000

        if (display.textContent === "0") {
            display.textContent = "";
        }

        regexForNum.test(this.value) ? display.textContent += this.value : display.textContent += e.key;

    } else if ((regexForOperator.test(this.value) || regexForOperator.test(e.key)) && display.textContent !== "0" && !regexForOperator.test(checkOperator)) {  // doesn't let things like 0 + 2 or 2++5 be displayed

        if (regexForOperator.test(this.value)) {

            display.textContent += ` ${this.value} `;

        } else {

            if (e.key === "*") {
                display.textContent += ` x `;
            } else if (e.key === "/") {
                display.textContent += ` ÷ `;
            } else {
                display.textContent += ` ${e.key} `;
            }
        }

    } else if ((regexForDot.test(this.value) || regexForDot.test(e.key)) && !regexForOperator.test(checkOperator)) {  // avoid things like 2 * .5
        const text = display.textContent;
        const textSplit = text.split(" ");

        if (!textSplit[textSplit.length - 1].includes(".") && text[text.length - 1] != "^") {  // avoid things like 3.33.66 or 2^.

            if (regexForDot.test(this.value)) {
                display.textContent += `${this.value}`;
            } else {
                display.textContent += e.key;
            }
        }

    } else if (this.value === "pow") {
        const text = display.textContent;
        const textSplit = text.split(" ");
        const lastChar = text[display.textContent.length - 1];

        if (regexForNum.test(lastChar) && !textSplit[textSplit.length - 1].includes("^")) {  // ensures that things like 4^6^3, 0.^ or 2 x^ won't happen
            display.textContent += "^";
        }

    } else if (this.value === "sqrt") {
        const text = display.textContent;
        const lastChar = text[display.textContent.length - 1];

        if (display.textContent === "0") {
            display.textContent = "√";
        } else if (lastChar === " ") {
            display.textContent += "√";
        }
    }

}

function fixPriority(array) {
    const copyArray = [...array];

    if (!array.includes("*") && !array.includes("/")) return copyArray;

    const indexOfMult = array.indexOf("*");
    const indexOfDiv = array.indexOf("/");

    if ((indexOfMult < indexOfDiv || indexOfDiv === -1) && indexOfMult >= 0) {  // takes * and the elements immediately before and after and puts into copyArray as a nested array in the place of the original 3 elements
        const splitSlice = array.slice(indexOfMult - 1, indexOfMult + 2);

        copyArray.splice(indexOfMult - 1, 3, splitSlice);

        return fixPriority(copyArray)
    } else if ((indexOfMult > indexOfDiv || indexOfMult === -1) && indexOfDiv >= 0) {
        const splitSlice = array.slice(indexOfDiv - 1, indexOfDiv + 2);

        copyArray.splice(indexOfDiv - 1, 3, splitSlice);

        return fixPriority(copyArray)
    }
}

function operate(str) {

    const toArray = str.replace(/x|÷/g, match => { // transforms the displayed value into an array of numbers and operators
        return match === 'x' ? '*' : '/';
    }).split(" ").map(elem => {
        const regex = /[*/+-]/;

        if (elem.includes("√") && elem.includes("^")) {  // also makes pow and sqrt so my life is easier
            const elemSplit = elem.split("^");
            elemSplit[0] = elemSplit[0].slice(1);
            return Math.sqrt(Math.pow(+elemSplit[0], +elemSplit[1]));

        } else if (elem.includes("√")) {
            return Math.sqrt(+elem.slice(1));

        } else if (elem.includes("^")) {
            const elemSplit = elem.split("^");
            return Math.pow(+elemSplit[0], +elemSplit[1]);

        } else {
            return regex.test(elem) ? elem : +elem;
        }
    });

    const fixed = fixPriority(toArray);

    const newArr = fixed.map(value => {  // ensures that multiplication and division are made first 

        function makeFirst(value) {

            if (Array.isArray(value)) {
                if (value[1] === "*") {
                    return makeFirst(value[0]) * value[2]
                } else {
                    return makeFirst(value[0]) / value[2]
                }
            } else {
                return value;
            }
        }
        return makeFirst(value)
    });

    return newArr.reduce((total, currVal, index, thisArr) => {
        if (currVal === "+") {
            return total + thisArr[index + 1];
        } else if (currVal === "-") {
            return total - thisArr[index + 1];
        } else {
            return total;
        }
    }, newArr[0]);
}

function displayResult() {
    const text = display.textContent;

    if (text.includes("÷")) {  // doesn't let division by 0 occur
        const textSplit = text.split(" ");

        for (let i = 0; i < textSplit.length; i++) {
            if ((textSplit[i] === "÷" && textSplit[i + 1] === "0") || (textSplit[i] === "÷" && textSplit[i + 1] === "")) {
                result.textContent = "I see what you did there, it won't crash baby ;)"
                return;
            }
        }
    }

    const total = operate(text);

    result.textContent = Number.isInteger(total) ? total : total.toFixed(2);
}

function clear() {
    display.textContent = "0";
    result.textContent = "0";
}

function erase() {
    const text = display.textContent;
    result.textContent = "0";

    if (text[text.length - 1] === " ") {

        display.textContent = text.slice(0, text.length - 3);
    } else if (text.length === 1) {

        display.textContent = "0";
    } else {

        display.textContent = text.slice(0, text.length - 1);
    }
}

function odinClass() {
    calc.classList.add("odin-desire");
    display.classList.add("display-odin");
    result.classList.add("result-odin");
    display.textContent = "0";
    result.textContent = "0";

    equal.removeEventListener("click", displayResult);
    equal.addEventListener("click", odinDesire);
}

function worksClass() {
    calc.classList.remove("odin-desire");
    display.classList.remove("display-odin");
    result.classList.remove("result-odin");
    display.textContent = "0";
    result.textContent = "0";

    equal.addEventListener("click", displayResult);
    equal.removeEventListener("click", odinDesire);
}

function odinDesire() {
    const text = display.textContent;
    const splitText = text.split(" ");

    if (text.includes("÷")) {
        const textSplit = text.split(" ");

        for (let i = 0; i < textSplit.length; i++) {
            if ((textSplit[i] === "÷" && textSplit[i + 1] === "0") || (textSplit[i] === "÷" && textSplit[i + 1] === "")) {
                result.textContent = "I see what you did there, it won't crash baby ;)"
                return;
            }
        }
    }

    const odinResult = splitText.reduce((prev, curr, index, arr) => {

        if (/[\*/x/÷+-]/.test(curr)) {
            switch (curr) {
                case "+":
                    return +prev + Number(arr[index + 1]);
                    break;
                case "-":
                    return +prev - Number(arr[index + 1]);
                    break;
                case "*":
                case "x":
                    return +prev * Number(arr[index + 1]);
                    break;
                case "÷":
                case "/":
                    return +prev / Number(arr[index + 1]);
            }
        } else {
            return prev;
        }

    }, +splitText[0]);

    result.textContent = Number.isInteger(odinResult) ? odinResult : odinResult.toFixed(2);
}

btns.forEach(btn => btn.addEventListener("click", displayValue));
equal.addEventListener("click", displayResult);
clearBtn.addEventListener("click", clear);
eraseBtn.addEventListener("click", erase);

odinBtn.addEventListener("click", odinClass);
worksBtn.addEventListener("click", worksClass);

window.addEventListener("keydown", displayValue);
window.addEventListener("keydown", function (e) {
    if (e.key === "Backspace") {
        erase();
    }
});

window.addEventListener("keydown", function (e) {
    if (e.key === "Enter" && !calc.classList.contains("odin-desire")) {
        displayResult();
    } else if (e.key === "Enter") {
        odinDesire();
    }
});