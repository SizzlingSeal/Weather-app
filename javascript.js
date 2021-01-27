var countriesList;
var cityName, countryCode;
var apiKey ="dfdbfa904539422f381617199f857fac";

window.addEventListener("load", loadCountries());

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
}
});

document.getElementById("countries-input").addEventListener("focusin", () =>{
    document.getElementById("cities-input").disabled = true;
});

async function getWeather(){
    try{
    cityName = document.getElementById("cities-input").value;
    const resp = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName},${countryCode}&appid=${apiKey}`);
    var weatherAPI = await resp.json();
    console.log(weatherAPI);
    var cityID = weatherAPI.id;

    //openweathermap API widget
    if(weatherAPI.cod == "404"){
        document.getElementById("openweathermap-widget-11").innerHTML ="<h2>Country not Found</h2>";
    }else{
    document.getElementById("openweathermap-widget-11").innerHTML ="";
    window.myWidgetParam ? window.myWidgetParam : window.myWidgetParam = [];
    window.myWidgetParam.push({
          id: 11,
          cityid: cityID,
          appid: 'dfdbfa904539422f381617199f857fac',
          units: 'imperial',
          containerid: 'openweathermap-widget-11',  
        });
    (function(){
    var script = document.createElement('script');
    script.async = true;script.charset = "utf-8";
    script.src = "//openweathermap.org/themes/openweathermap/assets/vendor/owm/js/weather-widget-generator.js";
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(script, s);  
    })();
    }

    }catch (e){
    document.getElementById("openweathermap-widget-11").innerHTML ="";
    console.log("Country not found");
    }
};






