// LocationRequest.js
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  getWeatherByCoordinatesEN,
  getWeatherByCoordinatesUA,
  getWeatherByCoordinatesHE,
} from "../services/weatherService";
import { addCityWeather } from "../redux/weather/weatherActions";
import { addCity } from "../redux/settings/settingsActions";

const LocationRequest = ({ onLocationReceived }) => {
  const [location, setLocation] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const getLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async (position) => {
          const {
            coords: { latitude: lat, longitude: lon },
          } = position;
          setLocation({ lat, lon });

          const weatherForecastDataUA = await getWeatherByCoordinatesUA(
            lat,
            lon
          );
          const cityWeatherObjectUA = {
            ua: weatherForecastDataUA,
          };

          const weatherForecastDataEN = await getWeatherByCoordinatesEN(
            lat,
            lon
          );
          const cityWeatherObjectEN = {
            en: weatherForecastDataEN,
          };

          const weatherForecastDataHE = await getWeatherByCoordinatesHE(
            lat,
            lon
          );
          const cityWeatherObjectHE = {
            he: weatherForecastDataHE,
          };

          const currentCity = {
            city: weatherForecastDataEN.city.name,
            country: weatherForecastDataEN.city.country,
          };
          dispatch(addCity(currentCity));
          dispatch(
            addCityWeather(
              cityWeatherObjectUA,
              cityWeatherObjectEN,
              cityWeatherObjectHE
            )
          );
        });
      } else {
        console.error("Geolocation is not supported by this browser.");
      }
    };

    getLocation();
  }, [onLocationReceived]);

  return <div style={{ display: "none" }} />;
};

export default LocationRequest;
