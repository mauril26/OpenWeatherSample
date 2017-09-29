var API_KEY = '7835cd6083c3ec90d0a2162c49635cc0';

Elements.CITY_SEARCH_BUTTON.addEventListener('click', searchCity);

document.onreadystatechange = function () {
    if (document.readyState === "complete") {
        onLoad();
    }
}

var weather         = new WeatherFetcher(
    API_KEY,
    TEMP_UNITS.CELSIUS,
    MEASURE_SYSTEM.WIND_SPEED.METRIC);
    
var geographics     = new Geographics();

var loadingTemplate = new Template("#loading-tpl");
var resultTpl       = new Template("#city-result-tpl");
var errorTpl        = new Template("#error-tpl");



function setCityTemplateData(tpl, data, slot){
    tpl.prepare();
    tpl.setValues({
        City        : data.cityName,
        Country     : data.countryName,
        Weather     : data.cityWeather,
        Wind        : data.getCityWind(),
        Temperature : data.getCityTemperature(),
        Humidity    : data.getCityHumidity()
    });
    tpl.attachToDOM(slot); 
}

function onLoad(){
    var randomCities = geographics.getRandomCoordinate(4);
    var tpl = new Template("#random-city-tpl");

    for (var index = 0; index < randomCities.length; index++) {
        var coordinate = randomCities[index];
        
        weather.searchCityByPosition(coordinate.latitude, coordinate.longitude, function(data){
            setCityTemplateData(tpl, data, "random-cities");
        });
    }
}

function searchCity() {
    var cityName = Elements.CITY_NAME.value.trim();
    if (cityName.length==0){
        alert("Please enter a valid city name");
        return;
    }

    Template.detachFromDOM("city-result");

    loadingTemplate.prepare();
    loadingTemplate.attachToDOM("city-result");

    try{
        weather.searchCityByName(cityName, function(data){
            loadingTemplate.detachFromDOM();
            setCityTemplateData(resultTpl, data, "city-result");
        });
    }
    catch(ex){
        console.log(error);
        errorTpl.prepare();
        loadingTemplate.detachFromDOM();
        errorTpl.attachToDOM("city-result");
    }
}