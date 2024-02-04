const api = {
  key: "fcc8de7015bbb202209bbf0261babf4c",
  base: "https://api.openweathermap.org/data/2.5/"
}

const searchbox = document.querySelector('.search-box');
const searchButton = document.querySelector('.search-button');

searchbox.addEventListener('keypress', function (event) {
  if (event.keyCode == 13) {
    searchWeather();
  }
});

searchButton.addEventListener('click', searchWeather);

function searchWeather() {
  const query = searchbox.value;
  if (query.trim() !== '') {
    getResults(query);
  } else {
    alert('Please enter a city name.');
  }
}

function getResults(query) {
  fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then(displayResults)
    .catch(error => {
      console.error('Error fetching weather data:', error);
      displayWeatherError();
    });
}

function displayResults(weather) {
  let city = document.querySelector('.location .city');
  city.innerText = `${weather.name}, ${weather.sys.country}`;

  let now = new Date();
  let date = document.querySelector('.location .date');
  date.innerText = dateBuilder(now);

  let temp = document.querySelector('.current .temp');
  temp.innerHTML = `${Math.round(weather.main.temp)}<span>°c</span>`;

  let weather_el = document.querySelector('.current .weather');
  weather_el.innerText = weather.weather[0].main;

  let hilow = document.querySelector('.hi-low');
  hilow.innerText = `${Math.round(weather.main.temp_min)}°c / ${Math.round(weather.main.temp_max)}°c`;
}

function displayWeatherError() {
  let city = document.querySelector('.location .city');
  city.innerText = 'City Not Found';

  let date = document.querySelector('.location .date');
  date.innerText = '';

  let temp = document.querySelector('.current .temp');
  temp.innerHTML = '';

  let weather_el = document.querySelector('.current .weather');
  weather_el.innerText = '';

  let hilow = document.querySelector('.hi-low');
  hilow.innerText = '';
}

function dateBuilder(d) {
  let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  let day = days[d.getDay()];
  let date = d.getDate();
  let month = months[d.getMonth()];
  let year = d.getFullYear();

  return `${day} ${date} ${month} ${year}`;
}
