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
                    if (data2.current.uvi >= 0 && data2.current.uvi <= 2) {
                        uvIndexEl.classList.add("favorable");
                    } else if (data2.current.uvi >= 3 && data2.current.uvi <= 7) {
                        uvIndexEl.classList.add("moderate");
                    } else {
                        uvIndexEl.classList.add("severe");
                    }
                    displayForecast(data2);
                });
            } else {
                alert("Error: " + response2.statusText);
            }
        })
        .catch(function (error) {
            alert("unable to get weather data");
        });
}

var displayForecast = function (forecastData) {

    var temp1 = document.getElementById("card1-temp");
    var wind1 = document.getElementById("card1-wind");
    var humid1 = document.getElementById("card1-humidity");

    var temp2 = document.getElementById("card2-temp");
    var wind2 = document.getElementById("card2-wind");
    var humid2 = document.getElementById("card2-humidity");

    var temp3 = document.getElementById("card3-temp");
    var wind3 = document.getElementById("card3-wind");
    var humid3 = document.getElementById("card3-humidity");

    var temp4 = document.getElementById("card4-temp");
    var wind4 = document.getElementById("card4-wind");
    var humid4 = document.getElementById("card4-humidity");

    var temp5 = document.getElementById("card5-temp");
    var wind5 = document.getElementById("card5-wind");
    var humid5 = document.getElementById("card5-humidity");

    startdate = now;

    var getDate = moment(startdate, "M/D/YYYY").add(1, 'd');
    $('#date1').text(getDate.format("M/D/YYYY"));

    var getDate2 = moment(startdate, "M/D/YYYY").add(2, 'd');
    $('#date2').text(getDate2.format("M/D/YYYY"));
    
    var getDate3 = moment(startdate, "M/D/YYYY").add(3, 'd');
    $('#date3').text(getDate3.format("M/D/YYYY"));

    var getDate4 = moment(startdate, "M/D/YYYY").add(4, 'd');
    $('#date4').text(getDate4.format("M/D/YYYY"));

    var getDate5 = moment(startdate, "M/D/YYYY").add(5, 'd');
    $('#date5').text(getDate5.format("M/D/YYYY"));

    temp1.textContent = "Temp: " + forecastData.daily[1].temp.day;

    wind1.textContent = "Wind: " + forecastData.daily[1].wind_speed + " MPH";

    humid1.textContent = "Humidity: " + forecastData.daily[1].humidity + "%";

    temp2.textContent = "Temp: " + forecastData.daily[2].temp.day;

    wind2.textContent = "Wind: " + forecastData.daily[2].wind_speed + " MPH";

    humid2.textContent = "Humidity: " + forecastData.daily[2].humidity + "%";

    temp3.textContent = "Temp: " + forecastData.daily[3].temp.day;

    wind3.textContent = "Wind: " + forecastData.daily[3].wind_speed + " MPH";

    humid3.textContent = "Humidity: " + forecastData.daily[3].humidity + "%";

    temp4.textContent = "Temp: " + forecastData.daily[4].temp.day;

    wind4.textContent = "Wind: " + forecastData.daily[4].wind_speed + " MPH";

    humid4.textContent = "Humidity: " + forecastData.daily[4].humidity + "%";

    temp5.textContent = "Temp: " + forecastData.daily[5].temp.day;

    wind5.textContent = "Wind: " + forecastData.daily[5].wind_speed + " MPH";

    humid5.textContent = "Humidity: " + forecastData.daily[5].humidity + "%";


}



userFormEl.addEventListener('submit', formSubmitHandler);