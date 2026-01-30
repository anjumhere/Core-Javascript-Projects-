const choices = document.querySelectorAll(".choice");
const userScoreEl = document.getElementById("userScore");
const compScoreEl = document.getElementById("compScore");
const resultEl = document.querySelector(".result");
const statusBtn = document.getElementById("btn");

let userScore = 0;
let compScore = 0;

// Initial state
statusBtn.textContent = "Start Playing";
resultEl.textContent = "Choose Rock, Paper or Scissors";

// Generate computer choice
const genCompChoice = () => {
  const options = ["rock", "paper", "scissors"];
  const randomIndex = Math.floor(Math.random() * options.length);
  return options[randomIndex];
};

// Draw game
const drawGame = () => {
  resultEl.textContent = "It's a draw!";
  statusBtn.textContent = "Game Draw";
};

// Show winner
const showWinner = (userWins, userChoice, compChoice) => {
  if (userWins) {
    userScore++;
    userScoreEl.textContent = userScore;
    resultEl.textContent = `${userChoice} beats ${compChoice}`;
    statusBtn.textContent = "You Win";
  } else {
    compScore++;
    compScoreEl.textContent = compScore;
    resultEl.textContent = `${compChoice} beats ${userChoice}`;
    statusBtn.textContent = "Computer Wins";
  }
};

// Play game
const playGame = (userChoice) => {
  const compChoice = genCompChoice();

  if (userChoice === compChoice) {
    drawGame();
    return;
  }

  const userWins =
    (userChoice === "rock" && compChoice === "scissors") ||
    (userChoice === "paper" && compChoice === "rock") ||
    (userChoice === "scissors" && compChoice === "paper");

  showWinner(userWins, userChoice, compChoice);
};

// Event listeners
choices.forEach((choice) => {
  choice.addEventListener("click", () => {
    const userChoice = choice.getAttribute("id");
    playGame(userChoice);
  });
});
