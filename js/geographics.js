export function mapValue(lowest, higher, value){
    higher -= lowest;
    const newValue = value * higher;
    return newValue + lowest;
}

export class Geographics{
    constructor(){

    }

    getCountryName(isoName){
        return "Venezuela"
    }

    getRandomCoordinate(amount){
        let response = [];
        for (var index = 0; index < amount; index++) {
            const latitude  = mapValue(-90, 90, Math.random());
            const longitude = mapValue(-180, 180, Math.random());

            response.push({latitude, longitude});
        }
        
        return response;
    }
}