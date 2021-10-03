var APIKey = "3a86af078e820c30e7a3322768448284";
//dom element refs
var searchBtnEl = document.getElementById("searchBtn")
var searchCityEl = document.getElementById("searchCity")
var boldDataEl = document.getElementById("boldData")
var tempMainEl = document.getElementById("tempMain")
var windMainEl = document.getElementById("windMain")
var humidMainEl = document.getElementById("humidMain")
var uvMainEl = document.getElementById("uvMain")
var forcastEl = document.getElementById("forcast")
let forcastBlock = document.createElement("div")
let colorBlock = document.querySelector(".color")

searchHistoryBtn();
let appDate = function (time) {
    let displayDate = new Date();
    displayDate.setTime(time * 1000);
    let dd = displayDate.getDate();
    let mm = displayDate.getMonth() + 1;
    let y = displayDate.getFullYear();
    return mm + '/' + dd + '/' + y;
}

var formSubmitHandler = function (event) {
    event.preventDefault();

    // get value from input element
    var cityName = searchCityEl.value.trim();
    if (cityName) {
        getInitialData(cityName);
        searchCityEl.value = "";
        history(cityName);
    } else {
        alert("Please enter a valid city");
    }
};
//initial API request
var getInitialData = function (cityName) {
    let firstApi = `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&appid=3a86af078e820c30e7a3322768448284`;
    fetch(firstApi).then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {
                let log = data[0].lon;
                let lat = data[0].lat;
                console.log(lat, log)
                getMainData(lat, log, cityName)
            });
        } else {
            alert('There was some error, enter the city again');
        }
    });
};
var getMainData = function (lat, log, cityName) {
    let secondApi = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${log}&appid=3a86af078e820c30e7a3322768448284`;
    fetch(secondApi)
        .then(function (response) {
            return response.json();
        }).then(function (data) {
            console.log(data);

            boldDataEl.innerHTML = `<span class = "bold">${cityName}    (${appDate(data.current.dt)})  </span>   <img src="https://openweathermap.org/img/w/${data.current.weather[0].icon}.png" /> `
            tempMainEl.innerHTML = `Temp: ${data.current.temp} &#186F`
            windMainEl.innerHTML = `Wind: ${data.current.wind_speed} MPH`
            humidMainEl.innerHTML = `Humidity: ${data.current.humidity} %`
            uvMainEl.innerHTML = `UV Index: <span class = "color">      ${data.current.uvi}     </span>`
            $(".main").addClass("mainDisplay")