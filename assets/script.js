var userFormEl = document.querySelector('#user-form');
var getCityEl = document.querySelector('#getCity');
var savedCitiesEl = document.querySelector('#saved-cities');
var displayCityEL = document.querySelector('#cityCurrentdate');
var tempEl = document.querySelector('#temperature');
var windEl = document.querySelector('#wind');
var humidEl = document.querySelector('#humidity');
var uvIndexEl = document.querySelector('#UVI');
var clearButton = document.querySelector('#clear-btn');

var savedCity;

var now = moment().format("M/D/YYYY");

displaySaved();

function displaySaved() {

    var searchedCities = JSON.parse(localStorage.getItem("savedCity"));

    if (searchedCities) {
        savedCity = searchedCities;
    } else {
        savedCity = [];
    }
    renderCities();
}

function loadDefault() {
    var city;
    var displayDenver = "Denver";
    var defaultCity = JSON.parse(localStorage.getItem("savedCity"));

    if (defaultCity) {
        city = defaultCity[0];
        getLocation(city);
    } 
    else {
        getLocation(displayDenver);
    }

}

loadDefault();

var formSubmitHandler = function (event) {
  event.preventDefault();

  var city = getCityEl.value.trim();

  var cityExists = false;

  if (city) {
    for (i = 0; i < savedCity.length; i++) {
        if (savedCity[i] === city) {
            cityExists = true;
            alert("This city is already saved");
        }
    }
  } else {
    alert("Please enter a city");
  }
  if (!cityExists) {
    city = city.charAt(0).toUpperCase() + city.slice(1);
    getLocation(city);

    savedCity.push(city);
    getCityEl.value = "";

    saveCity();
    renderCities();
  }
};

function getLocation(location) {
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
    var latitude = weatherData[0].lat;
    var longitude = weatherData[0].lon;

    var apiUrl2 = "https://api.openweathermap.org/data/2.5/onecall?lat=" + latitude + "&lon=" + longitude + "&units=imperial&appid=13aa7dd75dc2e83e06a576addbc7a591";

    fetch(apiUrl2)
        .then(function (response2) {
            if (response2.ok) {
                console.log(response2);
                response2.json().then(function (data2) {
                    console.log(data2);

                    displayCityEL.textContent = cityName + " (" + now + ")";

                    var iconURL = "http://openweathermap.org/img/wn/" + data2.current.weather[0].icon + ".png";
                    $('#wicon-current').attr('src', iconURL);

                    tempEl.textContent = "Temp: " + data2.current.temp + " °F";

                    windEl.textContent = "Wind: " + data2.current.wind_speed + " MPH";

                    humidEl.textContent = "Humidity: " + data2.current.humidity + "%";

                    var highlight = document.createElement("mark");
                    highlight.textContent = data2.current.uvi

                    uvIndexEl.textContent = "UV Index: ";
                    var highlight = document.createElement("mark");
                    highlight.textContent = data2.current.uvi
                    highlight.classList.add("highlight");
                    uvIndexEl.append(highlight);

    

                    if (data2.current.uvi >= 0 && data2.current.uvi <= 2) {
                        highlight.classList.add("favorable");
                    } else if (data2.current.uvi >= 3 && data2.current.uvi <= 7) {
                        highlight.classList.add("moderate");
                    } else {
                        highlight.classList.add("severe");
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

    temp1.textContent = "Temp: " + forecastData.daily[1].temp.day + " °F";

    var icon1URL = "http://openweathermap.org/img/wn/" + forecastData.daily[1].weather[0].icon + ".png";
    $('#wicon1').attr('src', icon1URL);

    wind1.textContent = "Wind: " + forecastData.daily[1].wind_speed + " MPH";

    humid1.textContent = "Humidity: " + forecastData.daily[1].humidity + "%";

    temp2.textContent = "Temp: " + forecastData.daily[2].temp.day + " °F";

    var icon2URL = "http://openweathermap.org/img/wn/" + forecastData.daily[2].weather[0].icon + ".png";
    $('#wicon2').attr('src', icon2URL);

    wind2.textContent = "Wind: " + forecastData.daily[2].wind_speed + " MPH";

    humid2.textContent = "Humidity: " + forecastData.daily[2].humidity + "%";

    temp3.textContent = "Temp: " + forecastData.daily[3].temp.day + " °F";

    var icon3URL = "http://openweathermap.org/img/wn/" + forecastData.daily[3].weather[0].icon + ".png";
    $('#wicon3').attr('src', icon3URL);

    wind3.textContent = "Wind: " + forecastData.daily[3].wind_speed + " MPH";

    humid3.textContent = "Humidity: " + forecastData.daily[3].humidity + "%";

    temp4.textContent = "Temp: " + forecastData.daily[4].temp.day + " °F";

    var icon4URL = "http://openweathermap.org/img/wn/" + forecastData.daily[4].weather[0].icon + ".png";
    $('#wicon4').attr('src', icon4URL);

    wind4.textContent = "Wind: " + forecastData.daily[4].wind_speed + " MPH";

    humid4.textContent = "Humidity: " + forecastData.daily[4].humidity + "%";

    temp5.textContent = "Temp: " + forecastData.daily[5].temp.day + " °F";

    var icon5URL = "http://openweathermap.org/img/wn/" + forecastData.daily[5].weather[0].icon + ".png";
    $('#wicon5').attr('src', icon5URL);

    wind5.textContent = "Wind: " + forecastData.daily[5].wind_speed + " MPH";

    humid5.textContent = "Humidity: " + forecastData.daily[5].humidity + "%";


}

var saveCity = function() {
    localStorage.setItem("savedCity", JSON.stringify(savedCity));
}

function renderCities() {

    savedCitiesEl.innerHTML = "";

    $('#saved-cities').empty();

    
    for (var i = 0; i < savedCity.length; i++) {
      var newButton = document.createElement("button");
      newButton.textContent = savedCity[i];
      newButton.classList.add("btn");
      newButton.setAttribute("data-city", savedCity[i]);
      newButton.setAttribute("type", "submit");

      savedCitiesEl.prepend(newButton);
    }
    
}

renderCities();

var getPastCities = function(event) {
    var city = event.target.getAttribute("data-city");

    if (city) {
        getLocation(city);
    }
}

var clear = function() {
    localStorage.clear();
    location.reload();
}

userFormEl.addEventListener('submit', formSubmitHandler);
savedCitiesEl.addEventListener("click", getPastCities);
clearButton.addEventListener("click", clear);
