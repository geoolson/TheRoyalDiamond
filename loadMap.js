
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
    //The text variable is now exactly what it needs to be in order to load the inventory part in...
    //  because the parseNum function has truncated the text string to be whatever is inside the player's
    //  inventory.
    if( areDimensionsValid(dim, x, y) )
    {
        game_map = new Map(dim, dim, x, y, energy, whiffles);
        parseInventory(game_map);
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


function parseInventory(game_map){
    //Get First Inventory Item from the file:
    var result = parseNextString();
    //TODO: store the item in the hero's inventory
    alert(result);
    game_map.hero.inventory.add_item(result);
    //result is correct, store result in a new inventory item.
    //if delimiter is reached begin parsing the game Cells.
    if(text[2] === '#')
        parseCell();
    else
        parseInventory(game_map);
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


//This function will search for the first time a number appears in the game map string
//  and will truncate the game map string to ignore everything that occurs before the
//  first number (including the first number itself).  This function will then return 
//  the first number in the game map string as an int.
function parseNum(){
    var pattern = /[0-9]+/;
    //If the we have set text to be the game map string, then we execute the following code.
    if(text){
        //This sets result to be either null (if the pattern was not found), or a string of 
        //  what  we are looking for.  It parses text, looking for pattern.  And returns the 
        //  either a string, or null.  Pattern tells exec that it wants to take the first 
        //  sequence of numbers from text that appear, and ignore everything else.  In the 
        //  case of the default Frupal map, the first sequence of numbers that appear is "25".  
        //  Thus, result would contain: "25"
        var result = pattern.exec(text);
        //This takes text - which is the game map string - and takes a substring of it
        //  and stores that substring back to text.  The substring it takes starts at position
        //  (index of where result first starts to appear in text offset by the length of result)
        //  and continues to the length of the whole game map string.  Thus, effectively, anything
        //  that was written in "text" before result appears, and result itself get discarded from
        //  the game map string.
        text = text.slice(result.index + result[0].length, text.length);
        //This Parses result to an integer (because result is an integer in string form right now)
        //  and then returns it.
        return parseInt(result);
    }
}


//This function will return all the letters (including spaces) of the inventory items.
function parseNextString(){
    var pattern = /[A-z]+/;
    if(text){
        var result = pattern.exec(text);
        text = text.substr(result.index + result[0].length, text.length);
        return result[0];
    }
}
