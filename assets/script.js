var userFormEl = document.querySelector('#user-form');
var getCityEl = document.querySelector('#getCity');
var savedCitiesEl = document.querySelector('#saved-cities');

var formSubmitHandler = function (event) {
  event.preventDefault();

  var city = getCityEl.value.trim();

  if (city) {
    getWeather(city);

    getCityEl.value = "";
  } else {
    alert("Please enter a city");
  }
};






userFormEl.addEventListener('submit', formSubmitHandler);