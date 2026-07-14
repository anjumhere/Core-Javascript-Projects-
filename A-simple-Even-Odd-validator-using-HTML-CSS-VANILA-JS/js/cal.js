const userInput = document.getElementById("user-input");
const addBtn = document.getElementById("btn");
const endVal = document.getElementById("endVal");
const evenBtn = document.getElementById("even");
const oddBtn = document.getElementById("odd");
let oddNumbers = "";
let evenNumbers = "";
let value = "";

// function to check the odd and even
function checker() {
  value = userInput.value.trim();
  // validation : check if the value is a number or is it empty
  if (value === "" || isNaN(value)) {
    endVal.innerHTML = "Please enter a valid number 😊";
    endVal.style.color = "red";
    return;
  }
  // convert input to a number
  const num = Number(value);

  // reject decimals: isNaN() alone lets values like "3.5" through,
  // which then produced a misleading Odd/Even result
  if (!Number.isInteger(num)) {
    endVal.innerHTML = "Please enter a whole number 😊";
    endVal.style.color = "red";
    return;
  }

  // reject negatives: the counting loop below only runs upward from 0,
  // so a negative number silently produced empty Odd/Even lists
  if (num < 0) {
    endVal.innerHTML = "Please enter a non-negative number 😊";
    endVal.style.color = "red";
    return;
  }

  // use num (not value) here so the check is always numeric,
  // instead of relying on implicit string-to-number coercion
  const result = num % 2 === 0 ? "Even" : "Odd";
  endVal.innerHTML = `${value} is an ${result} Number! `;
  endVal.style.color = result === "Even" ? "green" : "red";
  // storying even and odd numbers at once.
  oddNumbers = "";
  evenNumbers = "";
  for (let i = 0; i <= num; i++) {
    if (i % 2 === 0) {
      evenNumbers += i + " ";
    } else {
      oddNumbers += i + " ";
    }
  }
}

evenBtn.addEventListener("click", () => {
  // guard against clicking before a valid number has been submitted
  if (value === "") {
    endVal.innerHTML = "Please enter a number and click Add first 😊";
    endVal.style.color = "red";
    return;
  }
  endVal.innerHTML = ` Even Numbers in ${value}: <br> ${evenNumbers}`;
  endVal.style.color = "green";
});

oddBtn.addEventListener("click", () => {
  // guard against clicking before a valid number has been submitted
  if (value === "") {
    endVal.innerHTML = "Please enter a number and click Add first 😊";
    endVal.style.color = "red";
    return;
  }
  endVal.innerHTML = `Odd Numbers in ${value}: <br> ${oddNumbers} `;
  endVal.style.color = "red";
});

addBtn.addEventListener("click", checker);
