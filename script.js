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
var secondQuery = "https://api.openweathermap.org/data/2.5/onecall?lat=";
//
//need to query city. 

//var secondQueryURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + latitude + "&lon=" + longitude + "&appid" + apiKey;

//searchCity + ","+ country + "&appid=" + apiKey;


$.ajax({

    url: queryURL,
    method: "GET"
}).then(function(response){


    //console.log(response);

    var cityText = response.name;
    //var icon = response.current.weather.icon;

    var latitude = response.coord.lat;
    var longitude = response.coord.lon;


    $("#city-name").append(cityText + ": " );
    

        $.ajax({
            url: secondQuery + latitude + "&lon=" + longitude + "&appid=" + apiKey,
            method: "GET"
        }).then(function(secondResponse){

            
            
            console.log(secondResponse);
            
            //image link used later
            var icon = "http://openweathermap.org/img/wn/" + secondResponse.current.weather[0].icon + "@2x.png";
            
            //temp comversion
            var kelvin = secondResponse.current.temp;
            
            var farenheit = (kelvin - 273.15) * 9/5 + 32;
            farenheit = parseFloat(farenheit).toFixed(2);
            
            var humidity = secondResponse.current.humidity;
            
            var windspeed = secondResponse.current.wind_speed;
            
            var UVI = secondResponse.current.uvi;
            
            // time of the forecasted data, unix conversion 
            var responseToday = secondResponse.dt ;
            var date = Date(responseToday);
            var today = date.toLocaleString();
            
            $("#city-name").append(today);
            $("#temp").append("Temperature: " + farenheit + " F");
            $("#humidity").append("Humidity: " + humidity + "%");
            $("#windspeed").append("Windspeed: " + windspeed + " MPH");
            $("#uvi").append("UVI: " + UVI);

            var img = $('<img>');
            img.attr('src', icon);
            $("#city-name").append(img);

         
            
            
            
            
        
            
            
            
            
            



            //date conversion
            


            
        })


    
})



});  
});