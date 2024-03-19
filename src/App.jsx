import React from 'react';
import { useSelector } from 'react-redux';
import WeatherCard from './components/WeatherCard/WeatherCard';
import CitySearch from './components/CitySearch/CitySearch';
import LanguageSwitcher from './components/LanguageSwitcher/LanguageSwitcher';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import LocationRequest from './components/LocationRequest';
import Loader from './components/Loader';
import css from "./App.module.css";
import { Toaster } from 'react-hot-toast';
import { useTranslation } from "react-i18next";

const App = () => {
  const currentLanguage = useSelector((state) => state.settings.globalLanguage);
  const currentCitiesWeather = `citiesWeather${currentLanguage.toUpperCase()}`;
  const citiesWeather = useSelector((state) => state.weather[currentCitiesWeather]);
  const loading = useSelector((state) => state.settings.loading);
  const { t } = useTranslation();

  return (
    <Col className={`ps-3 pe-3 ${css.box}`}>
      <h1 className='text-center mb-4 pt-3'> {t("Title")}</h1>
      <LocationRequest />
      <CitySearch />
      <LanguageSwitcher />
      {loading && <Loader />}
      <Row>
        {citiesWeather.map((cityWeather, index) => (
          <WeatherCard key={index} cityWeather={cityWeather} index={index} />
        ))}
      </Row>
      <Toaster />
    </Col>

  );
};

export default App;
