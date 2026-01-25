// Step 1: Select DOM elements
const form = document.querySelector("form");
const inputs = document.querySelectorAll("input");
const main = document.querySelector("#main");

// Step 2: Create a container for all cards to organize them properly
const cardsContainer = document.createElement("div");
cardsContainer.classList.add("cards-container");
main.appendChild(cardsContainer);

// Step 3: Add event listener to the form for submit event
form.addEventListener("submit", (e) => {
  // Step 4: Prevent default form submission behavior (page reload)
  e.preventDefault();

  // Step 5: Create main card element
  let card = document.createElement("div");
  card.classList.add("card");

  // Step 6: Create profile picture container
  let profile = document.createElement("div");
  profile.classList.add("profile");

  // Step 7: Create image element for profile picture
  let img = document.createElement("img");
  // Alternative approach: img.setAttribute("src", inputs[0].value);
  // You can also use this to get values from input fields by using indexes manually!

  // Step 8: Create heading element for name
  let h3 = document.createElement("h3");
  // Alternative: h3.textContent = inputs[1].value;  ---------------------------------->>>>>>>>>

  // Step 9: Create subheading element for occupation
  let h5 = document.createElement("h5");
  // Alternative: h5.textContent = inputs[2].value;   --------------------------------->>>>>>>>>

  // Step 10: Create paragraph element for information
  let p = document.createElement("p");
  // Alternative: p.textContent = inputs[3].value;    --------------------------------->>>>>>>>> 

  // Step 11: Loop through all inputs and populate card elements with user data
  inputs.forEach((input) => {
    if (input.name === "image") img.setAttribute("src", input.value);
    if (input.name === "name") h3.textContent = input.value;
    if (input.name === "occupation") h5.textContent = input.value;
    if (input.name === "info") p.textContent = input.value;
  });

  // Step 12: Append image to profile container
  profile.appendChild(img);

  // Step 13: Append all elements to the card
  card.appendChild(profile);
  card.appendChild(h3);
  card.appendChild(h5);
  card.appendChild(p);

  // Step 14: Append the complete card to the cards container (not directly to main)
  cardsContainer.appendChild(card);

  // Step 15: Clear all input fields except submit button
  inputs.forEach((val) => {
    if (val.type !== "submit") {
      val.value = "";
    }
  });

  // Step 16: Reset the entire form (alternative to manual clearing)
  form.reset();
});
