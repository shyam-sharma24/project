const apiKey = '0a5e83b1aa6f4b0cae0133730251404'; // Replace with your API key

const submitButton = document.getElementById('submit-btn');
const locationInput = document.getElementById('location-input');
const currentWeatherDiv = document.getElementById('current-weather');
const forecastWeatherDiv = document.getElementById('forecast-weather');

submitButton.addEventListener('click', () => {
  const location = locationInput.value;
  if (location.trim() === '') {
    alert('Please enter a location');
    return;
  }

  fetchWeather(location);
});

async function fetchWeather(location) {
  try {
    // Fetch current weather data
    const currentWeatherURL = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}&aqi=no`;
    const currentWeatherResponse = await fetch(currentWeatherURL);
    const currentWeatherData = await currentWeatherResponse.json();

    // Fetch forecast weather data
    const forecastWeatherURL = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${location}&days=3`;
    const forecastWeatherResponse = await fetch(forecastWeatherURL);
    const forecastWeatherData = await forecastWeatherResponse.json();

    // Display current weather
    displayCurrentWeather(currentWeatherData);

    // Display forecast weather
    displayForecastWeather(forecastWeatherData);
  } catch (error) {
    console.log('Error:', error);
    alert('An error occurred while fetching weather data');
  }
}

function displayCurrentWeather(data) {
  const location = data.location.name;
  const tempC = data.current.temp_c;
  const condition = data.current.condition.text;
  const icon = data.current.condition.icon;

  currentWeatherDiv.innerHTML = `
    <h3>Current Weather</h3>
    <p><strong>Location:</strong> ${location}</p>
    <p><strong>Temperature:</strong> ${tempC}°C</p>
    <p><strong>Condition:</strong> ${condition}</p>
    <img src="https:${icon}" alt="${condition}">
  `;
}

function displayForecastWeather(data) {
  const forecast = data.forecast.forecastday;
  let forecastHTML = '<h3>Forecast Weather</h3>';

  forecast.forEach(day => {
    const date = day.date;
    const maxTempC = day.day.maxtemp_c;
    const minTempC = day.day.mintemp_c;
    const condition = day.day.condition.text;
    const icon = day.day.condition.icon;

    forecastHTML += `
      <div style="margin-bottom: 10px;">
        <p><strong>${date}</strong></p>
        <p>${condition}</p>
        <img src="https:${icon}" alt="${condition}">
        <p>High: ${maxTempC}°C, Low: ${minTempC}°C</p>
      </div>
    `;
  });

  forecastWeatherDiv.innerHTML = forecastHTML;
}
