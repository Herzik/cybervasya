const { Composer } = require('telegraf-develop')
const getGif = require('../utility/getGif.utility')

const composer = new Composer()

function sendGif(ctx, tag) {
  getGif(tag)
    .then(data => ctx.replyWithAnimation(data.data.images.downsized.url))
    .catch(e => ctx.reply('Что то не так с гифками...'))
}

composer.hears(/^котики$/i, async ctx => sendGif(ctx, 'cats'))
composer.hears(/^собачки$/i, async ctx => sendGif(ctx, 'dogs'))
composer.hears(/^сиськи$/i, async ctx => sendGif(ctx, 'boobs'))
composer.hears(/^енотики$/i, async ctx => sendGif(ctx, 'raccoons'))

module.exports = composer
