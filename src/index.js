require('dotenv').config()

const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args))

const Telegraf = require('telegraf-develop')
const sendGif = require('./composers/sendGif.composer')
const sendWeather = require('./composers/sendWeather.composer')
const welcomeMessage = require('./composers/welcomeMessage.composer')
const farewellMessage = require('./composers/farewellMessage.composer')

const bot = new Telegraf(process.env.BOT_TOKEN)

bot.use(sendGif)
bot.use(sendWeather)
bot.use(welcomeMessage)
bot.use(farewellMessage)

bot.launch(console.log('Я живой!'))
