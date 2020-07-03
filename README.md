# Angular OpenWeatherMap API Example w/ Google Maps Weather Overlay

<img src="https://s3.amazonaws.com/weatherapi.greatbayconsult.com/shot1.png" width="600" alt="OpenWeather App"/>

Angular 9 OpenWeatherMap API Example with location and map overlays using Angular Google Maps API (AGM)

# Key Concepts
- OpenWeatherMap API Angular Service Integration
- Google Maps API (AGM/Core) Location Services & Map
- Current Weather Conditions for selected location
- 7-Day, 3-Hour Weather Forecast for selected location
- 5-Day, Daily Weather Forecast for selected location
- Weather Overlay Displayed on Google Map
- Wind Speed
  - Temperature
  - Pressure
  - Precipitation
  - Clouds

# Live Demo
- [View Demo](http://weatherapi.greatbayconsult.com)

# Prerequisites
  - OpenWeatherMap API Key - [Available Here](https://openweathermap.org/guide)
  - Google Maps API Key - [Available Here](https://developers.google.com/maps/documentation/javascript/get-api-key)

# Getting Started
## Setup
Add API Keys to Environment
```sh
environment.ts 
export const environment = {
  production: false,
  weatherAPIUrl: 'https://api.openweathermap.org/data/2.5', 
  weatherAPIKey: 'OpenWeatherMap api key here',
  gMapsAPIKey: 'google maps api key here'
};
```
```
$ npm install
```
```
$ ng serve
```
# Note
This code and the live example are using a paid version of the OpenWeatherMap API. If you are using the free version of the API, the following changes must be made:

- Change OpenWeatherMap API URL to HTTP instead of HTTPS:
```sh
environment.ts 
weatherAPIUrl: 'https://api.openweathermap.org/data/2.5',
```
```sh
search-location.ts
  addWeatherLayer(event) {
    this.selectedWeatherLayer = event.value;
    this.weatherMapSource = 'https://tile.openweathermap.org/map/' + this.selectedWeatherLayer + '/';
```

# Screenshots

<img src="https://s3.amazonaws.com/weatherapi.greatbayconsult.com/shot1.png" width="600" alt="OpenWeather App"/>
<img src="https://s3.amazonaws.com/weatherapi.greatbayconsult.com/shot2.png" width="600" alt="OpenWeather App"/>
<img src="https://s3.amazonaws.com/weatherapi.greatbayconsult.com/shot3.png" width="600" alt="OpenWeather App"/>
<img src="https://s3.amazonaws.com/weatherapi.greatbayconsult.com/shot4.png" width="600" alt="OpenWeather App"/>







