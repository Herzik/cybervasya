const { Composer } = require('telegraf-develop')

const composer = new Composer()

function welcomeMessage(ctx) {
  ctx.reply(
    `Приветствую тебя, <a href="tg://user?id=${ctx.update.message.new_chat_member.id}">${ctx.update.message.new_chat_member.first_name}</a>. Для начала представься участникам чата! Назови свои имя, возраст и место жительства. А дальше посмотрим!`,
    { parse_mode: 'HTML' }
  )
}

composer.on('new_chat_members', ctx => welcomeMessage(ctx))

module.exports = composer
