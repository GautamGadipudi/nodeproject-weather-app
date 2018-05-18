const yargs = require('yargs');
const request = require('request');

const geocode = require('./geocode/geocode.js');
const forecastio = require('./forecast-io/forecast.js');

const argv = yargs
  .options({
    address: {
      demand: true,
      alias: 'a',
      describe: 'Address to fetch weather for.',
      string: true
    }
  })
  .help()
  .argv;

geocode.geocodeAddress(argv.address, (geocodeErrorMessage, geocodeResults) => {
  if (geocodeErrorMessage)
    console.log(geocodeErrorMessage);
  else {
    console.log(JSON.stringify(geocodeResults, undefined, 2));
    forecastio.getCurrentWeather(geocodeResults.latitude, geocodeResults.longitude, (weatherErrorMessage, weatherResults) => {
      if (weatherErrorMessage)
        console.log(weatherErrorMessage);
      else {
        console.log(JSON.stringify(weatherResults, undefined, 2));
      }
    })
  }
});
