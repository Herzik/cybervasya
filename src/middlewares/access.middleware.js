module.exports = async (ctx, next) => {
  const chatId = ctx.chat.id
  const userId = ctx.from.id
  const member = await ctx.telegram.getChatMember(chatId, userId)

  if (
    member.status === 'administrator' ||
    member.status === 'creator' ||
    member.user.id == +process.env.ID_DEVELOPER
  ) {
    return next()
  } else {
    return ctx.reply('У вас недостаточно прав для использования этой команды!')
  }
}
