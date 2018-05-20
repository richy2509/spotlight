var express = require("express");
var app = express();
var path = require("path");
var fs = require("fs");


app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname + '/index.html'));
  //__dirname : It will resolve to your project folder.
});

app.post("/search", function (req, res) {
  console.log("Send post request !");
  const queryParam = req.params.query;
  let content = fs.readFileSync(path.join(__dirname + '/public/mock/result.json'));
  res.send(JSON.parse(content));
});

app.use(express.static('public'));
app.use(express.static('bundle/standalone'));

app.listen(3000);

console.log("Running at Port 3000");