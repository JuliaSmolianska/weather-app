// LocationRequest.js
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  getWeatherByCoordinatesEN,
  getWeatherByCoordinatesUA,
  getWeatherByCoordinatesHE,
} from "../services/weatherService";
import { addCityWeather } from "../redux/weather/weatherActions";
import {
  addCity,
  fetchDataLoading,
  fetchDataFailure,
  fetchDataSuccess,
} from "../redux/settings/settingsActions";

const LocationRequest = () => {
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
          try {
            dispatch(fetchDataLoading());
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
            dispatch(fetchDataSuccess());
            dispatch(addCity(currentCity));
            dispatch(
              addCityWeather(
                cityWeatherObjectUA,
                cityWeatherObjectEN,
                cityWeatherObjectHE
              )
            );
          } catch (error) {
            dispatch(fetchDataFailure(error.message));
          }
        });
      } else {
        console.error("Geolocation is not supported by this browser.");
      }
    };

    getLocation();
  }, [dispatch]);

  return <div>{location && <div style={{ display: "none" }} />}</div>;
};

export default LocationRequest;
