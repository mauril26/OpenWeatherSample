let URL_BASE = "http://api.openweathermap.org/data/2.5/weather";

let TEMP_UNITS={
    CELSIUS:   {
        F: (k) => k - 275.15,
        U: "ºC" },
    
    FARENHEIT: {
        F: (k) => k * (9/5)-459.67, 
        U: "ºF" },
    
    KELVIN: {
        F: (k) => k,
        U: "ºK" }
}

let MEASURE_SYSTEM = {
    WIND_SPEED:{
        METRIC: { F: (s) => s, U: "m/s" },
        IMPERIAL: { F: (s) => (s / 1609.344) / (1 / 3600), U: "mi/hr" }
    }
}

export class WeatherData{
    constructor(){
        this._countryName     = "";
        this._cityName        = "";
        this._cityTemperature = "";
        this._cityWeather     = "";
        this._cityWind        = "";
        this._cityHumidity    = "";
    }

    get countryName() {
        return this._countryName;
    }
    set countryName(value) {
        this._countryName = value;
    }

    get cityName() {
        return this._cityName;
    }
    set cityName(value) {
        this._cityName = value;
    }

    get cityTemperature() {
        return this._cityTemperature;
    }
    set cityTemperature(value) {
        this._cityTemperature = value;
    }

    get cityWeather() {
        return this._cityWeather;
    }
    set cityWeather(value) {
        this._cityWeather = value;
    }

    get cityWind() {
        return this._cityWind;
    }
    set cityWind(value) {
        this._cityWind = value;
    }

    get cityHumidity() {
        return this._cityHumidity;
    }
    set cityHumidity(value) {
        this._cityHumidity = value;
    }
}

class WeatherFetcherHandler{
    constructor(temperatureUnit, measureSystem){
        this._currentTemperatureUnit = temperatureUnit;
        this._measureSystem = measureSystem;
    }

    get(target, name){
        if (name == "cityTemperature") {
            return (Math.round(this._currentTemperatureUnit.F(target[name]) * 10) / 10) + " " + this._currentTemperatureUnit.U;
        }

        if (name == "cityHumidity") {
            return target[name] + "%";
        }

        if (name == "cityWind"){
            return (Math.round(this._measureSystem.F(target[name]) * 10) / 10) + " " + this._measureSystem.U;
        }

        return target[name];
    }
}

export class WeatherFetcher{
    constructor(key){
        this._key = key;
    }

    getWeatherData(url) {
        let promise = new Promise((resolve, reject) => {
            const request = new XMLHttpRequest();
            request.open('GET', url);
            request.onreadystatechange = function(){
                if (request.readyState == XMLHttpRequest.DONE && request.status == 200){
                    const response = JSON.parse(request.responseText);
                    
                    const data = new WeatherData();
                    data.countryName     = response.sys.country==undefined ? "Unknown" : response.sys.country;
                    data.cityName        = response.name.length==0 ? "Unknown" : response.name;
                    data.cityTemperature = response.main.temp;
                    data.cityWeather     = response.weather[0].description;
                    data.cityWind        = response.wind.speed;
                    data.cityHumidity    = response.main.humidity;

                    const proxyHandler = new WeatherFetcherHandler(TEMP_UNITS.CELSIUS, MEASURE_SYSTEM.WIND_SPEED.METRIC);
                    const weatherProxy = new Proxy(data, proxyHandler);
                    resolve(weatherProxy);
                }
                else if (request.readyState == XMLHttpRequest.DONE){
                    reject("Error processing request");
                }
            }
            
            request.send();
        });

        return promise;
    }

    searchCityByName(cityName) {
        const queryUrl = `?q=${cityName}&appid=${this._key}`;
        const url = URL_BASE + queryUrl;
        return this.getWeatherData(url);
    }

    searchCityByPosition(lat, lon){
        const queryUrl = `?lat=${lat}&lon=${lon}&appid=${this._key}`;
        const url = URL_BASE + queryUrl;
        return this.getWeatherData(url);
    }
}