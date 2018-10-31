//Starting Map Class - This class will create a new Hero and keep track of him and his
// stats. Some of the functions in this map class will call functions in the hero class.
// This map class will communicate extensively with the hero class.

function mapCell(x, y, isVisible, terrain, content)
{
    // parameter was omitted in call
    if ( 
    x == undefined || y == undefined || isVisible === undefined || 
    terrain == undefined || content == undefined ) 
    {
        this.x = 0;
        this.y = 0;
        this.isVisible = 0;
        this.terrain = 0;
        this.content = "None";
    }
    else
    {
        this.x = x;
        this.y = y;
        this.isVisible = isVisible;
        this.terrain = terrain;
        this.content = content;
    }
}

function Map(width, height, starting_x, starting_y, starting_whiffles, starting_energy)
{
    //Data Members:
    this.hero = new Hero(starting_x, starting_y, starting_whiffles, starting_energy); /*Creates a new hero
                                                                                       * and passes the hero 
                                                                                       * constructor the parameters.*/
    this.hero_x = starting_x; //The hero's location on the map
    this.hero_y = starting_y;
    this.width = width; //The width of the map.
    this.height = height; //The height of the map.

    // Create an empty world
    this.cells = [[]];
    for (var i = 0; i < height; ++i) {
        this.cells[i] = [];
        for (var j = 0; j < width; ++j) {
            this.cells[i][j] = new mapCell();
        }
    }

    this.update = function() {
        // For a normal step, as long as hero has 
        // enough energy, they will lose 1 energy.
        this.hero.decrement_energy();

        //This part will update the text fields with the hero's current location:
        document.getElementById("location").innerHTML = "<b>Current Location: </b>Coordinates: (" + this.hero_x + ", " + this.hero_y + ")";
        document.getElementById("map_box").innerHTML = this.map_string();
    };

    //Member Functions:
    //Moves the player north by calling the move_north function of the player class
    this.move_north = function(){
        if(!((this.hero_y + 1) > height)) //If the hero is not at the edge of the map, she can move north
                                     // But if she is at the edge of the map, then we wrap around to the south
        {
            this.hero.move_north();
            this.hero_y = this.hero_y + 1;
        }
        else // If hero gets to the edge going north they
        {   // will be wrapped around to the other side (southmost)
            this.hero_y = 0;
        }
        
        this.update();
    };
    //Moves the player sorth by calling the move_south function of the player class
    this.move_south = function(){
        if(!((this.hero_y - 1) < 0)) //If the hero is not at the edge of the map, she can move south
                                     // But if she is at the edge of the map, then we wrap around to the north
        {
            this.hero.move_south();
            this.hero_y = this.hero_y - 1;
        }
        else // If hero gets to edge going south, they
        {   // will be wrapped to the other side (northmost)
            this.hero_y = height-1;
        }

        this.update();
    };
    //Moves the player east by calling the move_east function of the player class
    this.move_east = function(){
        if(!((this.hero_x + 1) > width)) //If the hero is not at the edge of the map, she can move east
                                     // But if she is at the edge of the map, then we wrap around to the west
        {
            this.hero.move_east();
            this.hero_x = this.hero_x + 1;
        }
        else // Hero gets to eastmost edge, and is
        {   // wrapped to westmost side
            this.hero_x = 0;
        }

        this.update();
    };
    //Moves the player west by calling the move_west function of the player class
    this.move_west = function(){
        if(!((this.hero_x - 1) < 0)) //If the hero is not at the edge of the map, she can move west
                                         // But if she is at the edge of the map, then we wrap around to the east
        {
            this.hero.move_west();
            this.hero_x = this.hero_x - 1;
        }
        else // When hero reaches westmost edge, they
        {    // are wrapped around to the eastmost side.
            this.hero_x = width-1;
        }

        this.update();
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

