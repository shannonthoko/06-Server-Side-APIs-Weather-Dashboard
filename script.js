$(document).ready(function(){

$("#search-button").on("click", function(event){

$("#city-name").empty();    
$("#temp").empty();
$("#humidity").empty();
$("#windspeed").empty();
$("#uvi").empty();

event.preventDefault();

var apiKey = "c253fec5c8647483a3a7e232e33ec909";

var searchCity = $("#search-input").val().trim();
console.log(searchCity);
//weather
var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + searchCity +"&appid=" + apiKey;
//need to query city. 

//var secondQueryURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + latitude + "&lon=" + longitude + "&appid" + apiKey;

//searchCity + ","+ country + "&appid=" + apiKey;




$.ajax({

    url: queryURL,
    method: "GET"
}).then(function(response){


    console.log(response);

    var cityText = response.name;

    var latitude = response.coord.lat;
    var longitude = response.coord.lon;

    $("#city-name").append(cityText);

        $.ajax({


            url:"https://api.openweathermap.org/data/2.5/onecall?lat=" + latitude + "&lon=" + longitude + "&appid=" + apiKey,
            
            method: "GET"
        }).then(function(secondResponse){


            console.log(secondResponse);

            var kelvin = secondResponse.current.temp;

            var farenheit = (kelvin - 273.15) * 9/5 + 32;
            farenheit = parseFloat(farenheit).toFixed(2);

            var humidity = secondResponse.current.humidity;

            var windspeed = secondResponse.current.wind_speed;

            var UVI = secondResponse.current.uvi;


            $("#temp").append("Temperature: " + farenheit + " F");
            $("#humidity").append("Humidity: " + humidity + "%");
            $("#windspeed").append("Windspeed: " + windspeed + " MPH");
            $("#uvi").append("UVI: " + UVI);
            


            
        })


    
})



});  
});