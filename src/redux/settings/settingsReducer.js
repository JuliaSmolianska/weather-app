import {
  TOGGLE_TEMPERATURE_UNIT, SET_GLOBAL_LANGUAGE, ADD_CITY,
  FETCH_DATA_LOADING, FETCH_DATA_SUCCESS, FETCH_DATA_FAILURE
} from './settingsActions.js';

const initialState = {
  temperatureUnit: localStorage.getItem("temperatureUnit") || "Celsius",
  globalLanguage: localStorage.getItem("language") || "en",
  cities: JSON.parse(localStorage.getItem('cities')) || [
    {
      city: "Kyiv",
      country: "UA"
    }
  ],
  loading: false,
  error: null,
};

const settingsReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_TEMPERATURE_UNIT:
      return {
        ...state,
        temperatureUnit: state.temperatureUnit === 'Celsius' ? 'Fahrenheit' : 'Celsius',
      };
    case SET_GLOBAL_LANGUAGE:
      return { ...state, globalLanguage: action.payload };
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
    case FETCH_DATA_LOADING:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_DATA_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case FETCH_DATA_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default settingsReducer;
