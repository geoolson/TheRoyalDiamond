//Starting Map Class - This class will create a new Hero and keep track of him and his
// stats. Some of the functions in this map class will call functions in the hero class.
// This map class will communicate extensively with the hero class.


function Map(width, height, starting_x, starting_y, starting_energy, starting_whiffles)
{
    //Data Members:

    //This creates a new hero, and passes the hero constructor the parameters
    this.hero = new Hero(starting_x, starting_y, starting_energy, starting_whiffles);

    this.width = width - 1; //The width of the map.  This is -1 from the width passed in, because we start at 0.
    this.height = height - 1; //The height of the map.  This is -1 from the height passed in, because we start at 0.

    //This creates an empty world
    this.cells = [[]];
    for (var i = 0; i <= width; ++i) {
        this.cells[i] = [];
        for (var j = 0; j <= height; ++j) {
            this.cells[i][j] = new mapCell();
        }
    }





    //Member Functions:
    
    //This function builds the map.  It will create the map based on a text file
    // read in from local storage.  If there is no file currently in local storage,
    // this function will create the default one.
    this.build_map = function()
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
    this.move_north = function()
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
        
        //Get the map cell that the player is moving into:
        var new_cell = cells[hero.x][hero.y];

        //Update the hero's stats based on the cell that the hero has travelled into.
        var still_searching_for_diamonds = this.hero.update_stats(new_cell);

        //Update the Map.
        this.update();



        //If the hero has found the diamonds, then start the end-game sequence:
        if(!still_searching_for_diamonds)
            this.end_game();
    };
    this.move_south = function()
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
        
        //Get the map cell that the player is moving into:
        var new_cell = cells[hero.x][hero.y];

        //Update the hero's stats based on the cell that the hero has travelled into.
        var still_searching_for_diamonds = this.hero.update_stats(new_cell);

        //Update the Map.
        this.update();



        //If the hero has found the diamonds, then start the end-game sequence:
        if(!still_searching_for_diamonds)
            this.end_game();

    };
    this.move_east = function()
    {
        //First, check to see if the hero is at the edge of the map,
        // if so, wrap the hero to the other side of the map.
        if(this.check_bounds_east())
        {
            this.wrap_east();
        }
        //Otherwise, move the hero east
        else
        {
            this.hero.move_east();
        }
        
        //Get the map cell that the player is moving into:
        var new_cell = cells[hero.x][hero.y];

        //Update the hero's stats based on the cell that the hero has travelled into.
        var still_searching_for_diamonds = this.hero.update_stats(new_cell);

        //Update the Map.
        this.update();



        //If the hero has found the diamonds, then start the end-game sequence:
        if(!still_searching_for_diamonds)
            this.end_game();
    };
    this.move_west = function()
    {
        //First, check to see if the hero is at the edge of the map,
        // if so, wrap the hero to the other side of the map.
        if(this.check_bounds_west())
        {
            this.wrap_west();
        }
        else
        {
            this.hero.move_west();
        }
        
        //Get the map cell that the player is moving into:
        var new_cell = cells[hero.x][hero.y];

        //Update the hero's stats based on the cell that the hero has travelled into.
        var still_searching_for_diamonds = this.hero.update_stats(new_cell);

        //Update the Map.
        this.update();



        //If the hero has found the diamonds, then start the end-game sequence:
        if(!still_searching_for_diamonds)
            this.end_game();
    };


    //These functions will check to see if the hero is at the edge of the map.
    //  They will return true if the hero is at the edge of the map, and false
    //  otherwise.
    this.check_bounds_north = function()
    {
        //If the hero is at the top of the map, return true.
        if(this.hero.y == 0)
            return true;
        return false;
    }
    this.check_bounds_south = function()
    {
        //If the hero is at the bottom of the map, return true.
        if(this.hero.y == height)
            return true;
        return false;
    }
    this.check_bounds_east = function()
    {
        //If the hero is at the rightmost side of the map, return true.
        if(this.hero.x == width)
            return true;
        return false;
    }
    this.check_bounds_west = function()
    {
        //If the hero is at the leftmost side of the map, return true.
        if(this.hero.x == 0)
            return true;
        return false;
    }


    //These functions will wrap the hero to the other side of the map, when
    //  they are on the edge of the map.
    this.wrap_north = function()
    {
        //If the hero is at the top of the map, set their y to the bottom.
        this.hero.y = height;
    }
    this.wrap_south = function()
    {
        //If the hero is at the bottom of the map, set their y to the top.
        this.hero.y = 0;
    }
    this.wrap_east = function()
    {
        //If the hero is at the eastmost edge of the map, set their x to
        //  the leftmost edge.
        this.hero.x = 0;
    }
    this.wrap_west = function()
    {
        //If the hero is at the westmost edge of the map, set their x to
        //  the eastmost edge.  
        this.hero.x = width;
    }










    //This function will decrement the hero's energy, and will call other functions 
    // (such as check for diamonds, update whiffles, etc.) it will also call the
    // map display function.
    this.update = function() 
    {
        // For a normal step, as long as hero has 
        // enough energy, they will lose 1 energy.
        this.hero.decrement_energy();

        //This part will update the text fields with the hero's current location:
        document.getElementById("location").innerHTML = "<b>Current Location: </b>Coordinates: (" + this.hero_x + ", " + this.hero_y + ")";
        document.getElementById("map_box").innerHTML = this.map_string();
    };



    // Formats the map array as the contents of an HTML table.
    this.map_string = function() {
        result = "";
        for (var i = 0; i < this.cells.length; ++i) {
            for (var j = 0; j < this.cells.length; ++j) {
                var cell = this.cells[i][j];
                if (i == this.hero_y && j == this.hero_x) {
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
}

