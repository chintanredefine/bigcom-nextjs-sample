export default async (request, resposne) => {
  try {
    var http = require('https')
    const { id } = request.query

    if (!id) {
      resposne.status(200)
      resposne.json({
        status: 'error',
        message: 'Invalid Product ID',
      })
      return resposne
    }

    const { STAMPED_TOKEN } = process.env

    var options = {
      method: 'GET',
      hostname: 'stamped.io',
      port: null,
      path: '/api/v2/239827/dashboard/reviews/?productId=' + id,
      headers: {
        authorization: 'Basic ' + STAMPED_TOKEN,
        'cache-control': 'no-cache',
      },
    }

    var req = http.request(options, function (res) {
      var chunks = []

      res.on('data', function (chunk) {
        chunks.push(chunk)
      })

      res.on('end', function () {
        var body = Buffer.concat(chunks)
        console.log(body.toString())
        resposne.status(200)
        resposne.json(JSON.parse(body))
      })
    })

    req.end()
  } catch (error) {
    resposne.status(200)
    resposne.json({
      status: 'error',
      message: error,
    })
  }
  return resposne
}
