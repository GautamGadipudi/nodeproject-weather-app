const request = require('request');

var geocodeAddress = (address) => {
  var encodedAddress = encodeURIComponent(address);

  return new Promise((resolve, reject) => {
    request({
      url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=AIzaSyAxZdL1dJhRrMCHZ7ntlmA7qrX7-u4H35E`,
      json: true
    }, (error, response, body) => {
      if (error) {
        reject('Unable to connect to  Google servers.');
      } else if (body.status === 'ZERO_RESULTS') {
        reject('Unable to find that address.');
      } else if (body.status === 'OVER_QUERY_LIMIT') {
        reject('You have finished your daily limit on Maps API.');
      } else if (body.status === 'OK') {
        resolve({
          address: body.results[0].formatted_address,
          longitude: body.results[0].geometry.location.lng,
          latitude: body.results[0].geometry.location.lat
        });
      }
    });
  })
}

module.exports = {
  geocodeAddress
};
