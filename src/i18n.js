import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      "Feels like": "Feels like",
      "Wind": "Wind",
      "UnitWind": "m/s",
      "Humidity": "Humidity",
      "Pressure": "Pressure",
      "UnitPressure": "Pa"
    }
  },
  ua: {
    translation: {
      "Feels like": "Відчувається як",
      "Wind": "Вітер",
      "UnitWind": "м/с",
      "Humidity": "Вологість",
      "Pressure": "Тиск",
      "UnitPressure": "Па"
    }
  },
  he: {
    translation: {
      "Feels like": "מרגיש כמו",
      "Wind": "רוּחַ",
      "UnitWind": "גברת",
      "Humidity": "לחות",
      "Pressure": "לַחַץ",
      "UnitPressure": "אבא"
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: localStorage.getItem("language") ?? "en",
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;