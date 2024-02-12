import { ADD_CITY_WEATHER, REMOVE_CITY_WEATHER } from './weatherActions.js';

const initialState = {
  citiesWeatherUA: [],
  citiesWeatherEN: [],
  citiesWeatherHE: [],
};
const weatherReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_CITY_WEATHER:
      return {
        ...state,
        citiesWeatherUA: [action.payload.ua, ...state.citiesWeatherUA],
        citiesWeatherEN: [action.payload.en, ...state.citiesWeatherEN],
        citiesWeatherHE: [action.payload.he, ...state.citiesWeatherHE],
      };
    case REMOVE_CITY_WEATHER:
      const updatedCitiesWeatherUA = state.citiesWeatherUA.filter((_, index) => index !== action.payload);
      const updatedCitiesWeatherEN = state.citiesWeatherEN.filter((_, index) => index !== action.payload);
      const updatedCitiesWeatherHE = state.citiesWeatherHE.filter((_, index) => index !== action.payload);

      return {
        ...state,
        citiesWeatherUA: updatedCitiesWeatherUA,
        citiesWeatherEN: updatedCitiesWeatherEN,
        citiesWeatherHE: updatedCitiesWeatherHE,
      };

    default:
      return state;
  }
};

export default weatherReducer;
