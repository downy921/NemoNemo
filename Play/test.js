
const test=document.getElementById('test');
var game;

function readTextFile(file)
{

    var allText;
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = function ()
    {
        if(rawFile.readyState === 4)
        {
            if(rawFile.status === 200 || rawFile.status == 0)
            {
                allText = rawFile.responseText;
                
        
            }
        }
    }
    rawFile.send(null);

    var newArr = JSON.parse(allText);
    game=newArr;
    return allText
}

readTextFile("../Data/sample_data.json");

var fs =require('fs');

