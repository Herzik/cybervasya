function getGif(tag) {
  const url = `https://api.giphy.com/v1/gifs/random?api_key=${process.env.API_KEY_GIPHY}&tag=${tag}&rating=r`

  return fetch(url).then(res => res.json())
}

module.exports = getGif
