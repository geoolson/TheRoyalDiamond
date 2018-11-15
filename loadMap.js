
//opens file then calls the parser
var openFile = function(event){
    var input = event.target;

    var reader = new FileReader();
    reader.onload = function(){
        text = reader.result;
        dimensions(text);
        game_map.update();
    };
    reader.readAsText(input.files[0]);
};


function dimensions(){
    var result = parseNum();
    if(result)
        playerInfo(result);
    else
        alert("invalid file");
}

function playerInfo(dim){
    var x = parseNum();
    var y = parseNum();
    var energy = parseNum();
    var whiffles = parseNum();

    if( areDimensionsValid(dim, x, y) )
    {
        game_map = new Map(dim, dim, x, y, energy, whiffles);
        parseInventory();
    }
}

// Compares the integer value of the set dimensions
// to the set x and y coordinates that the hero is
// supposed to start at. If the coordinates are not
// valid, the user is alerted and redirected
// to the welcome page.
function areDimensionsValid(dim, x, y){

    // Compare set dimensions to x and y coordinates
    if(x > dim || y > dim)
    {
        alert("Invalid player coordinates. Load a different file or fix the current one.");
        window.location.replace("index.html");
    }
    // The coordinates to dimensions are valid
    else
        return true;
}

function parseInventory(){
    var result = parseNextString();
    //if delimiter is reached begin parsing the game Cells.
    if(text[3] === '#')
        parseCell();
    else
        parseInventory();
}

function parseCell(){
    text = text.trim();
    var x = parseNum();
    var y = parseNum();

    var visible = parseNum();
    var terrain = parseNum();
    var object = parseNextString();

    //checking if eof was reached
    if(isNaN(x))
        return;
    game_map.cells[x][y] = new mapCell(x, y, visible, terrain, object);
    parseCell();
}

function parseNum(){
    var pattern = /[0-9]+/;
    if(text){
        var result = pattern.exec(text);
        text = text.substr(result.index + result[0].length, text.length);
        return parseInt(result);
    }
}

function parseNextString(){
    var pattern = /[A-z ]+/;
    if(text){
        var result = pattern.exec(text);
        text = text.substr(result.index + result[0].length, text.length);
        return result[0];
    }
}
