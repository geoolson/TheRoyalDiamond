
var game_map;

//opens file then calls the parser
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
    //alert("dimensions = " + result);
    var str = file.substr(result.index + result[0].length, file.length);
    if(result)
        playerLocation(str, result);
    else
        alert("invalid file");
}

function playerLocation(file, dim){
    //x position
    var pattern = /[0-9]+/;
    var x = pattern.exec(file);
    var str = file.substr(x.index + x[0].length, file.length);
    //alert("x coordinate = " + x);

    //y position
    var y = pattern.exec(str);
    str = str.substr(y.index + y[0].length, str.length);
    //alert("y coordinate = " + y);

    //energy
    var energy = pattern.exec(str);
    str = str.substr(energy.index + energy[0].length, file.length);
    //alert("energy = " + energy);

    //whiffles
    var whiffles = pattern.exec(str);
    str = str.substr(whiffles.index + whiffles[0].length, str.length);
    //alert("whiffles = " + whiffles);


    // This checks the dimensions from the file
    // and compares it to the x and y from the file
    // to make sure that a player is not placed somewhere
    // not within the map.
    checkValidityDimensions(dim, x, y);


    game_map = new Map(dim, dim, x, y, energy, whiffles);

    parseInventory(str);
}

// Compares the integer value of the set dimensions
// to the set x and y coordinates that the hero is
// supposed to start at. If the coordinates are not
// valid, the user is alerted and redirected
// to the welcome page.
function checkValidityDimensions(dim, x, y){
    // The variable dim (dimensions) is converted 
    // to an integer.
    var intDim = parseInt(dim);

    // Compare set dimensions to x and y coordinates
    if(x > intDim || y > intDim)
    {
        alert("Invalid player coordinates. Load a different file or fix the current one.");
        window.location.replace("welcome.html");
    }
    // The coordinates to dimensions are valid
    else
        return;
}

function parseInventory(file){
    var pattern = /[A-z ]+/;
    var result = pattern.exec(file);
    var str = file.substr(result.index + result[0].length, file.length);
    //alert("item = " + result);

    //if delimiter is reached begin parsing the game Cells.
    if(str[3] === '#')
        parseCell(str);
    else
        parseInventory(str);
}

function parseCell(file){
    //x position
    var pattern = /[0-9]+/;
    var x = pattern.exec(file);
    var str = file.substr(x.index + x[0].length, file.length);
    //alert("x coordinate = " + x);

    //y position
    var y = pattern.exec(str);
    str = str.substr(y.index + y[0].length, str.length);
    //alert("y coordinate = " + y);

    //visibility
    pattern = /[0-1]/;
    var visible = pattern.exec(str);
    str = str.substr(visible.index + visible[0].length, str.length);
    //alert("visible = " + visible);

    //terrain id
    pattern = /[0-9]+/;
    var terrain = pattern.exec(str);
    str = str.substr(terrain.index + terrain[0].length, str.length);
    //alert("terrain id = " + terrain);

    //object string
    pattern = /[A-z ]+/;
    var object = pattern.exec(file);
    str = file.substr(object.index + object[0].length, str.length);
    //alert("object string = " + object);

    //checking if eof was reached
    if(isNaN(x))
        return;
    game_map.cells[x][y] = new mapCell(x, y, visible, terrain, object);
    parseCell(str);
}

