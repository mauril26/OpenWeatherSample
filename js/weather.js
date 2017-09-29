var URL_BASE = "http://api.openweathermap.org/data/2.5/weather";

var TEMP_UNITS = {
    CELSIUS: {
        F: function(k) {
            return k - 275.15
        },
        U: "ºC"
    },
    
    FARENHEIT: {
        F: function(k) {
            return k * (9/5)-459.67;
        },
        U: "ºF"
    },
    
    KELVIN: {
        F: function(k){
            return k;
        },
        U: "ºK"
    }
}

var MEASURE_SYSTEM = {
    WIND_SPEED: {
        METRIC: { 
            F: function(s){
                return s;
            }, 
            U: "m/s"
        },
        IMPERIAL: {
             F: function(s){
                 return (s / 1609.344) / (1 / 3600);
                 },
             U: "mi/hr" 
        }
    }
}

/************************** */

function WeatherData(tempUnit, measureUnit) {
    this.tempUnit    = tempUnit;
    this.measureUnit = measureUnit;

    this.countryName     = "";
    this.cityName        = "";
    this.cityTemperature = "";
    this.cityWeather     = "";
    this.cityWind        = "";
    this.cityHumidity    = "";

    this.getCityTemperature = function(){
        return (Math.round(this.tempUnit.F(this.cityTemperature)*10) / 10) + " " + this.tempUnit.U;
    }

    this.getCityWind = function(){
        return (Math.round(this.measureUnit.F(this.cityWind)*10) / 10) + " " + this.measureUnit.U;
    }

    this.getCityHumidity = function(){
        return this.cityHumidity + " %";
    }
}

function WeatherFetcher(key, tempUnit, measureUnit){
    this.key         = key;
    this.tempUnit    = tempUnit;
    this.measureUnit = measureUnit;

    this.searchCityByName = function(cityName, callback) {
        var queryUrl = "?q=" + cityName + "&appid=" + this.key;
        var url = URL_BASE + queryUrl;
        return this.getWeatherData(url, callback);
    }

    this.searchCityByPosition = function(lat, lon, callback){
        var queryUrl = "?lat=" + lat + "&lon=" + lon + "&appid=" + this.key;
        var url = URL_BASE + queryUrl;
        return this.getWeatherData(url, callback);
    }

    this.getWeatherData = function(url, callback) {
        var request = new XMLHttpRequest();
        var data = new WeatherData(this.tempUnit, this.measureUnit);

        request.open('GET', url);
        request.onreadystatechange = function(){
            if (request.readyState == XMLHttpRequest.DONE && request.status == 200){
                var response = JSON.parse(request.responseText);
                data.countryName     = response.sys.country==undefined ? "Unknown" : response.sys.country;
                data.cityName        = response.name.length==0 ? "Unknown" : response.name;
                data.cityTemperature = response.main.temp;
                data.cityWeather     = response.weather[0].description;
                data.cityWind        = response.wind.speed;
                data.cityHumidity    = response.main.humidity;

                /* var proxyHandler = new WeatherFetcherHandler(TEMP_UNITS.CELSIUS, MEASURE_SYSTEM.WIND_SPEED.METRIC);
                var weatherProxy = new Proxy(data, proxyHandler); */

                callback(data);
            }
        }

        request.send();
    }
}

