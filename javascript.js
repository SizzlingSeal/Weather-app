fetch("./countries.json")
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
    document.getElementById("countries-input").addEventListener("focusout", () =>{
        document.getElementById("cities").innerHTML = "";
        var input = document.getElementById("countries-input").value;
        console.log(json[input]);
        var city = json[input];
        for(var i = 0 ;i < city.length; i++){
            var node = document.createElement("option");
            node.setAttribute("value", `${city[i]}`);
            document.getElementById("cities").appendChild(node);
        }
     });

})



