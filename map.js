//Starting Map Class - This class will create a new Hero and keep track of him and his
// stats. Some of the functions in this map class will call functions in the hero class.
// This map class will communicate extensively with the hero class.
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





    //Member Functions:
    //Moves the player north by calling the move_north function of the player class
    this.move_north = function(){
        if(!((this.hero_y + 1) > height)) //If the hero is not at the edge of the map, she can move north
                                     // But if she is at the edge of the map, then we skip the movement call, 
                                     // because she can't move north anymore.
        {
            this.hero.move_north();
            this.hero_y = this.hero_y + 1;
        }
        else // If hero gets to the edge going north they
        {   // will be wrapped around to the other side (southmost)
            this.hero_y = 0;
        }

        //This part will update the text fields with the hero's current location:
        document.getElementById("location").innerHTML = "<b>Current Location: </b>Coordinates: (" + this.hero_x + ", " + this.hero_y + ")";
    };
    //Moves the player sorth by calling the move_south function of the player class
    this.move_south = function(){
        if(!((this.hero_y - 1) < 0)) //If the hero is not at the edge of the map, she can move south
                                     // But if she is at the edge of the map, then we skip the movement call, 
                                     // because she can't move south anymore.
        {
            this.hero.move_south();
            this.hero_y = this.hero_y - 1;
        }
        else // If hero gets to edge going south, they
        {   // will be wrapped to the other side (northmost)
            this.hero_y = height;
        }

        //This part will update the text fields with the hero's current location:
        document.getElementById("location").innerHTML = "<b>Current Location: </b>Coordinates: (" + this.hero_x + ", " + this.hero_y + ")";

    };
    //Moves the player east by calling the move_east function of the player class
    this.move_east = function(){
        if(!((this.hero_x + 1) > width)) //If the hero is not at the edge of the map, she can move east
                                     // But if she is at the edge of the map, then we skip the movement call, 
                                     // because she can't move east anymore.
        {
            this.hero.move_east();
            this.hero_x = this.hero_x + 1;
        }
        else // Hero gets to eastmost edge, and is
        {   // wrapped to westmost side
            this.hero_x = 0;
        }

        //This part will update the text fields with the hero's current location:
        document.getElementById("location").innerHTML = "<b>Current Location: </b>Coordinates: (" + this.hero_x + ", " + this.hero_y + ")";

    };
    //Moves the player west by calling the move_west function of the player class
    this.move_west = function(){
        if(!((this.hero_x - 1) < 0)) //If the hero is not at the edge of the map, she can move west
                                         // But if she is at the edge of the map, then we skip the movement call, 
                                         // because she can't move west anymore.
        {
            this.hero.move_west();
            this.hero_x = this.hero_x - 1;
        }
        else // When hero reaches westmost edge, they
        {    // are wrapped around to the eastmost side.
            this.hero_x = width;
        }

        //This part will update the text fields with the hero's current location:
        document.getElementById("location").innerHTML = "<b>Current Location: </b>Coordinates: (" + this.hero_x + ", " + this.hero_y + ")";

    };
}
