require('dotenv').config()

const Telegraf = require('telegraf-develop')
const sendGif = require('./composers/sendGif.composer')
const sendWeather = require('./composers/sendWeather.composer')
const welcomeMessage = require('./composers/welcomeMessage.composer')
const farewellMessage = require('./composers/farewellMessage.composer')
const muteUser = require('./composers/muteUser.composer')
const banUser = require('./composers/banUser.composer')
const bot = new Telegraf(process.env.BOT_TOKEN)

bot.use(sendGif)
bot.use(sendWeather)
bot.use(welcomeMessage)
bot.use(farewellMessage)
bot.use(muteUser).catch(err => console.error(err))
bot.use(banUser)

bot.launch(console.log('Я живой!'))
