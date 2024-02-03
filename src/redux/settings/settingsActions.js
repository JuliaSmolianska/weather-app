// src/redux/settingsActions.js
export const TOGGLE_TEMPERATURE_UNIT = 'TOGGLE_TEMPERATURE_UNIT';
export const ADD_CITY = 'ADD_CITY';
export const FETCH_DATA_LOADING = 'FETCH_DATA_LOADING';
export const FETCH_DATA_SUCCESS = 'FETCH_DATA_SUCCESS';
export const FETCH_DATA_FAILURE = 'FETCH_DATA_FAILURE';

export const toggleTemperatureUnit = (temperatureUnit) => {
  localStorage.setItem("temperatureUnit", temperatureUnit);
  return {
    type: TOGGLE_TEMPERATURE_UNIT,
  };
}
export const addCity = (currentCity) => {
  const existingCities = JSON.parse(localStorage.getItem("cities")) || [];
  existingCities.push(currentCity);
  localStorage.setItem("cities", JSON.stringify(existingCities));
  return {
    type: ADD_CITY,
    payload: currentCity,
  };
}
export const fetchDataLoading = () => {
  return {
    type: FETCH_DATA_LOADING,
  };
}

export const fetchDataSuccess = () => {
  return {
    type: FETCH_DATA_SUCCESS,
  };
}

export const fetchDataFailure = (error) => {
  return {
    type: FETCH_DATA_FAILURE,
    payload: error,
  };
}