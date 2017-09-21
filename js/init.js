import * as Elements from 'js/elements.js';
import { WeatherFetcher, WeatherData } from 'js/weather.js';
import { Geographics } from 'js/geographics.js';
import { Template } from 'js/template.js';
export const API_KEY = '7835cd6083c3ec90d0a2162c49635cc0';

Elements.CITY_SEARCH_BUTTON.addEventListener('click', searchCity);

const weather         = new WeatherFetcher(API_KEY);
const geographics     = new Geographics();

const loadingTemplate = new Template("#loading-tpl");
const resultTpl       = new Template("#city-result-tpl");

function onLoad(){
    let randomCities = geographics.getRandomCoordinate(4);
    let tpl = new Template("#random-city-tpl");

    for (var index = 0; index < randomCities.length; index++) {
        let coordinate = randomCities[index];
        let response   = weather.searchCityByPosition(coordinate.latitude, coordinate.longitude);
        
        response.then(value => {
            tpl.prepare();
            tpl.setValues({
                Name: value.cityName,
                Temperature: value.cityTemperature,
                Country: value.countryName
            });
            tpl.attachToDOM("random-cities");
        })
        .catch(error=> {
            console.log("Error: " + error);
            Elements.LOADING.style.display = 'none';
            Elements.ERROR.style.display   = 'block';
            return;
        }); 
    }
}

function searchCity() {
    const cityName = Elements.CITY_NAME.value.trim();
    if (cityName.length==0){
        alert("Please enter a valid city name");
        return;
    }

    resultTpl.detachFromDOM();

    loadingTemplate.prepare();
    loadingTemplate.attachToDOM("city-result");
    
    Elements.ERROR.style.display = 'none';

    const response = weather.searchCityByName(cityName);

    response.then(value=> {
        resultTpl.prepare();
        resultTpl.setValues({
            Name: value.cityName,
            Temperature: value.cityTemperature
        });
        
        loadingTemplate.detachFromDOM();
        resultTpl.attachToDOM("city-result");
    })
    .catch(error => {
        console.log(error);
        Elements.ERROR.style.display = 'block';
        Template.detachFromDOM("city-result");
    });
}

onLoad();

/* 
function testGeolocation() {
    navigator.geolocation.getCurrentPosition((pos) => {
        var latitude = pos.coords.latitude; // Degrees N of equator
        var longitude = pos.coords.longitude; // Degrees E of Greenwich
        var accuracy = pos.coords.accuracy; // Meters

        console.log("lat: " + latitude + ", lon: " + longitude + ", acc: " + accuracy)
    });
}
testGeolocation();
*/