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
const bigOp = "8 * 3 - 1 + 2 * 5 / 2 * 3 * 5 / 4 / 3 * 10 - 4 * 3";
const testOp = "5 + 2 * 2 * 2 * 2 * 2 + 5";

function operate(str) {

    const fixed = fixPriority(fixOperators(str));

    const newArr = fixed.map(value => {
        function test(value) {
            if (Array.isArray(value)) {
                if (value[1] === "*") {
                    return test(value[0]) * value[2]
                } else {
                    return test(value[0]) / value[2]
                }
            } else {
                return value;
            }
        }
        return test(value)
    })
    console.log(newArr);
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

console.log(operate(bigOp));

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

btns.forEach(btn => btn.addEventListener("click", displayValue));
equal.addEventListener("click", operate);