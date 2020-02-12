const express = require('express');
const router = express.Router();
const request = require('request');

router.post("/", async function(req, res){
  var url = "https://soc.courseoff.com/" + req.param('school') + "/terms"
  await request(url, function(error, response, body){
    if (!error && response.statusCode == 200) {
      res.set('Access-Control-Allow-Origin', '*');
      res.send(body);
    }
  });
});

module.exports = router;
