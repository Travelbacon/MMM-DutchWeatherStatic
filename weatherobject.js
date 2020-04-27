/* global Class */

/* Magic Mirror
 * Module: Weather
 *
 * By Michael Teeuw http://michaelteeuw.nl
 * MIT Licensed.
 *
 * This class is the blueprint for a day which includes weather information.
 */

// Currently this is focused on the information which is necessary for the current weather.
// As soon as we start implementing the forecast, mode properties will be added.

class WeatherObject {
	constructor(units, tempUnits, windUnits) {

		this.units = units;
		this.tempUnits = tempUnits;
		this.windUnits = windUnits;
		this.date = null;
		this.windSpeed = null;
		this.windSpeedBft = null;
		this.windDirection = null;
		this.sunrise = null;
		this.sunset = null;
		this.temperature = null;
		this.minTemperature = null;
		this.maxTemperature = null;
		this.weatherType = null;
		this.humidity = null;
		this.rain = null;
		this.snow = null;
		this.precipitation = null;
		this.feelsLikeTemp = null;
		this.rainChance = null;
		this.humanRead = null;
		this.tijdstip = null;
	}

	nextSunAction() {
			return moment().isBetween(moment(this.sunrise, 'HH:mmm'), moment(this.sunset, 'HH:mm')) ? "sunset": "sunrise";
	}

}
