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
  {
    name: "Lily Anderson 🌙",
    pic: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=400&h=300&fit=crop",
    bio: "Dreaming under city lights ✨",
  },
  {
    name: "Chris Walker 🛠️",
    pic: "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?w=400&h=300&fit=crop",
    bio: "Fixing problems, one line at a time 🔧",
  },
  {
    name: "Grace Hall 🎤",
    pic: "https://images.unsplash.com/photo-1520813792240-56fc4a3765a7?w=400&h=300&fit=crop",
    bio: "Words have power 🗣️",
  },
  {
    name: "Kevin Adams 🏍️",
    pic: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&h=300&fit=crop",
    bio: "Life is better on two wheels 🛣️",
  },

  {
    name: "Noah Parker 🌌",
    pic: "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=400&h=300&fit=crop",
    bio: "Exploring ideas beyond limits 🌠",
  },
  {
    name: "Avery Collins 🖌️",
    pic: "https://images.unsplash.com/photo-1542206395-9feb3edaa68d?w=400&h=300&fit=crop",
    bio: "Art is my safe place 🎨",
  },
  {
    name: "Justin Rivera 📊",
    pic: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=400&h=300&fit=crop",
    bio: "Data tells the real story 📈",
  },
  {
    name: "Chloe Bennett 🌿",
    pic: "https://images.unsplash.com/photo-1520813792240-56fc4a3765a7?w=400&h=300&fit=crop",
    bio: "Peace over chaos 🍃",
  },
  {
    name: "Logan Turner 🎮",
    pic: "https://images.unsplash.com/photo-1511367461989-f85a21fda167?w=400&h=300&fit=crop",
    bio: "Gaming is not a hobby, it's life 🎮",
  },
  {
    name: "Madison Wright 💄",
    pic: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&h=300&fit=crop",
    bio: "Confidence is the best makeup 💋",
  },
  {
    name: "Brandon Hughes 🧭",
    pic: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=400&h=300&fit=crop",
    bio: "Finding my own direction 🧭",
  },
  {
    name: "Isabella Foster 🌺",
    pic: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=400&h=300&fit=crop",
    bio: "Grace in everything 🌸",
  },
];

// show all users
// filter images upon searching
// show filtered images upon searching
function showUser(arr) {
  arr.forEach(function (user) {
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

    // To add it to the container:
    document.getElementById("cardsContainer").appendChild(card);
  });
}
showUser(users);

const inp = document.querySelector("#searchInput");
inp.addEventListener("input", () => {
  let newUsers = users.filter((user) => {
    return user.name.toLowerCase().startsWith(inp.value.toLowerCase());
  });

  document.getElementById("cardsContainer").innerHTML = "";
  showUser(newUsers);
});

console.log(inp);
