// call the form and set to new variable
var userFormEl = document.querySelector('#user-form');
// call the input text and set to new variable
var getCityEl = document.querySelector('#getCity');
// call the search history div and set to new variable
var savedCitiesEl = document.querySelector('#saved-cities');
// call the current date div and set to new variable
var displayCityEL = document.querySelector('#cityCurrentdate');
// call the current temperature div and set to new variable
var tempEl = document.querySelector('#temperature');
// call the current wind speed div and set to new variable
var windEl = document.querySelector('#wind');
// call the current humidity div and set to new variable
var humidEl = document.querySelector('#humidity');
// call the current UV Index div and set to new variable
var uvIndexEl = document.querySelector('#UVI');
// call the clear button and set to new variable
var clearButton = document.querySelector('#clear-btn');

// variable for savedCity that will contain past user searches
var savedCity;

// today's date
var now = moment().format("M/D/YYYY");

// call saved city searches
displaySaved();

// function to display the search history
function displaySaved() {

    // get the savedCity value parses the JSON string as object. save as new variable
    var searchedCities = JSON.parse(localStorage.getItem("savedCity"));

    // if the searchedCities varible has a value then save savedCity variable as searchedCities
    if (searchedCities) {
        savedCity = searchedCities;
        // else set savedCity as an empty array
    } else {
        savedCity = [];
    }
    // call renderCities function
    renderCities();
}

// function to display first searched city, otherwise display Denver's weather forecast
function loadDefault() {
    // variable for first city
    var city;
    // display set to Denver
    var displayDenver = "Denver";
    // get the savedCity array and parse as object. set to new variable
    var defaultCity = JSON.parse(localStorage.getItem("savedCity"));

    // if the default city variable has a value then call the getLocation function for the first city in the array
    if (defaultCity) {
        city = defaultCity[0];
        getLocation(city);
    } 
    // else display Denver's forecast
    else {
        getLocation(displayDenver);
    }

}

// call loadDefault function
loadDefault();

// form submit function to get the user's input and pass to the function to get coordinates and weather
var formSubmitHandler = function (event) {
    // The preventDefault() method cancels the event if it is cancelable, meaning that the default action that belongs to the event will not occur
  event.preventDefault();

    // place the user's input value into a new variable
  var city = getCityEl.value.trim();

    // set new variable cityExists to false
  var cityExists = false;

    // if city has value then check to see if it is in the search history and alert the user. Set cityExists to true
  if (city) {
    for (i = 0; i < savedCity.length; i++) {
        if (savedCity[i] === city) {
            cityExists = true;
            alert("This city is already saved");
        }
    }
    // else alert the user to enter a city if they try to submit an empty input
  } else {
    alert("Please enter a city");
  }
    // if the user's city is not in the search history
  if (!cityExists) {
    //   then capitalize the first letter of the user input
    city = city.charAt(0).toUpperCase() + city.slice(1);
    // and call the getLocation function to get the city's coordinates
    getLocation(city);

    if (city) {
      // push the new city into the savedCity array
      savedCity.push(city);
      // clear the input value
      getCityEl.value = "";
      // call saveCity function
      saveCity();
      // call renderCities function
      renderCities();
    }
  }
};

// function to call the openweathermap api and get the city's coordinates
function getLocation(location) {
    // save the api url to a new variable
  var apiUrl = "http://api.openweathermap.org/geo/1.0/direct?q=" + location + "&limit=1&appid=13aa7dd75dc2e83e06a576addbc7a591";

    // fetch the openweathermap api
  fetch(apiUrl)
        // function to check if the response is good and call the displayWeather function, passing the api data and city location variables
    .then(function (response) {
      if (response.ok) {
        console.log(response);
        response.json().then(function (data) {
          console.log(data);
          displayWeather(data, location);
        });
        // if theres an error fetching the api then alert the response to the user
      } else {
        alert("Error: " + response.statusText);
      }
    })
    // if there is an error then alert the user
    .catch(function (error) {
      alert("Unable to get location");
    });
};

// function to display the city's weaher for today
var displayWeather = function (weatherData, cityName) {
    // get the latitude and longitude coordinates and set to new varibales
    var latitude = weatherData[0].lat;
    var longitude = weatherData[0].lon;

    // place the openweathermap url for weather into a new variable
    var apiUrl2 = "https://api.openweathermap.org/data/2.5/onecall?lat=" + latitude + "&lon=" + longitude + "&units=imperial&appid=13aa7dd75dc2e83e06a576addbc7a591";

    // fetch the api
    fetch(apiUrl2)
        // check the response from the openweathermap server is good and get the data
        .then(function (response2) {
            if (response2.ok) {
                console.log(response2);
                response2.json().then(function (data2) {
                    console.log(data2);

                    // display the city and today's date 
                    displayCityEL.textContent = cityName + " (" + now + ")";

                    // get the current weather icon and display
                    var iconURL = "http://openweathermap.org/img/wn/" + data2.current.weather[0].icon + ".png";
                    $('#wicon-current').attr('src', iconURL);

                    // get the current temperature and set text content
                    tempEl.textContent = "Temp: " + data2.current.temp + " °F";

                    // get the current wind speed and set text content
                    windEl.textContent = "Wind: " + data2.current.wind_speed + " MPH";

                    // get the current humidity and set text content
                    humidEl.textContent = "Humidity: " + data2.current.humidity + "%";

                    // add text to uvIndex div
                    uvIndexEl.textContent = "UV Index: ";
                    // create a new mark tag and set to new variable
                    var highlight = document.createElement("mark");
                    // get the uv index data and set to the highlight text
                    highlight.textContent = data2.current.uvi;
                    // add class highlight
                    highlight.classList.add("highlight");
                    // append highlight element to the uv index element
                    uvIndexEl.append(highlight);

    

                    // if the uv index is greater than or equal 0 and is also less than or equal to 2
                    if (data2.current.uvi >= 0 && data2.current.uvi <= 2) {
                        // then add the favorable class to highlight
                        highlight.classList.add("favorable");
                        // else if the uv index is greater than or equal to 3 and also less than or equal to 7
                    } else if (data2.current.uvi >= 3 && data2.current.uvi <= 7) {
                        // then add the moderate class to highlight
                        highlight.classList.add("moderate");
                        // else add the severe class to highlight
                    } else {
                        highlight.classList.add("severe");
                    }

                    // call the displayForecast and pass the data
                    displayForecast(data2);
                });
                // if theres an error fetching the api then alert the response to the user
            } else {
                alert("Error: " + response2.statusText);
            }
        })
        // if there is an error then alert the user
        .catch(function (error) {
            alert("unable to get weather data");
        });
}

// function to display the 5 day forecast for the city searched
var displayForecast = function (forecastData) {

    // weather variables for day 1
    var temp1 = document.getElementById("card1-temp");
    var wind1 = document.getElementById("card1-wind");
    var humid1 = document.getElementById("card1-humidity");

    // weather variables for day 2
    var temp2 = document.getElementById("card2-temp");
    var wind2 = document.getElementById("card2-wind");
    var humid2 = document.getElementById("card2-humidity");

    // weather variables for day 3
    var temp3 = document.getElementById("card3-temp");
    var wind3 = document.getElementById("card3-wind");
    var humid3 = document.getElementById("card3-humidity");

    // weather variables for day 4
    var temp4 = document.getElementById("card4-temp");
    var wind4 = document.getElementById("card4-wind");
    var humid4 = document.getElementById("card4-humidity");

    // weather variables for day 5
    var temp5 = document.getElementById("card5-temp");
    var wind5 = document.getElementById("card5-wind");
    var humid5 = document.getElementById("card5-humidity");

    // set the start date equal to today's date
    startdate = now;

    // get the day 1 forecast by adding 1 day to the startdate
    var getDate = moment(startdate, "M/D/YYYY").add(1, 'd');
    $('#date1').text(getDate.format("M/D/YYYY"));

    // get the day 2 forecast by adding 2 days to the startdate
    var getDate2 = moment(startdate, "M/D/YYYY").add(2, 'd');
    $('#date2').text(getDate2.format("M/D/YYYY"));
    
    // get the day 3 forecast by adding 3 days to the startdate
    var getDate3 = moment(startdate, "M/D/YYYY").add(3, 'd');
    $('#date3').text(getDate3.format("M/D/YYYY"));

    // get the day 4 forecast by adding 4 days to the startdate
    var getDate4 = moment(startdate, "M/D/YYYY").add(4, 'd');
    $('#date4').text(getDate4.format("M/D/YYYY"));

    // get the day 5 forecast by adding 5 days to the startdate
    var getDate5 = moment(startdate, "M/D/YYYY").add(5, 'd');
    $('#date5').text(getDate5.format("M/D/YYYY"));

    // Get day 1 weather data and display text and icon
    temp1.textContent = "Temp: " + forecastData.daily[1].temp.day + " °F";

    var icon1URL = "http://openweathermap.org/img/wn/" + forecastData.daily[1].weather[0].icon + ".png";
    $('#wicon1').attr('src', icon1URL);

    wind1.textContent = "Wind: " + forecastData.daily[1].wind_speed + " MPH";

    humid1.textContent = "Humidity: " + forecastData.daily[1].humidity + "%";

    // Get day 2 weather data and display text and icon
    temp2.textContent = "Temp: " + forecastData.daily[2].temp.day + " °F";

    var icon2URL = "http://openweathermap.org/img/wn/" + forecastData.daily[2].weather[0].icon + ".png";
    $('#wicon2').attr('src', icon2URL);

    wind2.textContent = "Wind: " + forecastData.daily[2].wind_speed + " MPH";

    humid2.textContent = "Humidity: " + forecastData.daily[2].humidity + "%";

    // Get day 3 weather data and display text and icon
    temp3.textContent = "Temp: " + forecastData.daily[3].temp.day + " °F";

    var icon3URL = "http://openweathermap.org/img/wn/" + forecastData.daily[3].weather[0].icon + ".png";
    $('#wicon3').attr('src', icon3URL);

    wind3.textContent = "Wind: " + forecastData.daily[3].wind_speed + " MPH";

    humid3.textContent = "Humidity: " + forecastData.daily[3].humidity + "%";

    // Get day 4 weather data and display text and icon
    temp4.textContent = "Temp: " + forecastData.daily[4].temp.day + " °F";

    var icon4URL = "http://openweathermap.org/img/wn/" + forecastData.daily[4].weather[0].icon + ".png";
    $('#wicon4').attr('src', icon4URL);

    wind4.textContent = "Wind: " + forecastData.daily[4].wind_speed + " MPH";

    humid4.textContent = "Humidity: " + forecastData.daily[4].humidity + "%";

    // Get day 5 weather data and display text and icon
    temp5.textContent = "Temp: " + forecastData.daily[5].temp.day + " °F";

    var icon5URL = "http://openweathermap.org/img/wn/" + forecastData.daily[5].weather[0].icon + ".png";
    $('#wicon5').attr('src', icon5URL);

    wind5.textContent = "Wind: " + forecastData.daily[5].wind_speed + " MPH";

    humid5.textContent = "Humidity: " + forecastData.daily[5].humidity + "%";


}

// function to save the searched city to local storage
var saveCity = function() {
    localStorage.setItem("savedCity", JSON.stringify(savedCity));
}

// function to render the search history
function renderCities() {

    // clear the savedCity element
    savedCitiesEl.innerHTML = "";

    // empty the savedCity element before displaying the next city on the list
    $('#saved-cities').empty();

    // for loop to create a new button for each city in the savedCity array
    for (var i = 0; i < savedCity.length; i++) {
      var newButton = document.createElement("button");
      newButton.textContent = savedCity[i];
      newButton.classList.add("btn");
      newButton.setAttribute("data-city", savedCity[i]);
      newButton.setAttribute("type", "submit");

        // place the new button above the previous button
      savedCitiesEl.prepend(newButton);
    }
    
}

// call the renderCities function
renderCities();

// function to display the weather for a past city when a button in the search history is clicked
var getPastCities = function(event) {
    var city = event.target.getAttribute("data-city");

    if (city) {
        getLocation(city);
    }
}

// function to clear the local storage and reload the page when the clear button is clicked
var clear = function() {
    localStorage.clear();
    location.reload();
}

// add event listener to call the formSubmitHandler when the search button is clicked
userFormEl.addEventListener('submit', formSubmitHandler);
// add event listener to call the getPastCities function when a button in the search history is clicked
savedCitiesEl.addEventListener("click", getPastCities);
// add event listener to call the clear function when the clear button is clicked
clearButton.addEventListener("click", clear);
