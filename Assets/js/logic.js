const locationForm = document.getElementById("locationForm");
const cityNameEl = document.getElementById("cityName");
const locationBtns = document.getElementById("locationBtns");
const fetchButton = document.getElementById("fetch-button");

function getWeather() {
  const geolocation = JSON.parse(localStorage.getItem("geolocation"));
  console.log(geolocation);
  console.log(geolocation.lon);
  console.log(geolocation.lat);
  const requestUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${geolocation.lat}&lon=${geolocation.lon}&appid=5790fe317b106c7e96164e5dc26f6fd3`;

  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      for (let i = 0; i < data.list[i]; i++) {
        const name = data.list[i].wind.speed;
        console.log(name);
      }
    });
}

locationBtns.addEventListener("click", function (event) {
  event.preventDefault();

  const element = event.target;
  console.log(element);
  const elementLon = element.getAttribute('lon');
  console.log(elementLon);
  const elementLat = element.getAttribute('lat');
  console.log(elementLat);

  const requestUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${elementLat}&lon=${elementLon}&appid=5790fe317b106c7e96164e5dc26f6fd3`;

  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      for (let i = 0; i < data.list[i]; i++) {
        const name = data.list[i].wind.speed;
        console.log(name);
      }
    });
});

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
        console.log(`${data[i].lat} ${data[i].lon}`);
        const geolocation = {
          lon: lon,
          lat: lat,
        };
        console.log(geolocation);
        localStorage.setItem("geolocation", JSON.stringify(geolocation));

        const btn = document.createElement("button");
        btn.textContent = `${cityNameEl.value}`;
        btn.setAttribute("lon", lon);        
        btn.setAttribute("lat", lat);

        locationBtns.appendChild(btn);

        getWeather();
      }
    });
});
