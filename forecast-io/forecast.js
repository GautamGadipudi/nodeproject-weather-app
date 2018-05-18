const request = require('request');

var getCurrentWeather = (latitude, longitude, callback) => {
  request({
    url: `https://api.darksky.net/forecast/7c5f9be19864505c0bbd79fc3536935a/${latitude},${longitude}`,
    json: true
  }, (error, response, body) => {
    console.log('----');
    if (error) {
      callback('Cannot connect to forecast.io servers.');
    } else if (body.code == 400) {
      callback(body.error);
    } else {
      callback(undefined, {
        summary: body.currently.summary,
        temperature: body.currently.temperature,
        humidity: body.currently.humidity,
        windSpeed: body.currently.windSpeed
      });
    }
  });
}

module.exports = {getCurrentWeather};
