function getValue() {
    console.log(this.value);
}

const btns = document.querySelectorAll("button")
btns.forEach(btn => btn.addEventListener("click", getValue));