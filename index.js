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

// function operate() {

//     
//     console.log("splitStr antes: ", splitStr);

//     const copySplit = [...splitStr];

//     // const test = splitStr.reduce((prev, curr, index, arr) => {

//     //     //     if (/[*/+-]/.test(curr)) {
//     //     //         switch (curr) {
//     //     //             case "+":
//     //     //                 return prev + Number(arr[index + 1]);
//     //     //                 break;
//     //     //             case "-":
//     //     //                 return prev - Number(arr[index + 1]);
//     //     //                 break;
//     //     //             case "*":
//     //     //                 return prev * Number(arr[index + 1]);
//     //     //                 break;
//     //     //             case "/":
//     //     //                 return prev / Number(arr[index + 1]);
//     //     //         }
//     //     //     } else {
//     //     //         return prev;
//     //     //     }
//     //     // }, Number(splitStr[0])));

//     //     if (/[*/]/.test(curr)) {
//     //         switch (curr) {
//     //             case "*":

//     //                 console.table(copySplit);

//     //                 const currIndex = copySplit.indexOf(curr);

//     //                 const prevIndex = currIndex - 1;
//     //                 const nextIndex = currIndex + 1;

//     //                 console.table("Depois: ", copySplit);

//     //                 console.log(`prevIndex: ${prevIndex}, currIndex: ${currIndex}, nextIndex: ${nextIndex}`);

//     //                 return Number(prev) * Number(arr[index + 1]);
//     //                 break;
//     //             case "/":
//     //                 return prev / Number(arr[index + 1]);
//     //         }
//     //     } else {
//     //         return prev;
//     //     }
//     // }, splitStr[0]);

//     // console.log(`The result is: ${test}`);
// }

function fixOperators(str) {
    const valueDisplayed = display.textContent; // retirar parametros e trocar por valueDisplayed após testes
    const fixedStr = str.replace(/x|÷/g, match => {
        return match === 'x' ? '*' : '/';
    });
    const splitStr = fixedStr.split(" ");

    return splitStr;
}

function fixPriority(array) {
    const copyArray = [...array];

    if (!array.includes("*") && !array.includes("/")) return copyArray;

    const indexOfMult = array.indexOf("*");
    const indexOfDiv = array.indexOf("/");

    if ((indexOfMult < indexOfDiv || indexOfDiv === -1) && indexOfMult >= 0) {
        const splitSlice = array.slice(indexOfMult - 1, indexOfMult + 2);

        copyArray.splice(indexOfMult - 1, 3, splitSlice);


        return [...fixPriority(copyArray)]
    } else if ((indexOfMult > indexOfDiv || indexOfMulti === -1) && indexOfDiv>= 0) {
        const splitSlice = array.slice(indexOfDiv - 1, indexOfDiv + 2);

        copyArray.splice(indexOfDiv - 1, 3, splitSlice);


        return [...fixPriority(copyArray)]
    }
}

// console.log(fixOperators("8 * 3 - 1 + 2 * 5 / 2 - 4 * 3"));

console.log(fixPriority(fixOperators("8 * 3 - 1 + 2 * 5 / 2 - 4 * 3")));  // 16

btns.forEach(btn => btn.addEventListener("click", displayValue));
// equal.addEventListener("click", operate);