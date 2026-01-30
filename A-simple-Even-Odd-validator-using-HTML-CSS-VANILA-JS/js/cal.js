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
  const result = value % 2 === 0 ? "Even" : "Odd";

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
  endVal.innerHTML = ` Even Numbers in ${value}: <br> ${evenNumbers}`;

  endVal.style.color = "green";
});
oddBtn.addEventListener("click", () => {
  endVal.innerHTML = `Odd Numbers in ${value}: <br> ${oddNumbers} `;
  endVal.style.color = "red";
});

addBtn.addEventListener("click", checker);
