
const request=require('request')

const geocode = (address, callback) => {
    const url =
        "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
        address +
        ".json?access_token=pk.eyJ1Ijoia2h1c2hpcmFpOTU5NiIsImEiOiJjazdhc3B6cXIxN2VwM21wN3p3eTBpYWVvIn0.O1TWsZhoo56LiIld-Knr8w";

    request({ url, json: true }, (error, {body}) => {
        if (error) {
            callback("unable to connect to location services");
        } else if (body.features.length == 0) {
            callback("unable to find location. try another one", undefined);
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude:body.features[0].center[0],
                location: body.features[0].place_name
            });
        }
    });
};

module.exports=geocode


//Geocoding
// taking a address and converting it into a latitude and longitude
// adress -> lat, long -> weather

// const geocodeUrl =
//     "https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?access_token=pk.eyJ1Ijoia2h1c2hpcmFpOTU5NiIsImEiOiJjazdhc3B6cXIxN2VwM21wN3p3eTBpYWVvIn0.O1TWsZhoo56LiIld-Knr8w";

// request({ url: geocodeUrl, json: true }, (error, response) => {
//     if (error) {
//         console.log("Cannot connect to the map services");
//     }else if(response.body.features.length==0){
//         console.log('unable to find location.try another search')
//     }
//     else {
//         console.log(response.body.features[0].center);
//     }
// });