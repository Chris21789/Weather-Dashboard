const locationForm = document.getElementById("locationForm");
const cityNameEl = document.getElementById("cityName");
const locationBtns = document.getElementById("locationBtns");
const fetchButton = document.getElementById("fetch-button");

class Geolocation {
  constructor(cityName, lon, lat) {
    (this.cityName = cityName), (this.lon = lon), (this.lat = lat);
  }
}

var now = dayjs();
console.log(now.format('MM/DD/YYYY'));



//pulls weather info using geo info
function getWeather() {
  const geolocation = JSON.parse(localStorage.getItem("geolocation"));
  console.log(geolocation);
  console.log(geolocation.lon);
  console.log(geolocation.lat);

  const currentDay = `https://api.openweathermap.org/data/2.5/weather?lat=${geolocation.lat}&lon=${geolocation.lon}&appid=5790fe317b106c7e96164e5dc26f6fd3&units=imperial`;

  fetch(currentDay)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      console.log(data.weather[0].icon);
      console.log(data.main.temp);
      console.log(data.wind.speed);
      console.log(data.main.humidity);

      document.getElementById(
        "cardCityName"
      ).innerHTML = `${geolocation.cityName} ${now.format('MM/DD/YYYY')} <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png">`;
      document.getElementById(
        "currentTemp"
      ).textContent = `Temp: ${data.main.temp}\u00B0F`;
      document.getElementById(
        "currentWind"
      ).textContent = `Wind: ${data.wind.speed} MPH`;
      document.getElementById(
        "currentHum"
      ).textContent = `Humidity: ${data.main.humidity}%`;
    });

  const forecast = `https://api.openweathermap.org/data/2.5/forecast?lat=${geolocation.lat}&lon=${geolocation.lon}&appid=5790fe317b106c7e96164e5dc26f6fd3&units=imperial`;

  fetch(forecast)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      
      console.log(data.list);

      const fiveDay = [];
      console.log(fiveDay);
      
      // for (let i = 0; i <= data.list.length; i++) {
      //   console.log(data.list);
      //   fiveDay.push(data.list[i]);
      //   console.log(fiveDay);
      // }
    });
}

//on button click pulls button geo info and runs getweather
locationBtns.addEventListener("click", function (event) {
  event.preventDefault();

  const element = event.target;
  console.log(element);

  const geolocation = new Geolocation(
    element.getAttribute("cityName"),
    element.getAttribute("lon"),
    element.getAttribute("lat")
  );
  console.log(geolocation);

  localStorage.setItem("geolocation", JSON.stringify(geolocation));

  getWeather();
});

// Form submission gets geo info from api, creates button and saves geo info to button and runs getweather
locationForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const requestUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${cityNameEl.value}&limit=1&appid=5790fe317b106c7e96164e5dc26f6fd3`;

  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      for (let i = 0; i < data.length; i++) {
        const lon = data[i].lon;
        const lat = data[i].lat;
        const cityName = cityNameEl.value;
        console.log(`${data[i].lat} ${data[i].lon}`);

        const geolocation = new Geolocation(cityName, lon, lat);
        console.log(geolocation);

        localStorage.setItem("geolocation", JSON.stringify(geolocation));

        const btn = document.createElement("button");
        btn.textContent = `${cityNameEl.value}`;
        btn.setAttribute("cityName", cityName);
        btn.setAttribute("lon", lon);
        btn.setAttribute("lat", lat);

        locationBtns.appendChild(btn);

        cityNameEl.value = "";

        getWeather();
      }
    });
});
