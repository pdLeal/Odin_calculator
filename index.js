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

function operate() {
    const valueDisplayed = display.textContent;
    const fixedStr = valueDisplayed.replace(/x|÷/g, match => {
        return match === 'x' ? '*' : '/';
    });
    const splitStr = fixedStr.split(" ");
    console.log(`splitStr: ${splitStr}`);

    const copySplit = [...splitStr];

    const test = splitStr.reduce((prev, curr, index, arr) => {

        //     if (/[*/+-]/.test(curr)) {
        //         switch (curr) {
        //             case "+":
        //                 return prev + Number(arr[index + 1]);
        //                 break;
        //             case "-":
        //                 return prev - Number(arr[index + 1]);
        //                 break;
        //             case "*":
        //                 return prev * Number(arr[index + 1]);
        //                 break;
        //             case "/":
        //                 return prev / Number(arr[index + 1]);
        //         }
        //     } else {
        //         return prev;
        //     }
        // }, Number(splitStr[0])));

        if (/[*/]/.test(curr)) {
            switch (curr) {
                case "*":

                    console.table(copySplit);

                    
                    const prevIndex = copySplit.indexOf(arr[index - 1], index - 1);
                    const currIndex = copySplit.indexOf(curr);
                    const nextIndex = copySplit.indexOf(arr[index + 1], index + 1);

                    copySplit.splice(prevIndex, 2);

                    console.table("Depois: ", copySplit);

                    // const currIndex = copySplit.indexOf(ele => ele === curr);

                    // const prevIndex = copySplit.indexOf(ele => ele === arr[index - 1]);
                    // const nextIndex = copySplit.indexOf(ele => ele === arr[index + 1]);

                    console.log(`prevIndex: ${prevIndex}, currIndex: ${currIndex}, nextIndex: ${nextIndex}`);

                    return Number(prev) * Number(arr[index + 1]);
                    break;
                case "/":
                    return prev / Number(arr[index + 1]);
            }
        } else {
            return prev;
        }
    }, splitStr[0]);

    console.log(`The result is: ${test}`);
}

// function fixPriority(array) {
//     const fixedArray = [];
//     for(let i = 1; i < array.length; i++) {
//         if(i === array.length - 1) break;


//     }

//     return fixedArray;
// }
// console.log(fixPriority(["1", "+", "1", "*", "5"]))
btns.forEach(btn => btn.addEventListener("click", displayValue));
equal.addEventListener("click", operate);