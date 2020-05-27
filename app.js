const express = require("express");
const https = require("https");
const app = express();
const bodyparser = require("body-parser");
app.use(bodyparser.urlencoded({extneded:true}));
app.get("/", function(req,res){
        res.sendFile(__dirname + "/index.html");
});
app.post("/", function(req,res){
    const location= req.body.cityName;
    const apikey= "eba140520b70ee5b66bf6e90c154e4c1";
    const units="imperial";
    const apiurl = "https://api.openweathermap.org/data/2.5/weather?q="+location+"&appid="+ apikey +"&units="+units;
    https.get(apiurl, function(response){

        response.on("data", function(data){
        const weatherdata = JSON.parse(data);
   
        const temp = weatherdata.main.temp;
        const weatherdescription = weatherdata.weather[0].description;
        const weathericon = weatherdata.weather[0].icon;
        const imageurl = "https://openweathermap.org/img/wn/" + weathericon + "@2x.png";
   
        res.write("<h1>The temperature in "+ location +" is "+ temp +" degreees Fahrenheit.</h1>");
        res.write("<p> The weather is currently " + weatherdescription + ".</p>");
        res.write("<img src=" + imageurl +">");
        res.send();
        })
     });
});
  
app.listen(3000, function(){
    console.log("server up on port 3k");
});