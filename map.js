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
        this.place_chests()
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
        this.place_chests()
        this.cells[this.diamond_x][this.diamond_y].object = "Royal Diamonds";
        return;
    }
}



//Member Functions:

//These functions move the hero.  They call the hero's move functions, and they
// check to see if the hero needs to wrap to the other side of the map.

//MOVE NORTH
Map.prototype.move_north = function()
{
    //First, check to see if the hero is at the edge of the map.
    //If so, check if the other side of the map is water terrain.
    //If not, wrap the hero to the other side of the map. Otherwise,
    //Lose one energy without moving to the other side of the map.
    if(this.check_bounds_north()) {
        if(this.cells[this.hero.x][0].terrain !== 2) {
            this.wrap_north();
        }
    }
    //Otherwise, move the hero north
    else {
        //If the cell north of the hero is not water, the hero can move.
        //Otherwise, the hero does not move, and one energy is lost.
        if(this.cells[this.hero.x][this.hero.y+1].terrain !== 2) {
            this.hero.move_north();
        }
    }


    //update balances if hero PURCHASES a POWER BAR
    if(this.cells[this.hero.x][this.hero.y].object == "Power Bar") {
        this.powerBar();
    }

    // Compare hero's current cell terrain with bog value
    // and calls update hero stats tp deduct energy by 2
    if(this.cells[this.hero.x][this.hero.y].terrain == 4) {
        this.hero.update_energy(-2);
    }
    else{
        //update energy for one step
        this.hero.update_energy(-1);
    }

    //Update the Map.
    this.update();
};

// MOVE SOUTH
Map.prototype.move_south = function()
{
    //First, check to see if the hero is at the edge of the map.
    //If so, check to see if the other side of the map is water terrain.
    //If not, wrap the hero to the other side of the map. Otherwise,
    //lose one energy without moving.
    if(this.check_bounds_south()) {

        if(this.cells[this.hero.x][this.height-1].terrain !== 2) {
            this.wrap_south();
        }
    }
    //Otherwise, move the hero south
    else {
        //If the cell south of the hero is not water, the hero can move.
        //Otherwise, the hero does not move, and one energy is lost.
        if(this.cells[this.hero.x][this.hero.y-1].terrain !== 2) {
            this.hero.move_south();
        }
    }


    //update balances if hero PURCHASES a POWER BAR
    if(this.cells[this.hero.x][this.hero.y].object == "Power Bar") {
        this.powerBar();
    }

    // Compare hero's current cell terrain with bog value
    // and calls update hero stats tp deduct energy by 2
    if(this.cells[this.hero.x][this.hero.y].terrain == 4) {
        this.hero.update_energy(-2);
    }
    else{
        //update energy for one step
        this.hero.update_energy(-1);
    }

    //Update the Map.
    this.update();
};

//MOVE EAST
Map.prototype.move_east = function()
{
    //First, check to see if the hero is at the edge of the map.
    //If so, check if the other side of the map is water terrain.
    //If not, wrap the hero to the other side of the map. Otherwise,
    //lose one energy without moving.
    if(this.check_bounds_east()) {
        if(this.cells[0][this.hero.y].terrain !== 2) {
            this.wrap_east();
        }
    }
    //Otherwise, move the hero east
    else {
        //If the cell east of the hero is not water, the hero can move.
        //Otherwise, the hero does not move, and one energy is lost.
        if(this.cells[this.hero.x+1][this.hero.y].terrain !== 2) {
            this.hero.move_east();
        }
    }


    //update balances if hero PURCHASES a POWER BAR
    if(this.cells[this.hero.x][this.hero.y].object == "Power Bar") {
        this.powerBar();
    }

    // Compare hero's current cell terrain with bog value
    // and calls update hero stats tp deduct energy by 2
    if(this.cells[this.hero.x][this.hero.y].terrain == 4) {
        this.hero.update_energy(-2);
    }
    else{
        //update energy for one step
        this.hero.update_energy(-1);
    }

    //Update the Map.
    this.update();
};

// MOVE WEST
Map.prototype.move_west = function()
{
    //First, check to see if the hero is at the edge of the map.
    //If so, check to see if the other side of the map is water terrain.
    //If not, wrap the hero to the other side of the map. Otherwise,
    //lose one energy without moving.
    if(this.check_bounds_west()) {
        if(this.cells[this.width-1][this.hero.y].terrain !== 2) {
            this.wrap_west();
        }
    }
    //Otherwise, move the hero west
    else {
        //If the cell west of the hero is not water, the hero can move.
        //Otherwise, the hero does not move, and one energy is lost.
        if(this.cells[this.hero.x-1][this.hero.y].terrain !== 2) {
            this.hero.move_west();
        }
    }


    //update balances if hero PURCHASES a POWER BAR
    if(this.cells[this.hero.x][this.hero.y].object == "Power Bar") {
        this.powerBar();
    }

    // Compare hero's current cell terrain with bog value
    // and calls update hero stats tp deduct energy by 2
    if(this.cells[this.hero.x][this.hero.y].terrain == 4) {
        this.hero.update_energy(-2);
    }
    else{
        //update energy for one step
        this.hero.update_energy(-1);
    }

    //Update the Map.
    this.update();
};




//These functions will check to see if the hero is at the edge of the map.
//  They will return true if the hero is at the edge of the map, and false
//  otherwise.
Map.prototype.check_bounds_north = function()
{
    //If the hero is at the top of the map, return true.
    if(this.hero.y === this.height-1)
        return true;
    return false;
};
Map.prototype.check_bounds_south = function()
{
    //If the hero is at the bottom of the map, return true.
    if(this.hero.y === 0)
        return true;
    return false;
};
Map.prototype.check_bounds_east = function()
{
    //If the hero is at the rightmost side of the map, return true.
    if(this.hero.x === this.width-1)
        return true;
    return false;
};
Map.prototype.check_bounds_west = function()
{
    //If the hero is at the leftmost side of the map, return true.
    if(this.hero.x === 0)
        return true;
    return false;
};



//These functions will wrap the hero to the other side of the map, when
//  they are on the edge of the map.
Map.prototype.wrap_north = function()
{
    //If the hero is at the top of the map, set their y to the bottom.
    this.hero.y = 0;
};
Map.prototype.wrap_south = function()
{
    //If the hero is at the bottom of the map, set their y to the top.
    this.hero.y = this.height-1;
};
Map.prototype.wrap_east = function()
{
    //If the hero is at the eastmost edge of the map, set their x to
    //  the leftmost edge.
    this.hero.x = 0;
};
Map.prototype.wrap_west = function()
{
    //If the hero is at the westmost edge of the map, set their x to
    //  the eastmost edge.
    this.hero.x = this.width-1;
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
    var view_distance = 1;
    //Update the map to set the tiles around the hero to be visible:
    var start_i = this.hero.x - view_distance;
    if (start_i < 0) {
        start_i = 0;
    }
    var start_j = this.hero.y-view_distance;
    if (start_j < 0) {
        start_j = 0;
    }
    for (var i = start_i; (i <= this.hero.x + view_distance) && (i < this.width); ++i) {
        for (var j = start_j; (j <= this.hero.y + view_distance) && (j < this.height); ++j) {
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
    //check chests
    if(this.cells[this.hero.x][this.hero.y].object == "Chest 1"){
        this.hero.update_whiffles(100);
        this.cells[this.hero.x][this.hero.y].object = "None";
    }

    if(this.cells[this.hero.x][this.hero.y].object == "Chest 2"){
        this.hero.whiffles = 0;
        this.cells[this.hero.x][this.hero.y].object = "None";
    }

    //check diamonds
    if ((this.hero.x === this.diamond_x) && (this.hero.y === this.diamond_y))
        this.player_won();

    //check energy level
    if (this.hero.energy <= 0)
        this.player_lost();
};

// Places a number of treasure chests on the map cells randomly
Map.prototype.place_chests = function(){
    var amount = 5;
    var x, y, type;
    for (var i = 0; i < amount; ++i){
        x = Math.floor(Math.random() * this.width);
        y = Math.floor(Math.random() * this.height);
        type = Math.floor(Math.random() * 2);
        if (type == 1){
          this.cells[x][y].object = "Chest 1";
        }
        else{
          this.cells[x][y].object = "Chest 2";
        }
    }
}

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
                        // Diamonds
                        result += "<span style=\"color:blue;\">D</span>";
                        break;
                    case "Chest 1":
                        //chest type 1
                        result += "<span style=\"color:orange;\">C</span>";
                        break;
                    case "Chest 2":
                        //chest type 2 looks the same as 1
                        result += "<span style=\"color:orange;\">C</span>";
                    case "Power Bar":
                        // Power Bar
                        result += "P";
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
}


Map.prototype.powerBar = function ()
{
    //prompt user
    var result = window.confirm("Would You like to purchase a POWER BAR for 1 Whiffle?");
    if (result){
        //if purchased, remove from mapCell
        this.cells[this.hero.x][this.hero.y].object = "None";
        this.hero.update_energy(20);
        this.hero.update_whiffles(-1);
    }
}
