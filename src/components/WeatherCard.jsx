import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggleTemperatureUnit } from "../redux/settings/settingsActions";
import { removeCityWeather } from "../redux/weather/weatherActions";
import css from "./Styles.module.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { MdClose } from "react-icons/md";
import { useTranslation } from "react-i18next";
import "bootstrap/dist/css/bootstrap.min.css";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

const WeatherCard = ({ cityWeather, index }) => {
  const temperatureUnit = useSelector(
    (state) => state.settings.temperatureUnit
  );
  const currentLanguage = useSelector((state) => state.language.globalLanguage);

  const dispatch = useDispatch();

  const { t } = useTranslation();

  if (!cityWeather) {
    return null;
  }

  const currentWeather = cityWeather[currentLanguage].list[0];
  const weatherForecast = cityWeather[currentLanguage];

  const getFormattedTime = () => {
    const requestDateTime = new Date();
    const hours = requestDateTime.getHours().toString().padStart(2, "0");
    const minutes = requestDateTime.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  };

  const getFormattedDate = () => {
    const options = { weekday: "short", day: "numeric", month: "short" };
    const locale_string = `${currentLanguage}-${currentLanguage.toUpperCase()}`;
    return new Date().toLocaleDateString(locale_string, options);
  };

  const getFormattedRound = (temperature) => {
    const temp = Math.round(temperature);
    return temp;
  };

  const toggleUnit = (selectedUnit) => {
    if (selectedUnit !== temperatureUnit) {
      dispatch(toggleTemperatureUnit(selectedUnit));
    }
  };

  const temperatureValue =
    temperatureUnit === "Celsius"
      ? getFormattedRound(currentWeather.main.temp) >= 1
        ? "+" + getFormattedRound(currentWeather.main.temp)
        : getFormattedRound(currentWeather.main.temp)
      : temperatureUnit === "Fahrenheit" &&
        (currentWeather.main.temp * 9) / 5 + 32 >= 1
      ? "+" + getFormattedRound((currentWeather.main.temp * 9) / 5 + 32)
      : getFormattedRound((currentWeather.main.temp * 9) / 5 + 32);

  const removeCard = (index) => {
    dispatch(removeCityWeather(index));
  };
  const temperatureClass =
    getFormattedRound(currentWeather.main.temp) >= 0
      ? "card_box_warm"
      : "card_box_cold";
  const tempClass =
    getFormattedRound(currentWeather.main.temp) >= 0
      ? "text_warm"
      : "text_cold";

  const selectedIndices = [0, 7, 15, 23, 31, 39];
  const selectedTemperatureData = selectedIndices.map((index) =>
    temperatureUnit === "Celsius"
      ? weatherForecast.list[index].main.temp
      : (weatherForecast.list[index].main.temp * 9) / 5 + 32
  );

  const selectedLabels = selectedIndices.map((index) => {
    const fullDate = weatherForecast.list[index].dt_txt;
    const [, month, day] = fullDate.split(" ")[0].split("-");
    const reorderedDate = [day, month].join(".");
    return reorderedDate;
  });

  const temperatureChartData = {
    labels: selectedLabels,
    datasets: [
      {
        label: "",
        data: selectedTemperatureData,
        backgroundColor: (context) => {
          const chart = context.chart;
          const { ctx, chartArea } = chart;

          if (!chartArea) {
            return null;
          }
          const gradient =
            temperatureClass === "card_box_warm"
              ? "rgba(255, 165, 0, 0.2)"
              : "rgba(0, 0, 255, 0.2)";

          const gradientFill = ctx.createLinearGradient(
            0,
            chartArea.bottom,
            0,
            chartArea.top
          );
          gradientFill.addColorStop(0, gradient);
          gradientFill.addColorStop(1, "rgba(255, 255, 255, 0)");

          return gradientFill;
        },
        borderWidth: 0,
        borderRadius: 10,
        pointRadius: 0,
        fill: true,
        cubicInterpolationMode: "monotone",
      },
    ],
  };
  const options = {
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        grid: {
          display: false,
        },
        ticks: {
          stepSize: 5,
          maxTicks: 6,
          minTicks: 5,
        },
      },
    },
    elements: {
      line: {
        borderRadius: 30,
      },
    },
  };

  return (
    <Col sm={6} md={4} xl={3} className="p-2">
      <Col className={`${css.card_box} ${css[temperatureClass]}`}>
        <Row className="ps-3 pe-3 pt-3 pb-0">
          <Col xs={6} className="pe-0">
            <h5 className="fw-bold">
              {weatherForecast.city.name}, {weatherForecast.city.country}
            </h5>
            <p className="mb-0">
              {getFormattedDate()}, {getFormattedTime()}
            </p>
          </Col>
          <Col xs={2} className="ps-0 pe-0">
            <div className="my-auto">
              {currentWeather.weather[0].icon && (
                <img
                  src={`http://openweathermap.org/img/w/${currentWeather.weather[0].icon}.png`}
                  alt="Weather Icon"
                />
              )}
            </div>
          </Col>
          <Col xs={4}>
            <p className={`text-capitalize ${css.color}`}>
              {currentWeather.weather[0].description}
            </p>
          </Col>
        </Row>
        <Col className={`ps-3 pe-3} ${css.chart}`}>
          <Line data={temperatureChartData} options={options} />
        </Col>
        <Row className="ps-3 pe-3">
          <Col xs={6} className="pe-0">
            <div className="d-flex">
              <h1 className="mb-0 fw-medium">{temperatureValue}</h1>
              <h5 className={css.cursor}>
                <span
                  onClick={() => toggleUnit("Celsius")}
                  className={
                    temperatureUnit === "Celsius"
                      ? "fw-semibold"
                      : `${css.color}`
                  }
                >
                  °C
                </span>
                <span className="ms-2 me-1">|</span>
                <span
                  onClick={() => toggleUnit("Fahrenheit")}
                  className={
                    temperatureUnit === "Fahrenheit"
                      ? "fw-semibold"
                      : `${css.color}`
                  }
                >
                  °F
                </span>
              </h5>
            </div>
            <p className={css.color}>
              {t("Feels like")}: {temperatureValue}
              {temperatureUnit === "Celsius" ? "°C" : "°F"}
            </p>
          </Col>
          <Col xs={6}>
            <div className="pt-2">
              <p className="m-0">
                {t("Wind")}:{" "}
                <span className={css[tempClass]}>
                  {getFormattedRound(currentWeather.wind.speed)} {t("UnitWind")}
                </span>
              </p>
              <p className="m-0">
                {t("Humidity")}:{" "}
                <span className={css[tempClass]}>
                  {currentWeather.main.humidity}%
                </span>
              </p>
              <p className="m-0">
                {t("Pressure")}:{" "}
                <span className={css[tempClass]}>
                  {currentWeather.main.pressure}
                  {t("UnitPressure")}
                </span>
              </p>
              <button
                onClick={() => removeCard(index)}
                className={css.remove_button}
              >
                <MdClose />
              </button>
            </div>
          </Col>
        </Row>
      </Col>
    </Col>
  );
};

export default WeatherCard;
