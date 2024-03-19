import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      "Title": "Weather forecast",
      "Feels like": "Feels like",
      "Wind": "Wind",
      "UnitWind": "m/s",
      "Humidity": "Humidity",
      "Pressure": "Pressure",
      "UnitPressure": "Pa",
      "SearchButton": "Search"
    }
  },
  ua: {
    translation: {
      "Title": "Прогноз погоди",
      "Feels like": "Відчувається як",
      "Wind": "Вітер",
      "UnitWind": "м/с",
      "Humidity": "Вологість",
      "Pressure": "Тиск",
      "UnitPressure": "Па",
      "SearchButton": "Пошук"
    }
  },
  de: {
    translation: {
      "Title": "Wettervorhersage",
      "Feels like": "Fühlt sich an wie",
      "Wind": "Wind",
      "UnitWind": "m/s",
      "Humidity": "Feuchtigkeit",
      "Pressure": "Druck",
      "UnitPressure": "Pa",
      "SearchButton": "Suchen"
    }
  }
};


i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: localStorage.getItem("language") || "en",
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;