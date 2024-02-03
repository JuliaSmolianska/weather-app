import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getWeatherForecastEN,
  getWeatherForecastUA,
  getWeatherForecastHE,
} from "../services/weatherService";
import css from "./Styles.module.css";
import { addCityWeather } from "../redux/weather/weatherActions";
import {
  addCity,
  fetchDataLoading,
  fetchDataFailure,
  fetchDataSuccess,
} from "../redux/settings/settingsActions";
import toast, { Toaster } from "react-hot-toast";

const CitySearch = () => {
  const dispatch = useDispatch();
  const [city, setCity] = useState("");
  const cities = useSelector((state) => state.settings.cities);
  const error = useSelector((state) => state.settings.error);
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const inputRef = useRef(null);

  const handleSearch = async () => {
    if (city.trim() !== "") {
      try {
        dispatch(fetchDataLoading());
        const weatherForecastDataUA = await getWeatherForecastUA(city);
        const cityWeatherObjectUA = {
          ua: weatherForecastDataUA,
        };

        const weatherForecastDataEN = await getWeatherForecastEN(city);
        const cityWeatherObjectEN = {
          en: weatherForecastDataEN,
        };

        const currentCity = {
          city: weatherForecastDataEN.city.name,
          country: weatherForecastDataEN.city.country,
        };

        const weatherForecastDataHE = await getWeatherForecastHE(city);
        const cityWeatherObjectHE = {
          he: weatherForecastDataHE,
        };

        dispatch(fetchDataSuccess());
        dispatch(
          addCityWeather(
            cityWeatherObjectUA,
            cityWeatherObjectEN,
            cityWeatherObjectHE
          )
        );
        dispatch(addCity(currentCity));
        setCity("");
      } catch (error) {
        const errorPayload = {
          message: error.message || "Something went wrong.",
          status: error.response ? error.response.status : null,
        };
        dispatch(fetchDataFailure(errorPayload));
        let errorMessage = "Something went wrong.";
        if (error.response && error.response.status === 404) {
          errorMessage =
            "City not found. Please, try again or use your location!";
        }
        toast.error(`Error: ${errorMessage}`, {
          duration: 5000,
          position: "top-center",
        });
      }
    }
  };

  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    setCity(inputValue);

    const filteredCities = cities.filter(
      (c) =>
        c.city.toLowerCase().includes(inputValue.toLowerCase()) ||
        c.country.toLowerCase().includes(inputValue.toLowerCase())
    );
    if (inputValue.length === 0) {
      setShowSuggestions(false);
    } else {
      setShowSuggestions(true);
    }

    setSuggestions(filteredCities);
  };

  const handleSelectSuggestion = (suggestion) => {
    setCity(`${suggestion.city}, ${suggestion.country}`);
    setSuggestions([]);
    setShowSuggestions(false);
  };

  const handleClickOutside = (e) => {
    if (inputRef.current && !inputRef.current.contains(e.target)) {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className={css.city_search_box}>
      <div>
        <input
          ref={inputRef}
          className={css.city_search_input}
          type="text"
          value={city}
          onChange={handleInputChange}
          autoComplete="on"
        />
        <ul>
          {showSuggestions &&
            suggestions.slice(0, 5).map((suggestion, index) => (
              <li
                key={index}
                onClick={() => handleSelectSuggestion(suggestion)}
              >
                {`${suggestion.city}, ${suggestion.country}`}
              </li>
            ))}
        </ul>
      </div>
      <div>
        <button onClick={handleSearch} className={css.city_search_button}>
          Add
        </button>
      </div>
      {error && <Toaster />}
    </div>
  );
};

export default CitySearch;
