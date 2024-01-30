// src/redux/weatherActions.js
export const ADD_CITY_WEATHER = 'ADD_CITY_WEATHER';
export const REMOVE_CITY_WEATHER = 'REMOVE_CITY_WEATHER';

export const removeCityWeather = (index) => ({
  type: REMOVE_CITY_WEATHER,
  payload: index,
});

export const addCityWeather = (ua, en, he) => ({
  type: ADD_CITY_WEATHER,
  payload: { ua, en, he },
});