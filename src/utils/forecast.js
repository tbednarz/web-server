const request = require('request')

const forecast = (latitude, longitude, callback) => {
  const url =
    "https://api.darksky.net/forecast/75eba5b5a9e416e571688bc0e937d5a5/" +
    (latitude) +
    "," +
   (longitude) +
    "?units=us";

  request({ url, json:true }, (error, {body}) => {
    if (error) {
      callback("Unable to connect to location services");
    } else if (body.error) {
      callback("unable to find location");
    } else {
      callback(undefined, {
        summary: body.daily.data[0].summary,
        temperature: body.currently.temperature,
        precipChance: body.currently.precipProbability + "%",
        place: body.timezone 
        
      });
    }
  });
}

module.exports = forecast