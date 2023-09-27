import { getTheme } from "./theme.js";

getTheme();

let previousNumber = "", currentNumber = "";
let result = 0;
let operation;
let done = false;

const keypad = document.querySelector(".calculator__keys");
const resultEl = document.querySelector(".calculator__screen p");
const deleteBtn = document.getElementById("btn-delete");
const resetBtn = document.getElementById("btn-reset");

document.addEventListener("DOMContentLoaded", () => {
    keypad.addEventListener("click", e => {
        const clickedBtn = e.target;
    
        if(clickedBtn.classList.contains("key--number"))
        {
            appendNumber(clickedBtn.textContent);
            write();
        }
        else if(clickedBtn.classList.contains("key--operation")){
            chooseOperation(clickedBtn.textContent);
        }
    
        if(clickedBtn.classList.contains("key--equals")){
            compute();
            done = true;
            resultEl.textContent = result.toString();
        }
    });
    
    deleteBtn.addEventListener("click", backspace);
    resetBtn.addEventListener("click", reset);
})


const appendNumber = number => {
    if(!done){
        if(number === "."){
            if(currentNumber.includes("."))
                return; 
            
            if(currentNumber === ""){
                currentNumber = "0" + number;
                return;
            }
        }
        else if(number === "0" && currentNumber === "0")
            return;
          
        currentNumber = currentNumber.toString() + number;
    }
    else{
        previousNumber = "0";
        currentNumber = "0" + number.toString()
    }
}

const chooseOperation = op => {
    if(currentNumber === "")    
        currentNumber = "0";

    if(previousNumber !== "")
        compute();
    
    operation = op;
    previousNumber = currentNumber;
    currentNumber = "";
    done = false;
    write();
}

const compute = () => {
    const prev = Number(previousNumber);
    const current = Number(currentNumber);

    switch(operation){
        case "+":
            result = prev + current;
            break;
        case "-":
            result = prev - current;
            break;
        case "x":
            result = prev * current;
            break;
        case "/":
            result = prev / current;
            break;
        default:
            result = current;
            break;
    }

    if(Math.abs(result) == Infinity)
        result = 0;
    
    currentNumber = result.toString();
    operation = undefined;
    previousNumber = "";
    done = false;
}

const write = () => {
    done = false;
    
    if(operation){
        resultEl.textContent = `${Number(previousNumber)} ${operation} ${currentNumber}`;
        return;
    }

    resultEl.textContent = (Number(currentNumber));
    
}

const backspace = () => {
    if(Number(currentNumber) != 0)
        currentNumber = currentNumber.slice(0, -1);

    write();
}

const reset = () => {
    currentNumber = "";
    previousNumber = "";
    operation = undefined;
    write();
}

