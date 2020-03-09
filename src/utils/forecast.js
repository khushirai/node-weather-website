const request = require("request");

const forecast = (latitude, longitude, callback) => {
    const url =
        "https://api.darksky.net/forecast/ebfa2233a644e8a9308efb1fd3986b9b/" +
        latitude +
        "," +
        longitude;

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback("unable to connect to weather service", undefined);
        } else if (body.error) {
            callback("unable to find location", undefined);
        } else {
            //  console.log(body.daily.data[0])
            callback(
                undefined, body.daily.data[0].summary+
                " It is currently " +
                    body.currently.temperature +
                    " degrees here. High today is " +
                    body.daily.data[0].temperatureHigh +
                    " and low is " +
                    body.daily.data[0].temperatureLow +
                    ". There is a " +
                    body.currently.precipProbability +
                    "% chances of rain"
            );
        }
    });
};

module.exports = forecast;
