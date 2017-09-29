function mapValue(lowest, higher, value) {
    higher -= lowest;
    const newValue = value * higher;
    return newValue + lowest;
}

function Geographics() {
    this.getCountryName = function(isoName){
        return "Venezuela";
    }

    this.getRandomCoordinate = function(amount){
        var response = [];
        for (var index = 0; index < amount; index++) {
            var latitude = mapValue(-90, 90, Math.random());
            var longitude = mapValue(-180, 180, Math.random());

            response.push({
                latitude: latitude,
                longitude: longitude
            });
        }

        return response;
    }
}