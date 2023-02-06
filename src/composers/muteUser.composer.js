const { Composer } = require('telegraf-develop')
const accessMiddleware = require('../middlewares/access.middleware')

const composer = new Composer()

composer.command('mute', accessMiddleware, ctx => {
  const chatId = ctx.chat.id
  const userId = ctx.message.reply_to_message.from.id
  const userName = ctx.message.reply_to_message.from.first_name

  ctx.telegram
    .getChatMember(chatId, userId)
    .then(member => {
      if (member.status === 'administrator' || member.status === 'creator') {
        return ctx.reply('Вы не можете трогать администраторов чата!')
      }

      ctx.telegram
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

composer.command('unmute', accessMiddleware, ctx => {
  const chatId = ctx.chat.id
  const userId = ctx.message.reply_to_message.from.id
  const userName = ctx.message.reply_to_message.from.first_name

  ctx.telegram
    .getChatMember(chatId, userId)
    .then(member => {
      if (member.status === 'administrator' || member.status === 'creator') {
        return ctx.reply('Вы не можете трогать администраторов чата!')
      }

      ctx.telegram
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

module.exports = composer
