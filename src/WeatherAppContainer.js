import { useState, useEffect } from 'react';
import './WeatherAppContainer.css';

const celsiusToFahrenheit = (celsius) => {
	return celsius * (9 / 5) + 32;
};

const fahrenheitToCelsius = (fahrenheit) => {
	return (fahrenheit - 32) * (5 / 9);
};

const WeatherAppContainer = () => {
	const [
		weatherData,
		setWeatherData
	] = useState(null);
	const [
		coords,
		setCoords
	] = useState(null);

	const [
		city,
		setCity
	] = useState('');
	const [
		country,
		setCountry
	] = useState('');
	const [
		description,
		setDescription
	] = useState('');
	const [
		imageSrc,
		setImageSrc
	] = useState('');
	const [
		windSpeed,
		setWindSpeed
	] = useState(0);
	const [
		clouds,
		setClouds
	] = useState(0);
	const [
		pressure,
		setPressure
	] = useState(0);
	const [
		temperature,
		setTemperature
	] = useState(0);

	const [
		degreesType,
		setDegreesType
	] = useState('C');
	useEffect(
		() => {
			if (coords) {
				const url = `https://api.openweathermap.org/data/2.5/weather?lat=${coords.latitude}&lon=${coords.longitude}&units=metric&appid=9aa41db4dd60fb94e40362577f5cf68d`;
				fetch(url).then((res) => res.json()).then((data) => {
					setWeatherData(data);
				});
			}
		},
		[
			coords
		]
	);

	useEffect(
		() => {
			if (weatherData) {
				setCity(weatherData.name);
				setCountry(weatherData.sys.country);
				setImageSrc(`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`);
				setDescription(weatherData.weather[0].description);
				setWindSpeed(weatherData.wind.speed);
				setClouds(weatherData.clouds.all);
				setPressure(weatherData.main.pressure);
				setTemperature(weatherData.main.temp);
			}
		},
		[
			weatherData
		]
	);

	useEffect(() => {
		const onSuccess = (position) => {
			setCoords(position.coords);
		};

		const onError = (error) => {
			alert(error);
		};
		navigator.geolocation.getCurrentPosition(onSuccess, onError, {
			enableHighAccuracy : true,
			timeout            : 5000
		});
	}, []);

	const handleOnClickDegrees = () => {
		if (degreesType === 'C') {
			setDegreesType('F');
			setTemperature(celsiusToFahrenheit(temperature));
			return;
		}
		setDegreesType('C');
		setTemperature(fahrenheitToCelsius(temperature));
	};

	return (
		<div className="weather-container">
			<h2>
				{city}, {country}
			</h2>
			<div className="weather-data-container">
				<div className="left-data">
					<img src={imageSrc} alt="Weather Icon" />
					<h3>
						{temperature} °{degreesType}
					</h3>
				</div>
				<div className="right-data">
					<h4>"{description}"</h4>
					<h4>Wind Speed: {windSpeed} m/s</h4>
					<h4>Clouds: {clouds} %</h4>
					<h4>Pressure: {pressure} mb</h4>
				</div>
			</div>
			<button className="button" onClick={handleOnClickDegrees}>
				DEGREES °F/°C
			</button>
		</div>
	);
};

export default WeatherAppContainer;
