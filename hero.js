//This is actually a JavaScript Class... It's weird, but it's how Javascript implements classes
// The class is implemented as a function that takes in several arguments that are stored in 
// the newly created object.
function Hero(x, y, whiffles, energy)
{
    //Data Members:
    this.x = x;
    this.y = y;
    this.whiffles = whiffles;
    this.energy = energy;
    this.jems = 0;
    this.innerthoughts = "";
     



    //Member Functions:


    //These functions are called by the map class.  They simply increment the 
    //  hero's location.
    this.move_north = function()
    {
        //The hero starts at 0,0 which is at the top left corner of the map.
        //When the hero moves North, the y value will be decreasing until it gets to 0.
        this.y = this.y - 1;
    };    
    this.move_south = function() 
    {
        //When the hero moves South, the y value will increase.
        this.y = this.y + 1;
    };
    this.move_east = function() 
    {
        //When the hero moves East, the x value will increase.
        this.x = this.x + 1;
    };
    this.move_west = function() 
    {
        //When the hero moves West, the x value will decrease.
        this.x = this.x - 1;
    };


    //This function will update all of the hero's stats after the hero moves. 
    //  When the hero moves, their energy will decrement according to the space 
    //  they are moving into.  This function will call other functions to 
    //  determine the amount of energy to decrement by, and to determine if the 
    //  hero has stumbled upon an item, or if they have acquired some more 
    //  whiffles.  It will take a cellMap object in as an argument, so that it 
    //  can call some other functions to determine which stats to change.
    this.update_stats = function(current_cell)
    {
        //Check energy cost of the current cell, and decrement the hero's energy
        //  by that amount.
        var energy_cost = current_cell.energy;
        this.decrement_energy(energy_cost);

        //Set the player's new whiffles amount to be the amount of whiffles that
        //  the new cell contains.  Remove those whiffles from that cell.
        this.whiffles = whiffles + current_cell.whiffles;
        current_cell.whiffles = 0;

        //Set the hero's inner thoughts to be the message of the current cell.
        this.innerthoughts = current_cell.message;
    }


    //This function will decrement the hero's energy according to the integer
    // passed in as an argument.
    this.decrement_energy = function(energy_cost) 
    {
	    this.energy = this.energy - energy_cost;
    }


    //This function checks if the hero has run out of energy, and returns a bool.
    this.out_of_energy = function(current_cell) 
    {
        var energy_cost = current_cell.energy;
        var new_energy_level = this.energy-energy_cost;
        if(new_energy_level <= 0)
        {
            return true;
        }
        return false;
    }

    //This function checks to see if the hero has found the gems.  If the hero
    // has found the gems, it returns true.  Otherwise it returns false.
    this.found_diamonds = function(current_cell)
    {
        if(current_cell.gems)
            return true;
        return false;
    }

    
    //These functions will return an HTML string representing the hero's current
    //  statistics.
    this.display_location = function()
    {
        var to_return = "<b>Current Location:</b> Coordinates: (";
        to_return += this.x;
        to_return += ", ";
        to_return += this.y;
        to_return += ")";
        return to_return;
    }
    this.display_whiffles = function()
    {
        var to_return = "<b>Current Whiffles:</b> ";
        to_return += this.whiffles;
        to_return += " Whiffles";
        return to_return;
    }
    this.display_energy = function()
    {
        var to_return = "<b>Current Energy:</b> ";
        to_return += this.energy;
        to_return += " Energy Units";
        return to_return;
    }
    this.display_message = function()
    {
        "<b>Message:</b> ";
        to_return += this.innerthoughts;
        return to_return
    }
}
