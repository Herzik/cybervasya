const { Composer } = require('telegraf-develop')

const composer = new Composer()

function farewellMessage(ctx) {
  ctx.reply(
    `Как жаль, что ты наконец-то ушел, <a href="tg://user?id=${ctx.message.left_chat_member.id}">${ctx.message.left_chat_member.first_name}</a>!`,
    {
      parse_mode: 'HTML',
    }
  )
}

composer.on('left_chat_member', ctx => farewellMessage(ctx))
module.exports = composer
