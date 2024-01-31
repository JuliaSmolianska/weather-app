// src/redux/settingsReducer.js
import { TOGGLE_TEMPERATURE_UNIT, ADD_CITY } from './settingsActions.js';

const initialState = {
  temperatureUnit: localStorage.getItem("temperatureUnit") ?? "Celsius",
  cities: [
    {
      city: "Kyiv",
      country: "UA"
    }
  ],
};

const settingsReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_TEMPERATURE_UNIT:
      return {
        ...state,
        temperatureUnit: state.temperatureUnit === 'Celsius' ? 'Fahrenheit' : 'Celsius',
      };
    case ADD_CITY:
      const cityExists = state.cities.some(city =>
        city.city === action.payload.city && city.country === action.payload.country
      );

      if (!cityExists) {
        return {
          ...state,
          cities: [action.payload, ...state.cities],
        };
      }
      return state;
    default:
      return state;
  }
};

export default settingsReducer;
