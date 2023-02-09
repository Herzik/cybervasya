require('dotenv').config()

const Telegraf = require('telegraf-develop')
const sendGif = require('./composers/sendGif.composer')
const sendWeather = require('./composers/sendWeather.composer')
const welcomeMessage = require('./composers/welcomeMessage.composer')
const farewellMessage = require('./composers/farewellMessage.composer')
const muteUser = require('./composers/muteUser.composer')
const banUser = require('./composers/banUser.composer')

const bot = new Telegraf(process.env.BOT_TOKEN)

bot.telegram.setMyCommands([
  { command: 'ban', description: 'Забананить' },
  { command: 'unban', description: 'Разбананить' },
  { command: 'mute', description: 'Замутить (лишить голоса)' },
  { command: 'unmute', description: 'Размутить' },
])

bot.use(sendGif)
bot.use(sendWeather)
bot.use(welcomeMessage)
bot.use(farewellMessage)
bot.use(muteUser).catch(err => console.error(err))
bot.use(banUser)

bot.launch(console.log('Я живой!'))

process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))
