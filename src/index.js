require('dotenv').config()

const Telegraf = require('telegraf-develop')
const sendGif = require('./composers/sendGif.composer')
const sendWeather = require('./composers/sendWeather.composer')
const welcomeMessage = require('./composers/welcomeMessage.composer')
const farewellMessage = require('./composers/farewellMessage.composer')
const muteUser = require('./composers/muteUser.composer')
const banUser = require('./composers/banUser.composer')
const deleteMessage = require('./composers/deleteMessage.composer')

const bot = new Telegraf(process.env.BOT_TOKEN)

bot.telegram.setMyCommands([
  { command: 'ban', description: 'Забананить' },
  { command: 'unban', description: 'Разбананить' },
  { command: 'mute', description: 'Замутить (лишить голоса)' },
  { command: 'unmute', description: 'Размутить' },
  { command: 'del', description: 'Удалить сообщение' },
])

bot.use(sendGif)
bot.use(sendWeather)
bot.use(welcomeMessage)
bot.use(farewellMessage)
bot.use(muteUser).catch(err => console.error(err))
bot.use(banUser)
bot.use(deleteMessage)

bot.launch(console.log('Я живой!'))

//Коректно остановит соединение при останове процессов
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))
