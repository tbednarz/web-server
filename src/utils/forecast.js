const request = require("request");

const forecast = (latitude, longitude, callback) => {
  const url =
    "https://api.darksky.net/forecast/75eba5b5a9e416e571688bc0e937d5a5/" +
    latitude +
    "," +
    longitude +
    "?units=us";

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to location services");
    } else if (body.error) {
      callback("unable to find location");
    } else {
      callback(
        undefined,
        body.daily.data[0].summary +  
          "It is currently " +
          body.currently.temperature +
          "°F out. The high today will be " +
          body.daily.data[0].temperatureMax + 
          "°F with a low of " +
          body.daily.data[0].temperatureMin +
          "°F. There is a " +
          body.currently.precipProbability +
          "% chance of rain."
      );
    }
  });
};

module.exports = forecast;
