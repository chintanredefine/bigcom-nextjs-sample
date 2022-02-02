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

      const {STAMPED_API_KEY_PUBLIC} = process.env
      const {STAMPED_TOKEN} = process.env

      var options = {
        "method": "POST",
        "hostname": "stamped.io",
        "port": null,
        "path": "/api/widget/badges?isIncludeBreakdown=true&isincludehtml=true",
        "headers": {
          "authorization": "Basic " + STAMPED_TOKEN,
          "content-type": "application/json",
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
    		    console.log(body.toString());
            resposne.json(JSON.parse(body))
          });
      });

      req.write(JSON.stringify({ productIds: [ { productId: id } ],
        apiKey: STAMPED_API_KEY_PUBLIC,
        storeUrl: 'sleekshop.com' 
      }));
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
