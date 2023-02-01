const { Composer } = require('telegraf-develop')
const getWeather = require('../utility/getWeather.utility')

const composer = new Composer()

composer.hears(/^погода\s/i, async ctx => {
  const message = ctx.message.text

  getWeather(message.substring(7))
    .then(data => {
      const weatherMessage = `Погода в городе ${data.name}:
      За окном ${data.weather.find(weather => weather.description).description}.
      Температура ${Math.round(data.main.temp)}°, ощущается как ${Math.round(
        data.main.feels_like
      )}°.
      Влажность ${data.main.humidity}%`

      ctx.reply(weatherMessage)
    })
    .catch(e => ctx.reply(`Ошибка ${e}`))
})

module.exports = composer
