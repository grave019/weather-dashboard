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
        alert("Please enter a valid city!");
    }
};


var APIKey = "3a86af078e820c30e7a3322768448284";