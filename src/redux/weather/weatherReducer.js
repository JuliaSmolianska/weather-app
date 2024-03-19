import { ADD_CITY_WEATHER, REMOVE_CITY_WEATHER } from './weatherActions.js';

const initialState = {
  citiesWeatherUA: [],
  citiesWeatherEN: [],
  citiesWeatherDE: [],
};
const weatherReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_CITY_WEATHER:
      return {
        ...state,
        citiesWeatherUA: [action.payload.ua, ...state.citiesWeatherUA],
        citiesWeatherEN: [action.payload.en, ...state.citiesWeatherEN],
        citiesWeatherDE: [action.payload.de, ...state.citiesWeatherDE],
      };
    case REMOVE_CITY_WEATHER:
      const updatedCitiesWeatherUA = state.citiesWeatherUA.filter((_, index) => index !== action.payload);
      const updatedCitiesWeatherEN = state.citiesWeatherEN.filter((_, index) => index !== action.payload);
      const updatedCitiesWeatherDE = state.citiesWeatherDE.filter((_, index) => index !== action.payload);

      return {
        ...state,
        citiesWeatherUA: updatedCitiesWeatherUA,
        citiesWeatherEN: updatedCitiesWeatherEN,
        citiesWeatherDE: updatedCitiesWeatherDE,
      };

    default:
      return state;
  }
};

export default weatherReducer;
