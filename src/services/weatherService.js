// weatherService.js
import axios from 'axios';

const OPEN_WEATHER_API_KEY = '5ad22980fbdab2cf000f47d264b9f2aa';

export const getWeatherForecastEN = async (city) => {
  const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${OPEN_WEATHER_API_KEY}&units=metric&lang=en`;
  const response = await axios.get(url);
  console.log(response.data)
  return response.data;
};

export const getWeatherForecastUA = async (city) => {
  const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${OPEN_WEATHER_API_KEY}&units=metric&lang=ua`;
  const response = await axios.get(url);
  return response.data;
};

export const getWeatherForecastHE = async (city) => {
  const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${OPEN_WEATHER_API_KEY}&units=metric&lang=he`;
  const response = await axios.get(url);
  return response.data;
};

export const getWeatherByCoordinatesEN = async (lat, lon) => {
  const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${OPEN_WEATHER_API_KEY}&units=metric&lang=en`;
  const response = await axios.get(url);
  return response.data;
};

export const getWeatherByCoordinatesUA = async (lat, lon) => {
  const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${OPEN_WEATHER_API_KEY}&units=metric&lang=ua`;
  const response = await axios.get(url);
  return response.data;
};

export const getWeatherByCoordinatesHE = async (lat, lon) => {
  const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${OPEN_WEATHER_API_KEY}&units=metric&lang=he`;
  const response = await axios.get(url);
  return response.data;
};
