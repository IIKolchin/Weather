


function checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }



  export  const getCoord = async (city) => {
    const res = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=f944b0150cc655ed9449452d91d6e60c`, {

    });
    return checkResponse(res);
}

export  const getWeatherRequest = async (lat, lon) => {
    const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=f944b0150cc655ed9449452d91d6e60c`, {

    });
    return checkResponse(res);
}