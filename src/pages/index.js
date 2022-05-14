import "./index.css";
import "core-js/stable";
import "regenerator-runtime/runtime";
import { getCoord, getWeatherRequest } from "../components/api";

const button = document.querySelector(".button");
const weatherForm = document.forms.weather;
const weatherInput = weatherForm.elements.weather;
const heading = document.querySelector(".heading");
const iframe = document.querySelector(".iframe");
let lat;
let lon;

// heading.append(createMap(lat,lon))

console.log(iframe);

const getWeather = (e) => {
  e.preventDefault();
  getCoord(weatherInput.value).then((data) => {
    getWeatherRequest(data[0].lat, data[0].lon).then((data) => {
      console.log(data.weather);
      const city = createForecast({
        name: data.name,
        main: Math.floor(data.main.temp - 273) + "°C",
        weather:
          data.weather[0].main === "Clouds"
            ? "ed6d814c976b7a0f1d97.png"
            : data.weather[0].main === "Clear"
            ? "0b43f5c98c23439dcf48.png"
            : "ed6d814c976b7a0f1d97.png",
      });

      weatherForm.append(city);
    });

    lat = data[0].lat;
    lon = data[0].lon;

    iframe.setAttribute(
      "src",
      `https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d576587.6582438038!2d${lon}!3d${lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sru!2sru!4v1652100284601!5m2!1sru!2sru`
    );
  });
};

button.addEventListener("click", getWeather);

const createForecast = (element) => {
  const template = document.querySelector(".template").content;
  const city = template.querySelector(".city").cloneNode(true);
  const heading = city.querySelector(".city_heading");
  const temperature = city.querySelector(".city_temp");
  const img = city.querySelector(".city_img");
  const main = city.querySelector(".city_main");

  heading.textContent = element.name;
  temperature.textContent = element.main;
  main.src = element.weather;

  return city;
};




navigator.geolocation.getCurrentPosition(function(position) {
    console.log(position.coords.latitude, position.coords.longitude);
    getWeatherRequest(position.coords.latitude, position.coords.longitude).then((data) => {
        console.log(data.weather);
        const city = createForecast({
          name: data.name,
          main: Math.floor(data.main.temp - 273) + "°C",
          weather:
            data.weather[0].main === "Clouds"
              ? "ed6d814c976b7a0f1d97.png"
              : data.weather[0].main === "Clear"
              ? "0b43f5c98c23439dcf48.png"
              : "ed6d814c976b7a0f1d97.png",
        });
  
        weatherForm.append(city);
      });
      iframe.setAttribute(
        "src",
        `https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d576587.6582438038!2d${position.coords.longitude}!3d${position.coords.latitude}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sru!2sru!4v1652100284601!5m2!1sru!2sru`
      );
  });