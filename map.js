//Starting Map Class - This class will create a new Hero and keep track of him and his
// stats. Some of the functions in this map class will call functions in the hero class.
// This map class will communicate extensively with the hero class.

var game_map;
var text;

//map class constructor
function Map(width, height, starting_x, starting_y, starting_energy, starting_whiffles) {
    //default constructor
    if(width === undefined){
        //This creates a new hero, and passes the hero constructor the parameters
        this.hero = new Hero(0, 0, 10000,10000);
        this.width = 25;
        this.height = 25;
        this.diamond_x = 2;
        this.diamond_y = 2;
        this.cells = [[]];
        for (var i = 0; i < this.width; ++i) {
            this.cells[i] = [];
            for (var j = 0; j < this.height; ++j) {
                this.cells[i][j] = new mapCell();
            }
        }
        this.cells[this.diamond_x][this.diamond_y].object = "Royal Diamonds";
        return;
    }
    //copy constructor
    if(height === undefined ){
        var state = width;
        this.hero = new Hero(state.hero.x, state.hero.y, state.hero.energy, state.hero.whiffles);
        this.width = state.width;
        this.height = state.height;
        this.diamond_x = state.diamond_x;
        this.diamond_y = state.diamond_y;
        this.cells = state.cells;
        this.cells[this.diamond_x][this.diamond_y].object = "Royal Diamonds";
        return;
    }
    else{
        //This creates a new hero, and passes the hero constructor the parameters
        this.hero = new Hero(starting_x, starting_y, starting_energy, starting_whiffles);
        this.width = parseInt(width);
        this.height = parseInt(height);
        this.diamond_x = 2;
        this.diamond_y = 2;
        this.cells = [[]];
        for (var i = 0; i < this.width; ++i) {
            this.cells[i] = [];
            for (var j = 0; j < this.height; ++j) {
                this.cells[i][j] = new mapCell();
            }
        }
        this.cells[this.diamond_x][this.diamond_y].object = "Royal Diamonds";
        return;
    }
}



//Member Functions:

//These functions move the hero.  They call the hero's move functions, and they
// check to see if the hero needs to wrap to the other side of the map.

//The following are wrapper functions for the game.html
Map.prototype.move_north = function()
{
    this.move(0,1);
};
Map.prototype.move_south = function()
{
    this.move(0,-1);
};
Map.prototype.move_east = function()
{
    this.move(1,0);
};
Map.prototype.move_west = function()
{
    this.move(-1,0)
};

Map.prototype.move = function(x, y)
{
    this.hero.x = (this.hero.x + x) % this.width;
    this.hero.y = (this.hero.y + y) % this.height;
    if(this.hero.x < 0)
        this.hero.x = this.width -1;
    if(this.hero.y < 0)
        this.hero.y = this.height -1;

    //update energy
    this.hero.update_stats(1);
    this.isObstacle();
    //Update the Map.
    this.update();
};

Map.prototype.isObstacle = function()
{
   let currentObject = this.cells[this.hero.x][this.hero.y].object;
   if(currentObject === "Tree" || currentObject === "Boulder" || currentObject === "BlackBerry Bushes")
   {
       this.hero.energy -= 10;
       if(this.hero.energy <= 0)
           this.player_lost();
       else
           this.cells[this.hero.x][this.hero.y].object = "None";
   }
};


//This function will be called when the player has won the game.  It
// will do an end-game sequence.
Map.prototype.player_won = function()
{
    window.location.replace("win.html");
    localStorage.clear();
};


//This function will be called when the player has lost the game.  It
// will do an end-game sequence.
Map.prototype.player_lost = function()
{
    window.location.replace("lose.html");
    localStorage.clear();
};



//  update the web page's information with the current information about the hero.
//  It will also update the map's visibility.
Map.prototype.update = function()
{
    //Update the map to set the tiles around the hero to be visible:
    var start_i = this.hero.x - 1;
    if (start_i < 0) {
        start_i = 0;
    }
    var start_j = this.hero.y-1;
    if (start_j < 0) {
        start_j = 0;
    }
    for (var i = start_i; (i <= this.hero.x + 1) && (i < this.width); ++i) {
        for (var j = start_j; (j <= this.hero.y + 1) && (j < this.height); ++j) {
            this.cells[i][j].isVisible = true;
        }
    }
    //Update the map displayed on the page:
    document.getElementById("map_box").innerHTML = this.map_string();

    // Update the game state information displayed on the page:
    document.getElementById("location").value  = this.hero.display_location();
    document.getElementById("energy").value  = this.hero.display_energy();
    document.getElementById("whiffles").value  = this.hero.display_whiffles();
    document.getElementById("message").value  = message(this.hero, this.cells[this.hero.x][this.hero.y]);
    localStorage.setItem('map', JSON.stringify(game_map) );

    //check diamonds
    if ((this.hero.x === this.diamond_x) && (this.hero.y === this.diamond_y))
        this.player_won();

    //check energy level
    if (this.hero.energy <= 0)
        this.player_lost();
};



// Formats the map array as the contents of an HTML table.
Map.prototype.map_string = function() {
    result = "";
    for (var j = this.height-1; j >= 0; --j) {
        for (var i = 0; i < this.width; ++i) {
            var cell = this.cells[i][j];
            if (j === this.hero.y && i === this.hero.x) {
                result += "<b>@</b>";
            } else if(cell.isVisible) {
                switch(cell.object) {
                    case "Tree":
                        // Tree
                        result += "T";
                        break;
                    case "Boulder":
                        // Rock
                        result += "R";
                        break;
                    case "Blackberry Bushes":
                        // Bushes
                        result += "B";
                        break;
                    case "Royal Diamonds":
                        // Bushes
                        result += "<span style=\"color:blue;\">D</span>";
                        break;
                    case "None":
                        switch(cell.terrain) {
                            case 0:
                                // Meadow
                                result += "-";
                                break;
                            case 1:
                                // Forest
                                result += ";";
                                break;
                            case 2:
                                // Water
                                result += "~";
                                break;
                            case 3:
                                // Wall
                                result += "#";
                                break;
                            case 4:
                                // Bog
                                result += ",";
                                break;
                            case 5:
                                // Swamp
                                result += "%";
                                break;
                            default:
                                result += "?";
                                break;
                        }
                        break;
                    default:
                        result += "?";
                        break;
                }
            } else {
                result += " ";
            }
        }
        result += "<br>";
    }
    return result;
};
