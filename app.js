const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({
  extended: true
}));


app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res) {

  const query = req.body.city;
  const appKey = "7cde1dff9d4ededf56f5517d6dd956cf";
  const unit = "metric";
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + appKey + "&units=" + unit;
  https.get(url, function(response) {
    console.log(response.statusCode);

    response.on("data", function(data) {
      var weatherData = JSON.parse(data);
      console.log(weatherData);

      // var myObj = {
      //   name:"Jacob",
      //   job: "programmer"
      // };
      //
      // console.log(myObj);
      // console.log(JSON.stringify(myObj));

      const temp = weatherData.main.temp;
      console.log("Temp in Thessaloniki is " + temp + " Celcius degrees");
      const description = weatherData.weather[0].description;
      console.log(description);
      const iconcode = weatherData.weather[0].icon;
      const iconUrl = "http://openweathermap.org/img/w/" + iconcode + ".png";

      res.write("<p>The weather has currently " + description + "</p>");
      res.write("<h1>The temperature in " + query + " is " + temp + " degrees Celcius.</h1>");
      res.write("<img src=\"" + iconUrl + "\" alt=\"Weather icon\">");
      res.send();

    })
  });

});


app.listen(3000, function() {
  console.log("Server is running on port 3000.");
});
