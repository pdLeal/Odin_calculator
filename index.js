const btns = document.querySelectorAll("button");
const display = document.getElementById("display");
const equal = document.getElementById("equal");

function displayValue() {
    const regexForNum = /\d/;
    const regexForOperator = /[x÷+-]/;


    if (regexForNum.test(this.value)) {

        if (display.textContent === "0") {
            display.textContent = "";
        }

        display.textContent += this.value;

    } else if (regexForOperator.test(this.value) && display.textContent !== "0") {
        const checkOperator = display.textContent[display.textContent.length - 2];

        if (!checkOperator || !regexForOperator.test(checkOperator)) {
            display.textContent += ` ${this.value} `;
        }
    }

}

const smallOp = "2 + 5 * 5 / 8 * 3 - 1 + 2 * 5 / 2 - 4 * 3";
const bigOp = "8 * 3 - 1 + 2 * 5 / 2 * 3 * 5 / 4 / 3 * 27 - 4 * 3";

function operate(arr) {
    
    const fixed = fixPriority(fixOperators(arr));
    console.log(fixed);

}

operate(smallOp);

function fixOperators(str) {
    const valueDisplayed = display.textContent; // retirar str e trocar por valueDisplayed após testes

    return str.replace(/x|÷/g, match => {
        return match === 'x' ? '*' : '/';
    }).split(" ").map(elem => {
        const regex = /[*/+-]/;
        return regex.test(elem) ? elem : +elem;
    });
}

function fixPriority(array) {
    const copyArray = [...array];

    if (!array.includes("*") && !array.includes("/")) return copyArray;

    const indexOfMult = array.indexOf("*");
    const indexOfDiv = array.indexOf("/");

    if ((indexOfMult < indexOfDiv || indexOfDiv === -1) && indexOfMult >= 0) {
        const splitSlice = array.slice(indexOfMult - 1, indexOfMult + 2);

        copyArray.splice(indexOfMult - 1, 3, splitSlice);


        return fixPriority(copyArray)
    } else if ((indexOfMult > indexOfDiv || indexOfMult === -1) && indexOfDiv >= 0) {
        const splitSlice = array.slice(indexOfDiv - 1, indexOfDiv + 2);

        copyArray.splice(indexOfDiv - 1, 3, splitSlice);


        return fixPriority(copyArray)
    }
}

// console.log(fixPriority(fixOperators("8 * 3 - 1 + 2 * 5 / 2 - 4 * 3")));  // 16

btns.forEach(btn => btn.addEventListener("click", displayValue));
equal.addEventListener("click", operate);