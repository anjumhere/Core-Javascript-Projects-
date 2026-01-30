const API_KEY = "f4bd0b81caea43e38c492540252412";
const BASE_URL = "https://api.weatherapi.com/v1/current.json";

const searchBtn = document.querySelector(".btn");
const searchBox = document.querySelector(".search");

async function checkWeather(city = "London") {
  try {
    const res = await fetch(`${BASE_URL}?key=${API_KEY}&q=${city}&aqi=yes`);

    const data = await res.json();
    console.log(data);

    document.querySelector(".city").innerHTML = data.location.name;
    document.querySelector(".temp").innerHTML =
      Math.floor(data.current.temp_c) + "°C";
    document.querySelector(".condition").innerHTML =
      data.current.condition.text;

    document.querySelector(".weather-icon").src =
      "https:" + data.current.condition.icon;
  } catch (error) {
    console.error("Error fetching weather:", error);
  }
}

/* Button click */
searchBtn.addEventListener("click", () => {
  checkWeather(searchBox.value);
});

/* Enter key */
searchBox.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    checkWeather(searchBox.value);
  }
});

/* Default load */
checkWeather();
