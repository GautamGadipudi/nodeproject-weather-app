const yargs = require('yargs');

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

geocode.geocodeAddress(argv.address).then((location) => {
  console.log(JSON.stringify(location, undefined, 2));
  return forecastio.getCurrentWeather(location.latitude, location.longitude);
}).then((weather) => {
  console.log(JSON.stringify(weather, undefined, 2));
}).catch((errorMessage) => {
  console.log(errorMessage);
})
