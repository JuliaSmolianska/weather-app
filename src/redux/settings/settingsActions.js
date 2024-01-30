// src/redux/settingsActions.js
export const TOGGLE_TEMPERATURE_UNIT = 'TOGGLE_TEMPERATURE_UNIT';
export const ADD_CITY = 'ADD_CITY';

export const toggleTemperatureUnit = (temperatureUnit) => {
  localStorage.setItem("temperatureUnit", temperatureUnit);
  return {
    type: TOGGLE_TEMPERATURE_UNIT,
  };
}
export const addCity = (currentCity) => {
  // Отримуємо існуючий масив з LocalStorage або створюємо новий, якщо він відсутній
  const existingCities = JSON.parse(localStorage.getItem("cities")) || [];

  // Додаємо новий об'єкт до масиву
  existingCities.push(currentCity);

  // Зберігаємо оновлений масив у LocalStorage
  localStorage.setItem("cities", JSON.stringify(existingCities));

  return {
    type: ADD_CITY,
    payload: currentCity,
  };
}
