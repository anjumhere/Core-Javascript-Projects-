const users = [
  {
    name: "Ethan Miller 📸",
    pic: "https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?w=400&h=300&fit=crop",
    bio: "Capturing life's beautiful moments ✨",
  },
  {
    name: "Alex Johnson 🎨",
    pic: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=300&fit=crop",
    bio: "Creating art that inspires 🌈",
  },
  {
    name: "Emily Carter 🏔️",
    pic: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&h=300&fit=crop",
    bio: "Adventure seeker & mountain lover ⛰️",
  },
  {
    name: "Daniel Brooks 🎵",
    pic: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&h=300&fit=crop",
    bio: "Making melodies & spreading joy 🎶",
  },
  {
    name: "Sophia Martinez ✈️",
    pic: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=400&h=300&fit=crop",
    bio: "Wanderlust & globe trotter 🌍",
  },
  {
    name: "Ryan Thompson 💻",
    pic: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop",
    bio: "Turning coffee into code ☕",
  },
  {
    name: "Olivia Brown 🌸",
    pic: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=300&fit=crop",
    bio: "Soft heart, strong mind 💖",
  },
  {
    name: "Jason Wilson 🚀",
    pic: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&h=300&fit=crop",
    bio: "Building ideas that scale 📈",
  },
  {
    name: "Hannah Moore 📚",
    pic: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=300&fit=crop",
    bio: "Books, coffee & deep thoughts ☕",
  },
  {
    name: "Michael Scott 🏋️",
    pic: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=400&h=300&fit=crop",
    bio: "Discipline beats motivation 💪",
  },
  {
    name: "Natalie Green 🎥",
    pic: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=300&fit=crop",
    bio: "Storytelling through visuals 🎬",
  },
  {
    name: "Andrew Lewis 🧠",
    pic: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=400&h=300&fit=crop",
    bio: "Learning one concept at a time 🔍",
  },
];

// Create card element
function createCard(user) {
  const card = document.createElement("div");
  card.className = "card";

  const img = document.createElement("img");
  img.src = user.pic;

  const blurLayer = document.createElement("div");
  blurLayer.className = "blur-layer";

  const content = document.createElement("div");
  content.className = "content";

  const h3 = document.createElement("h3");
  h3.textContent = user.name;

  const p = document.createElement("p");
  p.textContent = user.bio;

  content.appendChild(h3);
  content.appendChild(p);

  card.appendChild(img);
  card.appendChild(blurLayer);
  card.appendChild(content);

  return card;
}

// Initialize carousel
function initCarousel() {
  const cardsContainer = document.getElementById("cardsContainer");

  // Create wrapper for the track
  const track = document.createElement("div");
  track.className = "cards-track";

  // Duplicate users array for infinite scroll effect
  const duplicatedUsers = [...users, ...users];

  // Add all cards to track
  duplicatedUsers.forEach((user) => {
    track.appendChild(createCard(user));
  });

  cardsContainer.appendChild(track);
}

// Search functionality
const inp = document.querySelector("#searchInput");
inp.addEventListener("input", () => {
  const searchValue = inp.value.toLowerCase().trim();

  if (searchValue === "") {
    // If search is empty, show carousel
    const cardsContainer = document.getElementById("cardsContainer");
    cardsContainer.innerHTML = "";
    initCarousel();
  } else {
    // Filter users and show in grid
    let filteredUsers = users.filter((user) => {
      return user.name.toLowerCase().includes(searchValue);
    });

    const cardsContainer = document.getElementById("cardsContainer");
    cardsContainer.innerHTML = "";

    // Remove carousel classes and show as grid
    cardsContainer.style.overflow = "visible";
    cardsContainer.style.display = "grid";
    cardsContainer.style.gridTemplateColumns = "repeat(auto-fill, minmax(220px, 1fr))";
    cardsContainer.style.gap = "20px";
    cardsContainer.style.padding = "0";

    filteredUsers.forEach((user) => {
      cardsContainer.appendChild(createCard(user));
    });
  }
});

// Initialize on page load
initCarousel();
