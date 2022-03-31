var userFormEl = document.querySelector('#user-form');
var getCityEl = document.querySelector('#getCity');
var savedCitiesEl = document.querySelector('#saved-cities');
var displayCityEL = document.querySelector('#cityCurrentdate');
var tempEl = document.querySelector('#temperature');
var windEl = document.querySelector('#wind');
var humidEl = document.querySelector('#humidity');
var uvIndexEl = document.querySelector('#UVI');

var now = moment().format("M/D/YYYY");

var formSubmitHandler = function (event) {
  event.preventDefault();

  var city = getCityEl.value.trim();

  if (city) {
    getLocation(city);

    getCityEl.value = "";
  } else {
    alert("Please enter a city");
  }
};

var getLocation = function (location) {
  var apiUrl = "http://api.openweathermap.org/geo/1.0/direct?q=" + location + "&limit=1&appid=13aa7dd75dc2e83e06a576addbc7a591";

  fetch(apiUrl)
    .then(function (response) {
      if (response.ok) {
        console.log(response);
        response.json().then(function (data) {
          console.log(data);
          displayWeather(data, location);
        });
      } else {
        alert("Error: " + response.statusText);
      }
    })
    .catch(function (error) {
      alert("Unable to get location");
    });
};

var displayWeather = function (weatherData, cityName) {
    var latitude = weatherData[0].lat
    var longitude = weatherData[0].lon

    var apiUrl2 = "https://api.openweathermap.org/data/2.5/onecall?lat=" + latitude + "&lon=" + longitude + "&units=imperial&appid=13aa7dd75dc2e83e06a576addbc7a591";

    // https://api.openweathermap.org/data/2.5/onecall?lat=33.44&lon=-94.04&exclude=hourly,daily&appid={API key}

    displayCityEL.textContent = cityName + " (" + now + ")";

    fetch(apiUrl2)
        .then(function (response2) {
            if (response2.ok) {
                console.log(response2);
                response2.json().then(function (data2) {
                    console.log(data2);
                    tempEl.textContent = "Temp: " + data2.current.temp;
                    windEl.textContent = "Wind: " + data2.current.wind_speed + " MPH";
                    humidEl.textContent = "Humidity: " + data2.current.humidity + "%";
                    uvIndexEl.textContent = "UV Index: " + data2.current.uvi;
                });
            } else {
                alert("Error: " + response2.statusText);
            }
        })
        .catch(function (error) {
            alert("unable to get weather data");
        });
}



userFormEl.addEventListener('submit', formSubmitHandler);