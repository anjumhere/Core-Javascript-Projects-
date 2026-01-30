const input = document.getElementById("todo-input");
const btn = document.getElementById("todo-button");
const list = document.getElementById("todo-list");
const pend = document.getElementById("todo-pend");
const compt = document.getElementById("todo-comp");
const allTasks = document.getElementById("total-tasks");
const clearStats = document.getElementById("completed-btn");

const saved = localStorage.getItem("todos");
const todos = saved ? JSON.parse(saved) : [];

// Timer intervals storage
const timerIntervals = {};

// Long press tracking for mobile
let longPressTimer = null;
let currentLongPressElement = null;

function saveTodos() {
  localStorage.setItem("todos", JSON.stringify(todos));
}

function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, "0")}`;
}

// Mobile long-press handling
function handleTouchStart(e, li) {
  // Don't trigger on buttons or inputs
  if (e.target.tagName === "BUTTON" || e.target.tagName === "INPUT") {
    return;
  }

  currentLongPressElement = li;
  longPressTimer = setTimeout(() => {
    li.classList.add("show-tooltip");
  }, 500); // 500ms long press
}

function handleTouchEnd(li) {
  if (longPressTimer) {
    clearTimeout(longPressTimer);
    longPressTimer = null;
  }
}

function handleTouchMove() {
  if (longPressTimer) {
    clearTimeout(longPressTimer);
    longPressTimer = null;
  }
}

// Close tooltip when clicking backdrop
function closeTooltip(e) {
  if (
    e.target.classList.contains("show-tooltip") ||
    e.target.closest(".hover-tooltip")
  ) {
    const openTooltips = document.querySelectorAll(".show-tooltip");
    openTooltips.forEach((el) => el.classList.remove("show-tooltip"));
  }
}

function createTodoNode(todo, index) {
  const li = document.createElement("li");
  li.classList.add("lists");

  // Add touch event listeners for mobile long-press
  li.addEventListener("touchstart", (e) => handleTouchStart(e, li), {
    passive: true,
  });
  li.addEventListener("touchend", () => handleTouchEnd(li), { passive: true });
  li.addEventListener("touchmove", handleTouchMove, { passive: true });
  li.addEventListener("click", (e) => {
    if (li.classList.contains("show-tooltip")) {
      li.classList.remove("show-tooltip");
      e.stopPropagation();
    }
  });

  // Main row with checkbox, text, and buttons
  const mainRow = document.createElement("div");
  mainRow.classList.add("todo-main-row");

  // Checkbox
  const checkbox = document.createElement("input");
  checkbox.classList.add("checkbox");
  checkbox.type = "checkbox";
  checkbox.checked = !!todo.completed;
  checkbox.addEventListener("change", () => {
    todo.completed = checkbox.checked;
    update();
  });

  // Todo text
  const textSpan = document.createElement("span");
  textSpan.textContent = todo.text;
  textSpan.classList.add("todo-text");
  if (todo.completed) {
    textSpan.style.textDecoration = "line-through";
  }

  // Edit button
  const editBtn = document.createElement("button");
  editBtn.textContent = "Edit";
  editBtn.classList.add("edit-button");
  editBtn.addEventListener("click", () => {
    editTodo(index);
  });

  // Delete button
  const delBtn = document.createElement("button");
  delBtn.classList.add("delete-button");
  delBtn.textContent = "Delete";
  delBtn.addEventListener("click", () => {
    if (timerIntervals[index]) {
      clearInterval(timerIntervals[index]);
      delete timerIntervals[index];
    }
    todos.splice(index, 1);
    update();
  });

  mainRow.appendChild(checkbox);
  mainRow.appendChild(textSpan);
  mainRow.appendChild(editBtn);
  mainRow.appendChild(delBtn);

  // Timer section
  const timerSection = document.createElement("div");
  timerSection.classList.add("timer-section");

  if (!todo.timerSet) {
    const timerLabel = document.createElement("span");
    timerLabel.textContent = "Timer (min):";

    const timerInput = document.createElement("input");
    timerInput.type = "number";
    timerInput.classList.add("timer-input");
    timerInput.placeholder = "0";
    timerInput.min = "0";
    timerInput.value = todo.timerMinutes || "";

    const setBtn = document.createElement("button");
    setBtn.textContent = "Set";
    setBtn.classList.add("timer-btn");
    setBtn.addEventListener("click", () => {
      const minutes = parseInt(timerInput.value) || 0;
      if (minutes > 0) {
        todo.timerMinutes = minutes;
        todo.timerSeconds = minutes * 60;
        todo.timerSet = true;
        todo.timerRunning = false;
        update();
      }
    });

    timerSection.appendChild(timerLabel);
    timerSection.appendChild(timerInput);
    timerSection.appendChild(setBtn);
  } else {
    const timerDisplay = document.createElement("span");
    timerDisplay.classList.add("timer-display");
    if (todo.timerRunning) timerDisplay.classList.add("running");
    if (todo.timerSeconds === 0) timerDisplay.classList.add("finished");
    timerDisplay.textContent = formatTime(todo.timerSeconds);

    const startStopBtn = document.createElement("button");
    startStopBtn.classList.add("timer-btn");

    if (todo.timerRunning) {
      startStopBtn.textContent = "Stop";
      startStopBtn.classList.add("stop");
      startStopBtn.addEventListener("click", () => {
        todo.timerRunning = false;
        if (timerIntervals[index]) {
          clearInterval(timerIntervals[index]);
          delete timerIntervals[index];
        }
        update();
      });
    } else {
      startStopBtn.textContent = todo.timerSeconds > 0 ? "Start" : "Reset";
      startStopBtn.addEventListener("click", () => {
        if (todo.timerSeconds === 0) {
          todo.timerSeconds = todo.timerMinutes * 60;
          todo.timerSet = false;
          update();
        } else {
          todo.timerRunning = true;
          update();
          startTimer(index);
        }
      });
    }

    timerSection.appendChild(timerDisplay);
    timerSection.appendChild(startStopBtn);
  }

  // Hover tooltip
  const tooltip = document.createElement("div");
  tooltip.classList.add("hover-tooltip");

  const tooltipTitle = document.createElement("div");
  tooltipTitle.classList.add("tooltip-title");
  tooltipTitle.textContent = "Task Progress";

  const progressContainer = document.createElement("div");
  progressContainer.classList.add("progress-bar-container");

  const progressFill = document.createElement("div");
  progressFill.classList.add("progress-bar-fill");

  // Calculate percentage based on timer
  let percentage = 0;
  if (todo.completed) {
    percentage = 100;
  } else if (todo.timerSet && todo.timerMinutes > 0) {
    const totalSeconds = todo.timerMinutes * 60;
    const elapsedSeconds = totalSeconds - todo.timerSeconds;
    percentage = Math.round((elapsedSeconds / totalSeconds) * 100);
  } else {
    percentage = 0;
  }

  progressFill.style.width = `${percentage}%`;
  progressFill.textContent = `${percentage}%`;

  progressContainer.appendChild(progressFill);

  const tooltipDetails = document.createElement("div");
  tooltipDetails.classList.add("tooltip-details");
  tooltipDetails.innerHTML = `
    <div>Status: ${todo.completed ? "Completed ✓" : "In Progress"}</div>
    ${
      todo.timerSet
        ? `<div>Time Remaining: ${formatTime(todo.timerSeconds)}</div>`
        : "<div>No timer set</div>"
    }
    ${todo.timerSet ? `<div>Total Time: ${todo.timerMinutes} min</div>` : ""}
  `;

  tooltip.appendChild(tooltipTitle);
  tooltip.appendChild(progressContainer);
  tooltip.appendChild(tooltipDetails);

  li.appendChild(mainRow);
  li.appendChild(timerSection);
  li.appendChild(tooltip);

  return li;
}

function startTimer(index) {
  if (timerIntervals[index]) {
    clearInterval(timerIntervals[index]);
  }

  timerIntervals[index] = setInterval(() => {
    const todo = todos[index];
    if (todo && todo.timerRunning && todo.timerSeconds > 0) {
      todo.timerSeconds--;
      saveTodos();

      const li = list.children[index];
      if (li) {
        const timerDisplay = li.querySelector(".timer-display");
        if (timerDisplay) {
          timerDisplay.textContent = formatTime(todo.timerSeconds);
          if (todo.timerSeconds === 0) {
            timerDisplay.classList.add("finished");
            todo.timerRunning = false;
            clearInterval(timerIntervals[index]);
            delete timerIntervals[index];
            update();
          }
        }

        // Update tooltip in real-time
        updateTooltip(li, todo);
      }
    } else {
      clearInterval(timerIntervals[index]);
      delete timerIntervals[index];
    }
  }, 1000);
}

function updateTooltip(li, todo) {
  const tooltip = li.querySelector(".hover-tooltip");
  if (tooltip) {
    // Update progress bar
    const progressFill = tooltip.querySelector(".progress-bar-fill");
    let percentage = 0;
    if (todo.completed) {
      percentage = 100;
    } else if (todo.timerSet && todo.timerMinutes > 0) {
      const totalSeconds = todo.timerMinutes * 60;
      const elapsedSeconds = totalSeconds - todo.timerSeconds;
      percentage = Math.round((elapsedSeconds / totalSeconds) * 100);
    } else {
      percentage = 0;
    }

    if (progressFill) {
      progressFill.style.width = `${percentage}%`;
      progressFill.textContent = `${percentage}%`;
    }

    // Update tooltip details
    const tooltipDetails = tooltip.querySelector(".tooltip-details");
    if (tooltipDetails) {
      tooltipDetails.innerHTML = `
        <div>Status: ${todo.completed ? "Completed ✓" : "In Progress"}</div>
        ${
          todo.timerSet
            ? `<div>Time Remaining: ${formatTime(todo.timerSeconds)}</div>`
            : "<div>No timer set</div>"
        }
        ${
          todo.timerSet ? `<div>Total Time: ${todo.timerMinutes} min</div>` : ""
        }
      `;
    }
  }
}

function editTodo(index) {
  const li = list.children[index];
  const todo = todos[index];

  const inputElem = document.createElement("input");
  inputElem.type = "text";
  inputElem.value = todo.text;
  inputElem.classList.add("edit-input");

  li.querySelector(".todo-text").replaceWith(inputElem);
  inputElem.focus();

  inputElem.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      const newText = inputElem.value.trim();
      if (newText) {
        todo.text = newText;
        update();
      }
    }

    if (e.key === "Escape") {
      render();
    }
  });
}

function render() {
  list.innerHTML = "";

  todos.forEach((todo, index) => {
    const node = createTodoNode(todo, index);
    list.appendChild(node);

    if (todo.timerRunning) {
      startTimer(index);
    }
  });
}

function progress() {
  const completed = todos.filter((todo) => todo.completed).length;
  const pending = todos.length - completed;

  document.getElementById("todo-pend").textContent = pending;
  document.getElementById("todo-comp").textContent = completed;
  document.getElementById("total-tasks").textContent = todos.length;
}

function addTodo() {
  const text = input.value.trim();
  if (text === "") {
    return;
  }
  todos.push({
    text: text,
    completed: false,
    timerSet: false,
    timerRunning: false,
    timerMinutes: 0,
    timerSeconds: 0,
  });
  input.value = "";
  update();
}

btn.addEventListener("click", addTodo);
input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    addTodo();
  }
});

function update() {
  saveTodos();
  render();
  progress();
}

clearStats.addEventListener("click", () => {
  Object.keys(timerIntervals).forEach((key) => {
    clearInterval(timerIntervals[key]);
  });
  todos.length = 0;
  localStorage.removeItem("todos");
  update();
});

update();
