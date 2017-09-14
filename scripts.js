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

    // get json data for position and display
    $.getJSON(url, function(json) {
      farenheit = Math.floor(json.main.temp * (9 / 5) - 459.67);
      farenheit += " &#8457";
      celcius = Math.floor(json.main.temp - 273.15);
      celcius += " &#8451";
      $("#temp").html(farenheit);
      $("#condition").html(json.weather[0].main);
      $("#icon").attr("src", "http://openweathermap.org/img/w/" + json.weather[0].icon + ".png");
      $("#location").html(json.name);
      return false;
    });

    return false;
  });
}

// when document is finished loading
$(document).ready(function() {

  $(".container").fadeIn(1500);

  // if display shows temperature in farenheit, switch it to celcius and vice versa
  $("#button").click(function() {
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
