// Calculator State Object
const calculator = {
  displayValue: "0",
  previousValue: null,
  operation: null,
  shouldResetDisplay: false,

  // Append number to display
  appendNumber(num) {
    // Prevent multiple zeros at start
    if (this.displayValue === "0" && num === "0") {
      return;
    }

    // Reset display after operation
    if (this.shouldResetDisplay) {
      this.displayValue = num;
      this.shouldResetDisplay = false;
    } else {
      // Prevent multiple decimal points
      if (num === "." && this.displayValue.includes(".")) {
        return;
      }
      this.displayValue =
        this.displayValue === "0" ? num : this.displayValue + num;
    }
    this.updateDisplay();
  },

  // Handle operator buttons
  handleOperator(nextOperation) {
    const inputValue = parseFloat(this.displayValue);

    // If we already have an operation, calculate it first
    if (
      this.previousValue !== null &&
      this.operation &&
      !this.shouldResetDisplay
    ) {
      this.calculate();
    } else {
      this.previousValue = inputValue;
    }

    this.operation = nextOperation;
    this.shouldResetDisplay = true;
  },

  // Calculate the result
  calculate() {
    const inputValue = parseFloat(this.displayValue);

    if (this.previousValue === null || this.operation === null) {
      return;
    }

    let result;

    switch (this.operation) {
      case "+":
        result = this.previousValue + inputValue;
        break;
      case "-":
        result = this.previousValue - inputValue;
        break;
      case "*":
        result = this.previousValue * inputValue;
        break;
      case "/":
        // Handle division by zero
        result = inputValue === 0 ? 0 : this.previousValue / inputValue;
        break;
      case "%":
        result = this.previousValue % inputValue;
        break;
      default:
        return;
    }

    // Limit decimal places for cleaner display
    this.displayValue = parseFloat(result.toFixed(10)).toString();
    this.previousValue = null;
    this.operation = null;
    this.shouldResetDisplay = true;
  },

  // Clear everything
  clear() {
    this.displayValue = "0";
    this.previousValue = null;
    this.operation = null;
    this.shouldResetDisplay = false;
    this.updateDisplay();
  },

  // Toggle positive/negative
  toggleSign() {
    const value = parseFloat(this.displayValue);
    this.displayValue = (-value).toString();
    this.updateDisplay();
  },

  // Handle percentage
  handlePercent() {
    const value = parseFloat(this.displayValue);
    this.displayValue = (value / 100).toString();
    this.updateDisplay();
  },

  // Update the display
  updateDisplay() {
    const display = document.querySelector(".display");
    display.value = this.displayValue;
  },
};

// Event Listener Setup
const display = document.querySelector(".display");
const buttons = document.querySelectorAll(".btn");

buttons.forEach((button) => {
  button.addEventListener("click", (e) => {
    const buttonText = button.textContent.trim();

    // Check if button contains an icon (like calculator icon)
    if (buttonText === "" || button.innerHTML.includes("fas")) {
      return;
    }

    // Number buttons (0-9)
    if (buttonText >= "0" && buttonText <= "9") {
      calculator.appendNumber(buttonText);
    }
    // Decimal point
    else if (buttonText === ".") {
      calculator.appendNumber(".");
    }
    // Operators (+, -, *, /)
    else if (
      buttonText === "+" ||
      buttonText === "-" ||
      buttonText === "*" ||
      buttonText === "/"
    ) {
      calculator.handleOperator(buttonText);
    }
    // Percentage
    else if (buttonText === "%") {
      calculator.handlePercent();
    }
    // Plus/Minus toggle
    else if (buttonText === "+/-") {
      calculator.toggleSign();
    }
    // Equals
    else if (buttonText === "=") {
      calculator.calculate();
      calculator.updateDisplay();
    }
    // Clear
    else if (buttonText === "C") {
      calculator.clear();
    }
  });

  // Add visual feedback for button press
  button.addEventListener("mousedown", () => {
    button.style.opacity = "0.8";
  });

  button.addEventListener("mouseup", () => {
    button.style.opacity = "1";
  });

  button.addEventListener("mouseleave", () => {
    button.style.opacity = "1";
  });
});

// Keyboard support
document.addEventListener("keydown", (e) => {
  const key = e.key;

  // Number keys
  if (key >= "0" && key <= "9") {
    calculator.appendNumber(key);
  }
  // Decimal point
  else if (key === ".") {
    calculator.appendNumber(".");
  }
  // Operators
  else if (key === "+") {
    e.preventDefault();
    calculator.handleOperator("+");
  } else if (key === "-") {
    e.preventDefault();
    calculator.handleOperator("-");
  } else if (key === "*") {
    e.preventDefault();
    calculator.handleOperator("*");
  } else if (key === "/") {
    e.preventDefault();
    calculator.handleOperator("/");
  }
  // Equals (Enter or =)
  else if (key === "Enter" || key === "=") {
    e.preventDefault();
    calculator.calculate();
    calculator.updateDisplay();
  }
  // Clear (C key)
  else if (key.toLowerCase() === "c") {
    calculator.clear();
  }
  // Backspace to delete last digit
  else if (key === "Backspace") {
    e.preventDefault();
    calculator.displayValue = calculator.displayValue.slice(0, -1) || "0";
    calculator.updateDisplay();
  }
});

// Initialize display on page load
window.addEventListener("load", () => {
  calculator.updateDisplay();
});
