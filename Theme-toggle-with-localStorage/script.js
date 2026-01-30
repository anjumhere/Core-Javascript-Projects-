// Select DOM elements
let body = document.querySelector("body");
let btn = document.getElementById("toggle-btn");

// Check OS/system theme preference
const themeCheck = window.matchMedia("(prefers-color-scheme: dark)");

console.log("Saved theme:", localStorage.getItem("theme"));

// Check if user has a saved theme preference
if (localStorage.getItem("theme")) {
  // Apply saved theme from localStorage
  body.classList.add(localStorage.getItem("theme"));
  console.log("Applied saved theme:", localStorage.getItem("theme"));
} else {
  // No saved preference - apply OS theme
  applyTheme(themeCheck);
  // Listen for OS theme changes in real-time
  themeCheck.addEventListener("change", applyTheme);
  console.log("No saved theme, using OS theme");
}

// Apply theme based on OS preference
function applyTheme(e) {
  if (e.matches) {
    // OS prefers dark mode
    body.classList.add("dark");
    body.classList.remove("light");
  } else {
    // OS prefers light mode
    body.classList.add("light");
    body.classList.remove("dark");
  }
}

// Toggle theme on button click
btn.addEventListener("click", () => {
  // Switch between dark and light classes
  body.classList.toggle("dark");
  body.classList.toggle("light");

  // Save user's theme preference to localStorage
  if (body.classList.contains("dark")) {
    localStorage.setItem("theme", "dark");
    console.log("Saved dark theme");
  } else {
    localStorage.setItem("theme", "light");
    console.log("Saved light theme");
  }

  // Stop following OS theme changes - user has set manual preference
  themeCheck.removeEventListener("change", applyTheme);
});
