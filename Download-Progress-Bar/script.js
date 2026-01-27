const progress = document.querySelector(".progress");
const percentage = document.querySelector(".percentage");
const btn = document.getElementById("downloadBtn");
let count = 1;
let bar = btn.addEventListener("click", () => {
  setInterval(() => {
    if (count <= 99) {
      count++;
      progress.style.width = `${count}%`;
      percentage.textContent = `${count}%`;
    }
  }, 3000 / 100);
});
console.log(progress, btn, percentage);
