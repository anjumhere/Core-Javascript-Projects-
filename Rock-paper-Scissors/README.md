# Rock Paper Scissors

A simple browser-based Rock, Paper, Scissors game built with vanilla JavaScript. Play against the computer and track your score in real time.

## Features

- Click-based gameplay — choose Rock, Paper, or Scissors
- Computer opponent with randomized choice
- Live score tracking for both player and computer
- Win/lose/draw result messages after each round
- Dynamic status button that updates based on the outcome (e.g. "You Win", "Computer Wins", "Game Draw")

## Tech Stack

- HTML
- CSS
- Vanilla JavaScript (no frameworks or libraries)

## How It Works

Each choice element (Rock, Paper, Scissors) has a click listener attached. When clicked:

1. The computer's choice is randomly generated.
2. If both choices match, it's a draw.
3. Otherwise, the result is determined using a win-rules lookup (each choice maps to the choice it beats).
4. The score and result message are updated on screen accordingly.

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

## Possible Improvements

- Add a "Play Again" / reset scores button
- Add animations for choice selection and results
- Add a best-of-N match mode

## Author

Built by [Anjum](https://github.com/anjumhere).

## License

This project is open source and available under the [MIT License](LICENSE).
