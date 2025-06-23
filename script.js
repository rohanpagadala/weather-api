const apiKey = "58cd277a8a48d5d2c842f77ab3461c56";

function getWeather() {
  const city = document.getElementById("cityInput").value.trim();
  const resultBox = document.getElementById("weatherResult");

  if (!city) {
    resultBox.innerHTML = "Please enter a city name.";
    resultBox.classList.remove("hidden");
    resultBox.classList.add("visible");
    return;
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      if (data.cod !== 200) {
        throw new Error(data.message);
      }

      const temp = data.main.temp;
      const humidity = data.main.humidity;
      const condition = data.weather[0].description;

      resultBox.innerHTML = `
        ${data.name}, ${data.sys.country}<br>
        Temperature: ${temp} °C<br>
        Humidity: ${humidity}%<br>
        Condition: ${condition}
      `;

      resultBox.classList.remove("hidden");
      setTimeout(() => resultBox.classList.add("visible"), 100);
    })
    .catch(error => {
      console.error("Error:", error.message);
      resultBox.innerHTML = "City not found or request failed.";
      resultBox.classList.remove("hidden");
      resultBox.classList.add("visible");
    });
}
