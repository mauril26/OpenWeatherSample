let URL_BASE = "http://api.openweathermap.org/data/2.5/weather";
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
                    resolve(data);
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