function getWeather(city) {
  const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&lang=ru&units=metric&appid=${process.env.API_KEY_WEATHER}`

  return fetch(url).then(res => res.json())
}

module.exports = getWeather
