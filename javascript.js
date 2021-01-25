fetch("./node_modules/all-countries-and-cities-json/countries.json")
.then((resp) => resp.json())
.then((json) => {
    console.log((json));
    var countries = [];
    for(var c in json) countries.push(c);
    for(var i =0; i < countries.length; i++){
        var node = document.createElement("option");
        node.setAttribute("value", `${countries[i]}`);
        document.getElementById("countries").appendChild(node);
        
    }
})