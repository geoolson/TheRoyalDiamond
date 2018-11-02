
var openFile = function(event){
    var input = event.target;

    var reader = new FileReader();
    reader.onload = function(){
        var text = reader.result;
        dimensions(text);
    }
    reader.readAsText(input.files[0]);
}

function dimensions(file){
    var pattern = /[0-9]+/;
    var result = pattern.exec(file);
    alert("dimensions = " + result);
    var str = file.substr(result.index + result[0].length, file.length);
    if(result)
    playerLocation(str);
}

function playerLocation(file){
    //x position
    var pattern = /[0-9]+/;
    var result = pattern.exec(file);
    var str = file.substr(result.index + result[0].length, file.length);
    alert("x coordinate = " + result);

    //y position
    pattern = /[0-9]+/;
    result = pattern.exec(str);
    str = str.substr(result.index + result[0].length, file.length);
    alert("y coordinate = " + result);

    parseInventory(str);
}

function parseInventory(file){
    var pattern = /[A-z ]+/;
    var result = pattern.exec(file);
    str = file.substr(result.index + result[0].length, file.length);
    alert("item = " + result);
    if(str[3] === '#')
        parseCell(str);
    else
        parseInventory(str);
}

function parseCell(file){
    //x position
    var pattern = /[0-9]+/;
    var result = pattern.exec(file);
    var str = file.substr(result.index + result[0].length, file.length);
    alert("x coordinate = " + result);

    //y position
    pattern = /[0-9]+/;
    result = pattern.exec(str);
    str = str.substr(result.index + result[0].length, file.length);
    alert("y coordinate = " + result);

    //visibility
    pattern = /[0-1]/;
    result = pattern.exec(str);
    str = str.substr(result.index + result[0].length, file.length);
    alert("visible = " + result);

    //terrain id
    pattern = /[0-9]+/;
    result = pattern.exec(str);
    str = str.substr(result.index + result[0].length, file.length);
    alert("terrain id = " + result);

    //content string
    pattern = /[A-z ]+/;
    result = pattern.exec(file);
    str = file.substr(result.index + result[0].length, file.length);
    alert("content string = " + result);
    parseCell(str);
}

