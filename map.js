//Starting Map Class - This class will create a new Hero and keep track of him and his
// stats. Some of the functions in this map class will call functions in the hero class.
// This map class will communicate extensively with the hero class.


function Map(width, height, starting_x, starting_y, starting_energy, starting_whiffles) {
    //Data Members:


    //This creates a new hero, and passes the hero constructor the parameters
    this.hero = new Hero(starting_x, starting_y, starting_energy, starting_whiffles);

    //width and height of the map
    this.width = parseInt(width);
    this.height = parseInt(height);

    //set diamond location
    this.diamond_x = 2;
    this.diamond_y = 2;

    //This creates an empty world
    this.cells = [[]];
    for (var i = 0; i < this.width; ++i) {
        this.cells[i] = [];
        for (var j = 0; j < this.height; ++j) {
            this.cells[i][j] = new mapCell();
        }
    }

    //This outputs the currently correct data values for the map
    //document.getElementById("location").innerHTML = this.hero.display_location();
    //document.getElementById("energy").innerHTML = this.hero.display_energy();
    //document.getElementById("whiffles").innerHTML = this.hero.display_whiffles();
    //document.getElementById("message").innerHTML = this.hero.display_message();
    document.forms[0].location.value = this.hero.display_location();
    document.forms[0].energy.value = this.hero.display_energy();
    document.forms[0].whiffles.value = this.hero.display_whiffles();
    document.forms[0].message.value = message(this.hero, this.cells[this.hero.x][this.hero.y]);

}

//Member Functions:

//This function builds the map.  It will create the map based on a text file
// read in from local storage.  If there is no file currently in local storage,
// this function will create the default one.
Map.prototype.build_map = function()
{
    //Try and get the map from local Storage
    var new_map = window.localStorage.getItem('map');

    //If "map" does not exist in local storage, we create the default map, and
    // store it in local storage.
    if(new_map == null)
    {
        //Create Default Map:
        window.localStorage.setItem('map','default_map');
    }
}


//These functions move the hero.  They call the hero's move functions, and they
// check to see if the hero needs to wrap to the other side of the map.
Map.prototype.move_north = function()
{
    //First, check to see if the hero is at the edge of the map,
    // if so, wrap the hero to the other side of the map.
    if(this.check_bounds_north())
    {
        this.wrap_north();
    }
    //Otherwise, move the hero north
    else
    {
        this.hero.move_north();
    }
    //update energy
    this.hero.update_stats(1);
    //Update the Map.
    this.update();

    //check diamonds
    if ((this.hero.x === this.diamond_x) && (this.hero.y === this.diamond_y))
        this.player_won();

    //check energy level
    if (this.hero.energy <= 0)
        this.player_lost();
}



Map.prototype.move_south = function()
{
    //First, check to see if the hero is at the edge of the map,
    // if so, wrap the hero to the other side of the map.
    if(this.check_bounds_south())
    {
        this.wrap_south();
    }
    //Otherwise, move the hero south
    else
    {
        this.hero.move_south();
    }

    //update energy
    this.hero.update_stats(1);
    //Update the Map.
    this.update();

    //check diamonds
    if ((this.hero.x === this.diamond_x) && (this.hero.y === this.diamond_y))
        this.player_won();

    //check energy level
    if (this.hero.energy <= 0)
        this.player_lost();
}



Map.prototype.move_east = function()
{
    //First, check to see if the hero is at the edge of the map,
    // if so, wrap the hero to the other side of the map.
    if(this.check_bounds_east())
    {
        this.wrap_east();
    }
    //Otherwise, move the hero south
    else
    {
        this.hero.move_east();
    }

    //update energy
    this.hero.update_stats(1);
    //Update the Map.
    this.update();

    //check diamonds
    if ((this.hero.x === this.diamond_x) && (this.hero.y === this.diamond_y))
        this.player_won();

    //check energy level
    if (this.hero.energy <= 0)
        this.player_lost();
}



Map.prototype.move_west = function()
{
    //First, check to see if the hero is at the edge of the map,
    // if so, wrap the hero to the other side of the map.
    if(this.check_bounds_west())
    {
        this.wrap_west();
    }
    //Otherwise, move the hero south
    else
    {
        this.hero.move_west();
    }

    //update energy
    this.hero.update_stats(1);
    //Update the Map.
    this.update();

    //check diamonds
    if ((this.hero.x === this.diamond_x) && (this.hero.y === this.diamond_y))
        this.player_won();

    //check energy level
    if (this.hero.energy <= 0)
        this.player_lost();
}




//These functions will check to see if the hero is at the edge of the map.
//  They will return true if the hero is at the edge of the map, and false
//  otherwise.
Map.prototype.check_bounds_north = function()
{
    //If the hero is at the top of the map, return true.
    if(this.hero.y === this.height-1)
        return true;
    return false;
}
Map.prototype.check_bounds_south = function()
{
    //If the hero is at the bottom of the map, return true.
    if(this.hero.y === 0)
        return true;
    return false;
}
Map.prototype.check_bounds_east = function()
{
    //If the hero is at the rightmost side of the map, return true.
    if(this.hero.x === this.width-1)
        return true;
    return false;
}
Map.prototype.check_bounds_west = function()
{
    //If the hero is at the leftmost side of the map, return true.
    if(this.hero.x === 0)
        return true;
    return false;
}


//These functions will wrap the hero to the other side of the map, when
//  they are on the edge of the map.
Map.prototype.wrap_north = function()
{
    //If the hero is at the top of the map, set their y to the bottom.
    this.hero.y = 0;
}
Map.prototype.wrap_south = function()
{
    //If the hero is at the bottom of the map, set their y to the top.
    this.hero.y = this.height-1;
}
Map.prototype.wrap_east = function()
{
    //If the hero is at the eastmost edge of the map, set their x to
    //  the leftmost edge.
    this.hero.x = 0;
}
Map.prototype.wrap_west = function()
{
    //If the hero is at the westmost edge of the map, set their x to
    //  the eastmost edge.
    this.hero.x = this.width-1;
}


//This function will be called when the player has won the game.  It
// will do an end-game sequence.
Map.prototype.player_won = function()
{
    alert("Congratulations, you have won the game!");
    window.location.replace("welcome.html");
}


//This function will be called when the player has lost the game.  It
// will do an end-game sequence.
Map.prototype.player_lost = function()
{
    alert("You ran out of energy and died.");
    alert("You have lost the game");
    window.location.replace("welcome.html");
}




//  update the web page's information with the current information about the hero.
//  It will also update the map's visibility.
Map.prototype.update = function()
{
    //Update the map to set the tiles around the hero to be visible:

    //Update the map displayed on the page:
    document.getElementById("map_box").innerHTML = this.map_string();

    document.forms[0].location.value=this.hero.display_location();
    document.forms[0].energy.value=this.hero.display_energy();
    document.forms[0].whiffles.value=this.hero.display_whiffles();
    document.forms[0].message.value = message(this.hero, this.cells[this.hero.x][this.hero.y]);

}



// Formats the map array as the contents of an HTML table.
Map.prototype.map_string = function() {
    result = "";
    for (var j = this.height-1; j >= 0; --j) {
        for (var i = 0; i < this.width; ++i) {
            var cell = this.cells[i][j];
            if (j === this.hero.y && i === this.hero.x) {
                result += "@";
            } else if(cell.isVisible) {
                switch(cell.terrain) {
                    case 0:
                        // Meadow
                        result += ".";
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
                }
            } else {
                result += "-";
            }
        }
        result += "<br>";
    }
    return result;
};

