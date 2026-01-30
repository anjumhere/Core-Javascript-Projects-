const passBox = document.getElementById("passbox");
const inputSlider = document.getElementById("inputSlider");
const sliderValue = document.getElementById("sliderValue");

const lowercaseEl = document.getElementById("lowerCase");
const uppercaseEl = document.getElementById("upperCase");
const numbersEl = document.getElementById("Numbers");
const symbolsEl = document.getElementById("Symbols");
const genBtn = document.getElementById("genBtn");
const copyIcon = document.getElementById("copyIcon");

// Printing the slider value
sliderValue.textContent = inputSlider.value;
inputSlider.addEventListener("input", () => {
  sliderValue.textContent = inputSlider.value;
});

// creating generate password function
let upperChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
let lowerChars = "abcdefghijklmnopqrstuvwxyz";
let allNumbers = "0123456789";
let allSymbols = "!@#$%^&*()_-+=<>?";
genBtn.addEventListener("click", () => {
  passBox.value = generatePassword();
});
function generatePassword() {
  let genPassword = "";
  let allChars = "";
  allChars += lowercaseEl.checked ? lowerChars : "";
  allChars += uppercaseEl.checked ? upperChars : "";
  allChars += numbersEl.checked ? allNumbers : "";
  allChars += symbolsEl.checked ? allSymbols : "";
  if (!allChars) {
    alert("Please select at least one character type!");
    return "";
  }
  for (let i = 0; i < inputSlider.value; i++) {
    genPassword += allChars.charAt(Math.floor(Math.random() * allChars.length));
  }

  return genPassword;
}

copyIcon.addEventListener("click", async () => {
  if (!passBox.value) {
    alert("Generate a password first!");
    return;
  }
  try {
    await navigator.clipboard.writeText(passBox.value);
    copyIcon.textContent = "check"; // temporary visual feedback
    setTimeout(() => (copyIcon.textContent = "content_copy"), 1000);
  } catch (err) {
    console.error("Failed to copy:", err);
  }
});
