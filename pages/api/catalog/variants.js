
export default async (request, resposne) => {
  try {
      var http = require("https");
      const {id} = request.query

      if(!id){
        resposne.status(200)
        resposne.json({
            "status": "error",
            "message": "Invalid Product ID"
        })
        return resposne;
      }

      const {BIGCOMMERCE_STORE_API_URL} = process.env
      const {BIGCOMMERCE_STORE_API_TOKEN} = process.env

      var options = {
        "method": "GET",
        "hostname": "api.bigcommerce.com",
        "port": null,
        "path": `${BIGCOMMERCE_STORE_API_URL}/v3/catalog/products/${id}/variants`,
        "headers": {
          "x-auth-token": `${BIGCOMMERCE_STORE_API_TOKEN}`,
          "cache-control": "no-cache"
        }
      };

      var req = http.request(options, function (res) {
        var chunks = [];

        res.on("data", function (chunk) {
          chunks.push(chunk);
        });

         res.on("end", function () {
            var body = Buffer.concat(chunks);
            resposne.status(200)
            // resposne.json(body.toString())
            resposne.json(JSON.parse(body))
          });
      });

      req.end();
  } catch (error) {
      resposne.status(200)
      resposne.json({
          "status": "error",
          "message": error
      })
  }
  return resposne;

}
