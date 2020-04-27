/* global WeatherProvider, WeatherObject */

/* Magic Mirror
 * Module: Weather
 *
 * MIT Licensed.
 *
 * Dutch for private use. Use at own risk.
 */

WeatherProvider.register("weerlivenl", {

	// Set the name of the provider.
	// This isn't strictly necessary, since it will fallback to the provider identifier
	// But for debugging (and future alerts) it would be nice to have the real name.
	providerName: "weerlivenl",

	// Overwrite the fetchCurrentWeather method.
	fetchCurrentWeather() {
		Log.info("Retrieve from API WNL");
		Log.info(this.getUrl());
		this.fetchData(this.getUrl())
			.then(data => {
				if (!data) {
					// Did not receive usable new data.
					// Maybe this needs a better check?
					Log.info('No data');
					return;
				}
				Log.info('******************');
				Log.info(data.liveweer[0].plaats);
				this.setFetchedLocation(`${data.liveweer[0].plaats}, Netherlands`);
				const currentWeather = this.generateWeatherObjectFromCurrentWeather(data.liveweer[0]);
				this.setCurrentWeather(currentWeather);
			})
			.catch(function(request) {
				Log.error("Could not load data ... ", request);
			})
			.finally(() => this.updateAvailable())
	},

	getUrl() {
		return this.config.apiBase + this.getParams();
	},

	/*
	 * Generate a WeatherObject based on currentWeatherInformation
	 */
	generateWeatherObjectFromCurrentWeather(currentWeatherData) {
		const currentWeather = new WeatherObject(this.config.units, this.config.tempUnits, this.config.windUnits);
		
		currentWeather.temperature = currentWeatherData.temp;
		currentWeather.minTemperature = currentWeatherData.d0tmin;
		currentWeather.maxTemperature = currentWeatherData.d0tmax;
		currentWeather.feelsLikeTemp = currentWeatherData.gtemp;
		
		currentWeather.humidity = currentWeatherData.lv;
		
		currentWeather.windSpeed = currentWeatherData.windkmh;
		currentWeather.windSpeedBft = currentWeatherData.winds;
		currentWeather.windDirection = this.windDirOneLetter(currentWeatherData.windr);

		currentWeather.sunrise = currentWeatherData.sup;
		currentWeather.sunset = currentWeatherData.sunder;

		currentWeather.rainChance = currentWeatherData.d0neerslag;
		
		currentWeather.humanRead = currentWeatherData.verw;
		
		currentWeather.weatherType = this.convertWeatherType(currentWeatherData.d0weer);
		return currentWeather;
	},
	
	windDirOneLetter(windDirection) {
		const windDirections = {
			"Noord": "N",
			"Oost": "O",
			"West": "W",
			"Zuid": "Z"
		};
		return windDirections.hasOwnProperty(windDirection) ? windDirections[windDirection] : windDirection;
	},


	/*
	 * Convert the OpenWeatherMap icons to a more usable name.
	 */
	convertWeatherType(weatherType) {
		const weatherTypes = {
			"zonnig": "day-sunny",
			"bliksem": "thunderstorm",
			"regen": "rain",
			"buien": "showers",
			"hagel": "hail",
			"mist": "fog",
			"sneeuw": "snowflake-cold",
			"bewolkt": "cloudy",
			"halfbewolkt": "day-cloudy",
			"zwaarbewolkt": "day-cloudy-high",
			"nachtmist": "night-fog",
			"helderenacht": "night-clear",
			"wolkennacht": "night-alt-cloudy",
		};

		return weatherTypes.hasOwnProperty(weatherType) ? weatherTypes[weatherType] : null;
	},

	/* getParams(compliments)
	 * Generates an url with api parameters based on the config.
	 *
	 * return String - URL params.
	 */
	getParams() {
		let params = "?";
		params += "&key=" + this.config.apiKey;
		params += "&locatie=" + this.config.lat + "," + this.config.lon;

		return params;
	}
});
