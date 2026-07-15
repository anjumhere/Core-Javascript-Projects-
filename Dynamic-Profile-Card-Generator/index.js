const form = document.querySelector("form");
// scope inputs to the form only — querying the whole document would
// also pick up unrelated <input> elements elsewhere on the page
const inputs = form.querySelectorAll("input");
const main = document.querySelector("#main");
const dot = document.querySelector("#dot");
const ring = document.querySelector("#cursor-ring");
let mouseX = 0;
let mouseY = 0;
let dotX = 0;
let dotY = 0;
let ringX = 0;
let ringY = 0;
let trailTimeout = null;

// Step 2: Track mouse movement
window.addEventListener("mousemove", (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  // Create trail effect every 30ms
  createTrail(e.clientX, e.clientY);
});

// Step 3: Smooth cursor animation using requestAnimationFrame
function animateCursor() {
  // Smooth follow effect with easing
  dotX += (mouseX - dotX) * 0.3;
  dotY += (mouseY - dotY) * 0.3;
  ringX += (mouseX - ringX) * 0.15;
  ringY += (mouseY - ringY) * 0.15;
  // Apply position
  dot.style.left = dotX + "px";
  dot.style.top = dotY + "px";
  ring.style.left = ringX + "px";
  ring.style.top = ringY + "px";
  requestAnimationFrame(animateCursor);
}

// Step 4: Start animation loop
animateCursor();

// Step 5: Create trail particles
function createTrail(x, y) {
  if (trailTimeout) return;
  trailTimeout = setTimeout(() => {
    const trail = document.createElement("div");
    trail.classList.add("cursor-trail");
    trail.style.left = x + "px";
    trail.style.top = y + "px";
    document.body.appendChild(trail);
    // Remove trail after animation
    setTimeout(() => {
      trail.remove();
    }, 600);
    trailTimeout = null;
  }, 30);
}

// Step 6: Add hover effects for interactive elements.
// Using event delegation (listening on document, checking e.target) instead of
// binding to a static NodeList — this way, elements created later (like new
// .card entries added after form submit) are still detected correctly.
// mouseover/mouseout are used here instead of mouseenter/mouseleave because
// the latter don't bubble, so they can't be delegated from a parent element.
const interactiveSelector = 'button, input, a, .card, form, [type="submit"]';
document.addEventListener("mouseover", (e) => {
  if (e.target.closest(interactiveSelector)) {
    document.body.classList.add("cursor-hover");
  }
});
document.addEventListener("mouseout", (e) => {
  if (e.target.closest(interactiveSelector)) {
    document.body.classList.remove("cursor-hover");
  }
});

// Step 7: Add click effect
document.addEventListener("mousedown", () => {
  document.body.classList.add("cursor-click");
});
document.addEventListener("mouseup", () => {
  document.body.classList.remove("cursor-click");
});

// Step 8: Hide cursor when leaving window
document.addEventListener("mouseleave", () => {
  dot.style.opacity = "0";
  ring.style.opacity = "0";
});
document.addEventListener("mouseenter", () => {
  dot.style.opacity = "1";
  ring.style.opacity = "1";
});

// Create a container for the cards
const cardsContainer = document.createElement("div");
cardsContainer.classList.add("cards-container");
main.appendChild(cardsContainer);

form.addEventListener("submit", (e) => {
  e.preventDefault();
  let card = document.createElement("div");
  card.classList.add("card");
  let profile = document.createElement("div");
  profile.classList.add("profile");
  let img = document.createElement("img");
  let h3 = document.createElement("h3");
  let h5 = document.createElement("h5");
  let p = document.createElement("p");

  inputs.forEach((input) => {
    if (input.name === "image") img.setAttribute("src", input.value);
    if (input.name === "name") h3.textContent = input.value;
    if (input.name === "occupation") h5.textContent = input.value;
    if (input.name === "info") p.textContent = input.value;
  });

  profile.appendChild(img);
  card.appendChild(profile);
  card.appendChild(h3);
  card.appendChild(h5);
  card.appendChild(p);
  cardsContainer.appendChild(card); // Append to the container instead of main.

  // form.reset() already clears every field back to its default value,
  // so the manual per-input clearing loop that used to be here was redundant
  form.reset();
});
