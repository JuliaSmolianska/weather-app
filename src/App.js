import React from 'react';
import { useSelector } from 'react-redux';
import WeatherCard from './components/WeatherCard';
import CitySearch from './components/CitySearch';
import LanguageSwitcher from './components/LanguageSwitcher';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import LocationRequest from './components/LocationRequest';
import css from "./components/Styles.module.css";

const App = () => {
  const currentLanguage = useSelector((state) => state.language.globalLanguage);
  const currentCitiesWeather = `citiesWeather${currentLanguage.toUpperCase()}`;
  const citiesWeather = useSelector((state) => state.weather[currentCitiesWeather]);

  return (
    <Col className={`ps-3 pe-3 ${css.box}`}>
      <h1 className='text-center mb-4 mt-3'>Weather App</h1>
      <LocationRequest />
      <CitySearch />
      <LanguageSwitcher />
      <Row>
        {citiesWeather.map((cityWeather, index) => (
          <WeatherCard key={index} cityWeather={cityWeather} index={index} />
        ))}
      </Row>
    </Col>

  );
};

export default App;
