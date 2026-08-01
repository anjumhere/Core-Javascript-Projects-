# Simple Calculator

A clean, responsive calculator built with vanilla JavaScript. Supports both mouse/touch and keyboard input.

## Features

- Basic arithmetic operations: addition, subtraction, multiplication, division, and percentage
- Decimal point support with duplicate-decimal prevention
- Positive/negative toggle (+/-)
- Clear (C) button to reset the calculator
- Keyboard support:
  - `0-9` — enter numbers
  - `.` — decimal point
  - `+` `-` `*` `/` — operators
  - `Enter` or `=` — calculate result
  - `Backspace` — delete last digit
  - `C` — clear
- Visual feedback on button press
- Chained operations (e.g. `5 + 3 + 2 =`)
- Result formatting (trims long decimals for a cleaner display)

## Tech Stack

- HTML
- CSS
- Vanilla JavaScript (no frameworks or libraries)

## How It Works

The calculator logic is managed through a single `calculator` state object that tracks:

- `displayValue` — the current number shown on screen
- `previousValue` — the stored value before an operator is applied
- `operation` — the currently selected operator
- `shouldResetDisplay` — a flag to know when the next digit should start a fresh input

Button clicks and key presses are both routed through the same core methods (`appendNumber`, `handleOperator`, `calculate`, `clear`, `toggleSign`, `handlePercent`), keeping mouse and keyboard behavior consistent.

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/anjumhere/<repo-name>.git
   ```
2. Open `index.html` in your browser — no build step or dependencies required.

## Project Structure

```
.
├── index.html
├── style.css
├── script.js
└── README.md
```

## Known Limitations

- Dividing by zero currently returns `0` instead of an error message (a fix for this is planned).

## Author

Built by [Anjum](https://github.com/anjumhere).

## License

This project is open source and available under the [MIT License](LICENSE).
