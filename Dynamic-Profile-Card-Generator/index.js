const form = document.querySelector("form");
const inputs = document.querySelectorAll("input");
const main = document.querySelector("#main");

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
  // img.setAttribute("src", inputs[0].value);

  let h3 = document.createElement("h3");
  // h3.textContent = inputs[1].value;
  let h5 = document.createElement("h5");
  // h5.textContent = inputs[2].value;
  let p = document.createElement("p");
  // p.textContent = inputs[3].value;
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
  cardsContainer.appendChild(card); // Append to the container instead of main
  inputs.forEach((val) => {
    if (val.type !== "submit") {
      val.value = "";
    }
  });
  form.reset();
});
