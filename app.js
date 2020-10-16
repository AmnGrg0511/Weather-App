const express=require("express");
const https=require("https");
const bodyParser=require("body-parser");

const app=express();
app.use(bodyParser.urlencoded({extended:true}))

app.get("/",function(req,res){
  res.sendFile(__dirname+"/index.html");
});

app.post("/",function(req,res){

  const query=req.body.query;
  const url="https://api.openweathermap.org/data/2.5/weather?q="+query+"&units=metric&APPID=8d3dc4987bea2cc6abfccd5aa79ebea8#";
  https.get(url,function(response){
    console.log(response.statusCode);

    response.on("data",function(data){
      const weatherData=JSON.parse(data);
      const temp=weatherData.main.temp;
      const ftemp=weatherData.main.feels_like;
      const desc=weatherData.weather[0].description;
      const icon=weatherData.weather[0].icon;
      const image="http://openweathermap.org/img/wn/"+icon+"@2x.png";
      res.set("content-type", "text/html");
      res.write("<img src="+image+">");
      res.write("<h3>The weather is currently "+desc+". </h3>");
      res.write("<h2>The temprature in "+query+" is "+temp+" °C , feels like "+ftemp+ " °C.</h2>");
      res.send();
    });
  });
});

app.listen(3000,function(){
  console.log("listening to port 3000");
});
