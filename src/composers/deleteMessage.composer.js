const { Composer } = require('telegraf-develop')
const accessMiddleware = require('../middlewares/access.middleware')

const composer = new Composer()

composer.command('del', accessMiddleware, async ctx => {
  if (!ctx.message.reply_to_message) {
    return ctx.reply('Сделай реплай сообщения, что бы его удалить')
  }
  const chatId = ctx.chat.id
  const messageId = ctx.message.message_id
  const messageIdReplay = ctx.message.reply_to_message.message_id

  setTimeout(() => {
    ctx.telegram.deleteMessage(chatId, messageIdReplay)

    ctx.telegram.deleteMessage(chatId, messageId), 3000
  }, 2000)
})

module.exports = composer
