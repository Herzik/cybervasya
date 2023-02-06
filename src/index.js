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

//===============================
//NOTE: Реализация мута пользователе. Необходимо переписать и вынести в отдельный композер
//===============================

bot
  .command('mute', ctx => {
    const chatId = ctx.chat.id
    const userId = ctx.message.reply_to_message.from.id
    const userName = ctx.message.reply_to_message.from.first_name

    bot.telegram
      .getChatMember(chatId, userId)
      .then(member => {
        if (member.status === 'administrator' || member.status === 'creator') {
          return ctx.reply('Вы не можете трогать администраторов чата!')
        }

        bot.telegram
          .restrictChatMember(chatId, userId, {
            can_send_messages: false,
            can_send_media_messages: false,
            can_send_other_messages: false,
            can_add_web_page_previews: false,
          })
          .then(() =>
            ctx.reply(`Пользователь <a href="tg://user?id=${userId}">${userName}</a> заткнулся. `, {
              parse_mode: 'HTML',
            })
          )
          .catch(error => {
            ctx.reply('Я не могу этого сделать!')
            console.error(error)
          })
      })
      .catch(err => console.log(err))
  })
  .catch(err => console.log('Ошибка!', err))

bot
  .command('unmute', ctx => {
    const chatId = ctx.chat.id
    const userId = ctx.message.reply_to_message.from.id
    const userName = ctx.message.reply_to_message.from.first_name

    bot.telegram
      .getChatMember(chatId, userId)
      .then(member => {
        if (member.status === 'administrator' || member.status === 'creator') {
          return ctx.reply('Вы не можете трогать администраторов чата!')
        }

        bot.telegram
          .restrictChatMember(chatId, userId, {
            can_send_messages: true,
            can_send_media_messages: true,
            can_send_other_messages: true,
            can_add_web_page_previews: true,
          })
          .then(() =>
            ctx.reply(
              `Пользователь <a href="tg://user?id=${userId}">${userName}</a> может говорить.`,
              {
                parse_mode: 'HTML',
              }
            )
          )
          .catch(error => {
            ctx.reply('Я не могу этого сделать!')
            console.error(error)
          })
      })
      .then(err => console.log(err))
  })
  .catch(err => console.log('Ошибка!', err))

//===============================

bot.launch(console.log('Я живой!'))
