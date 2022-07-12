const express=require("express");
const https=require("https");
const bodyParser=require("body-parser");
const path=require("path");

const app=express();

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,'public')))
app.set('view engine','ejs');

app.get("/",function(req,res){
    res.sendFile(__dirname+"/views/index.html");
});


app.post("/",function(req,res){
    
    const query=req.body.cityName;
    const apiKey="f0288cda4478e63dc2f6011b85c81815";
    unit="metric";
    const url="https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apiKey+"&units="+unit;
    https.get(url,function(response){
        response.on("data",function(data){
            const weatherData=JSON.parse(data);
            const temp=weatherData.main.temp;
            const desc=weatherData.weather[0].description;
            const icon=weatherData.weather[0].icon;
            const imgURL="http://openweathermap.org/img/wn/"+icon+"@2x.png";
            const feeling=weatherData.main.feels_like;
            const min=weatherData.main.temp_min;
            const max=weatherData.main.temp_max;
            const country=weatherData.sys.country;
            const hum=weatherData.main.humidity;
            
            res.render("weather",{image:imgURL,temprature:temp,descInWeb:desc,city:query,con:country,mintemp:min,maxtemp:max,feelsLike:feeling,humidity:hum});
            res.sendFile(__dirname+"/views/weather.ejs")
        });
    });
    
});


app.listen(3000,function(){
    console.log("server is running on port 3000");
});