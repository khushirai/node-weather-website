const request = require("request");


const forecast = (latitude, longitude, callback) => {
    const url = "https://api.darksky.net/forecast/ebfa2233a644e8a9308efb1fd3986b9b/"+latitude+','+longitude
        
    request({ url, json: true }, (error,{body}) => {
        if (error) {
            callback("unable to connect to weather service", undefined);
        } else if(body.error){
            callback("unable to find location",undefined)
        }      
         else {
            callback(
                undefined,
                "it is currently " + body.currently.temperature
                    +
                    " degrees here"
            );
        }
    })
};

module.exports = forecast;
