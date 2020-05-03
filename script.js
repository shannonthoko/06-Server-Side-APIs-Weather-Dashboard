$(document).ready(function(){
    
    
    
    if (localStorage.getItem("city")){
        
        
        $("input").attr("placeholder", localStorage.getItem("city"));
        //$("input").text(localStorage.getItem("city"))
    };
    
    $("#search-button").on("click", function(event){
        
        event.preventDefault();
        
        
        $("#city-name").empty();    
        $("#temp").empty();
        $("#humidity").empty();
        $("#windspeed").empty();
        $("#uvi").empty();
        $("#five-day").empty();
        
        
        var apiKey = "c253fec5c8647483a3a7e232e33ec909";
        var searchCity = $("#search-input").val().trim();
        var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + searchCity +"&appid=" + apiKey;
        var secondQuery = "https://api.openweathermap.org/data/2.5/onecall?lat=";
        
        $.ajax({
            
            url: queryURL,
            method: "GET"
        }).then(function(response){
            
            var cityText = response.name;
            var latitude = response.coord.lat;
            var longitude = response.coord.lon;
            $("#city-name").css("font-weight", "bold");
            $("#city-name").append(cityText + ": " );
            
            $.ajax({
                url: secondQuery + latitude + "&lon=" + longitude + "&appid=" + apiKey,
                method: "GET"
            }).then(function(secondResponse){
                
                
                
                console.log(secondResponse);
                
                //image link used later
                var icon = "http://openweathermap.org/img/wn/" + secondResponse.current.weather[0].icon + "@2x.png";
                
                
                var kelvin = secondResponse.current.temp;
                //temp conversion
                var farenheit = (kelvin - 273.15) * 9/5 + 32;
                farenheit = parseFloat(farenheit).toFixed(2);
                var humidity = secondResponse.current.humidity;
                var windspeed = secondResponse.current.wind_speed;
                var UVI = secondResponse.current.uvi;
                
                //conditional statement for UVI colour coding
                if (UVI > 6) {
                    
                    $("#uvi").css('color', 'red');
                } else if (3 < UVI < 5 ){
                    
                    $("#uvi").css('color', 'orange');
                    
                }else if ( UVI < 3){
                    
                    $("#uvi").css('color', 'green');
                };
                
                // time of the forecasted data, unix conversion 
                var responseToday = secondResponse.dt ;
                var date = Date(responseToday);
                var today = date.toLocaleString();
                //appending elements to page for current day
                
                
                
                $("#city-name").append(today);
                $("#temp").append("Temperature: " + farenheit + " F");
                $("#humidity").append("Humidity: " + humidity + "%");
                $("#windspeed").append("Windspeed: " + windspeed + " MPH");
                $("#uvi").append("UVI: " + UVI);
                
                
                
                var img = $('<img>');
                img.attr('src', icon);
                $("#city-name").append(img);
                
                var dateDiv = $("<div>");
                dateDiv.css("font-weight","bold" );
                dateDiv.append("Five Day Forecast:");
                $("#five-day").append(dateDiv);
                
                //five day forecast
                for (var i = 0; i < 5; i++){
                    
                    const today = new Date()
                    const tomorrow = new Date(today)
                    tomorrow.setDate(tomorrow.getDate() + i+1);

                    var kelvinFiveDay = secondResponse.daily[i].temp.day;
                    var farenheitFiveDay = (kelvinFiveDay - 273.15) * 9/5 + 32;
                    farenheitFiveDay = parseFloat(farenheitFiveDay).toFixed(2);
                    var humidityFiveDay = secondResponse.daily[i].humidity;
                    var iconFiveDay = "http://openweathermap.org/img/wn/" + secondResponse.daily[i].weather[0].icon + "@2x.png";
                    /*var responseFiveDay = secondResponse.daily[i].dt;
                    var fiveDayDate = Date(responseFiveDay);
                    var fiveDates = responseFiveDay.toLocaleString();*/
                    
                    var currentDate = $("<div>");
                    var fiveDayTempDiv = $("<div>");
                    var fiveDayHumidityDiv = $("<div>");
                    //var fiveDayTimeDiv = $("<div>");
                    //fiveDayTimeDiv.append(fiveDates);
                    currentDate.append(tomorrow);
                    fiveDayTempDiv.append("Temperature: "+farenheitFiveDay + " F" );
                    fiveDayHumidityDiv.append("Humidity: "+ humidityFiveDay + "%");
                    
                    
                    //$("#five-day").append(fiveDayTimeDiv);
                    
                    $("#five-day").append(currentDate);
                    
                    var imgFiveDay = $('<img>');
                    imgFiveDay.attr('src', iconFiveDay);
                    $("#five-day").append(imgFiveDay);
                    
                    $("#five-day").append(fiveDayTempDiv);
                    $("#five-day").append(fiveDayHumidityDiv);
                    
                    
                };
                
                //saved search
                
                localStorage.setItem("city", cityText);
                var savedCity = localStorage.getItem("city");

                
                
                var buttonSaved = $("<button>");
                buttonSaved.text(savedCity);
                $("#saved-search").prepend(buttonSaved);
                
                //open to last 
                if (localStorage.getItem("city")){
            
                    $("#search-input").append(savedCity);
                };
                //search history button to search city again
                buttonSaved.on("click", function(event){
                    
                    event.preventDefault();
                    $("#search-input").val(savedCity);
                    
                    
                });
               
                
                
            });
            
            
            
        });
        
        
        
    });  
});