// define farenheit, celcius, and display variables
var farenheit;
var celcius;
var display = "f";

// if location of browser is known
if (navigator.geolocation) {
    // obtain the brower location
    navigator.geolocation.getCurrentPosition(function(position) {
        // define url for querying open weather api
        var url = "http://api.openweathermap.org/data/2.5/weather?lat=" + position.coords.latitude + "&lon=" + position.coords.longitude + "&appid=e929d3f551b3e6ab10793133b4dc0d3b";
        // get json data for position
        $.getJSON(url, function(json) {
            // take returned kelvin temperature and convert it to farenheit; add the degree symbol
            farenheit = Math.floor(json.main.temp * (9 / 5) - 459.67);
            farenheit += " &#8457";
            // take retured  kelvin temperature and convert it to celcius; add the degree symbol
            celcius = Math.floor(json.main.temp - 273.15);
            celcius += " &#8451";
            // display temperature in browser
            $("#temp").html(farenheit);
            // display conditions in browser
            $("#condition").html(json.weather[0].main);
            // display icon in browser
            $("#icon").attr("src", "http://openweathermap.org/img/w/" + json.weather[0].icon + ".png");
            // display location in browser
            $("#location").html(json.name);
            return false;
        });
        return false;
    });
}

// when document is finished loading
$(document).ready(function() {
    // load weather information
    $(".container").fadeIn(1500);
    // when button is clicked
    $("#button").click(function() {
        // if display shows temperature in farenheit, switch it to celcius and vice versa
        if (display == "f") {
            $("#temp").html(celcius);
            display = "c";
        } else if (display == "c") {
            $("#temp").html(farenheit);
            display = "f";
        }
    });
    return false;
});
