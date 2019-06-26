const request = require("request");

const geocode = (address, callback) => {
  const url =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    encodeURIComponent(address) +
    ".json?access_token=pk.eyJ1IjoidHJlc2JlZG5hcnoiLCJhIjoiY2p3djU0d2ZpMDJ6ejN5cGd3YTIxMGdxYiJ9.INkysOQLwkjTAR39TyJpCA&limit=1";

  request({ url, json: true }, (error, {body}) => {
    if (error) {
      callback("Unable to Connect to Location Services!");
    } else if (body.features.length === 0) {
      callback("Unable To Find Location, Try Another Search");
    } else {
      callback(undefined, {
        latitude: body.features[0].center[1],
        longitude: body.features[0].center[0],
        location: body.features[0].place_name
      })
    }
  })
}
module.exports = geocode