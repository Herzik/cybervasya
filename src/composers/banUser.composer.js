const { Composer } = require('telegraf-develop')
const accessMiddleware = require('../middlewares/access.middleware')

const composer = new Composer()

composer.command('ban', accessMiddleware, async ctx => {
  if (!ctx.message.reply_to_message) {
    return ctx.reply('Сделай реплай юзера, что бы его забанить =)')
  }

  const chatId = ctx.chat.id
  const userId = ctx.message.reply_to_message?.from.id
  const userName = ctx.message.reply_to_message?.from.first_name

  ctx.telegram
    .getChatMember(chatId, userId)
    .then(member => {
      if (member.status === 'administrator' || member.status === 'creator') {
        return ctx.reply('Вы не можете трогать администраторов чата!')
      }
      ctx.telegram.banChatMember(chatId, userId).then(() => {
        ctx
          .reply(`Пользователь <a href="tg://user?id=${userId}">${userName}</a> канул в Лету. `, {
            parse_mode: 'HTML',
          })
          .catch(error => {
            ctx.reply('Я не могу этого сделать!')
            console.error(error)
          })
      })
    })
    .catch(err => console.log(err))
})

composer.command('unban', accessMiddleware, async ctx => {
  if (!ctx.message.reply_to_message) {
    return ctx.reply('Сделай реплай юзера, что бы его разбанить =)')
  }

  const chatId = ctx.chat.id
  const userId = ctx.message.reply_to_message?.from.id
  const userName = ctx.message.reply_to_message?.from.first_name

  ctx.telegram.getChatMember(chatId, userId).then(member => {
    if (member.status === 'administrator' || member.status === 'creator') {
      return ctx.reply('Вы не можете трогать администраторов чата!')
    }

    ctx.telegram
      .unbanChatMember(chatId, userId)
      .then(() => {
        ctx
          .reply(
            `Пользователь <a href="tg://user?id=${userId}">${userName}</a> снова может зайти. `,
            {
              parse_mode: 'HTML',
            }
          )
          .catch(error => {
            ctx.reply('Я не могу этого сделать!')
            console.error(error)
          })
      })
      .catch(err => console.log(err))
  })
})

module.exports = composer
