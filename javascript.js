var countriesList;
//For getting the api later
var cityName, countryCode;
var apiKey ="dfdbfa904539422f381617199f857fac";
//---------------------------------------------
window.addEventListener("load", loadCountries());

document.getElementById("countries-input").addEventListener("change", () => {
    try{
    //inserting cities in the input
    document.getElementById("cities").innerHTML = "";
    document.getElementById("cities-input").disabled = false;

    var input = document.getElementById("countries-input").value;
    var city = countriesList[input];

    for(var i = 0 ;i < city.length; i++){
        var node = document.createElement("option");
        node.setAttribute("value", `${city[i]}`);
        document.getElementById("cities").appendChild(node);
    }

    getIso();

    }catch (e){
    console.log("No Country Input");
    console.log(e);
}
});

    document.getElementById("countries-input").addEventListener("focusin", () =>{
    document.getElementById("cities-input").disabled = true;
});

async function getWeather(){

    document.getElementById("openweathermap-widget-11").innerHTML ="";
    document.getElementById("openweathermap-widget-15").innerHTML ="";

    try{

    cityName = document.getElementById("cities-input").value;
    const resp = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName},${countryCode}&appid=${apiKey}`);
    var weatherAPI = await resp.json();
    var cityID = weatherAPI.id;
    var unit, container;

    if(document.getElementById('fahrenheit').checked) { //check what unit to use
        unit = 'imperial';
      }else{
        unit = 'metric';
      }

      if(screen.width <= 700){ //widget will change depending on the screen size
        container = 15;
      }else{
        container = 11;
      }

    //openweathermap API widget
    if(weatherAPI.cod == "404"){
        document.getElementById("openweathermap-widget-15").innerHTML ="<h2>Country not Found</h2>";
    }else{
        var script = document.createElement('script');
        var s = document.getElementsByTagName('script')[0];

        script.async = true;
        script.charset = "utf-8";
        script.src = "//openweathermap.org/themes/openweathermap/assets/vendor/owm/js/weather-widget-generator.js";
    
        window.myWidgetParam ? window.myWidgetParam : window.myWidgetParam = [];
        window.myWidgetParam.push({
          id: container,
          cityid: cityID,
          appid: apiKey,
          units: unit,
          containerid: `openweathermap-widget-${container}`,  
        });

        (function(){
            s.parentNode.insertBefore(script, s);  
        })();
    }
    }catch (e){
    document.getElementById("openweathermap-widget-11").innerHTML ="";
    document.getElementById("openweathermap-widget-15").innerHTML ="";
    console.log(e);
    }
}

async function loadCountries() {
    const resp = await fetch("./countries.json");
    countriesList = await resp.json();
    var countries = [];
    for(var c in countriesList) countries.push(c);
    for(var i =0; i < countries.length; i++){
        var node = document.createElement("option");
        node.setAttribute("value", `${countries[i]}`);
        document.getElementById("countries").appendChild(node);
    }
}

async function getIso(){
    const resp =await fetch("./isoCountries.json");
    var iso = await resp.json();
    var input = document.getElementById("countries-input").value;
    countryCode = iso[input];
}
