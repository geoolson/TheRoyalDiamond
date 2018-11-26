//This is actually a JavaScript Class... It's weird, but it's how Javascript implements classes
// The class is implemented as a function that takes in several arguments that are stored in 
// the newly created object.
function Hero(x, y, energy, whiffles) {
    //Data Members:
    this.x = parseInt(x);
    this.y = parseInt(y);
    this.energy = energy;
    this.whiffles = whiffles;
    this.gems = 0;
    this.innerthoughts = "This is a cell message";
    this.inventory = new Inventory();


    //Member Functions:


    //These functions are called by the map class.  They simply increment the
    //  hero's location.
    this.move_north = function()
    {
        //The hero starts at 0,0 which is at the top left corner of the map.
        //When the hero moves North, the y value will be decreasing until it gets to 0.
        this.y += 1;
    };
    this.move_south = function()
    {
        //When the hero moves South, the y value will increase.
        this.y -= 1;
    };
    this.move_east = function()
    {
        //When the hero moves East, the x value will increase.
        this.x += 1;
    };
    this.move_west = function()
    {
        //When the hero moves West, the x value will decrease.
        this.x -= 1;
    };


    //This function will update all of the hero's stats after the hero moves.
    //  When the hero moves, their energy will decrement according to the space
    //  they are moving into.  This function will call other functions to
    //  determine the amount of energy to decrement by, and to determine if the
    //  hero has stumbled upon an item, or if they have acquired some more
    //  whiffles.  It will take a cellMap object in as an argument, so that it
    //  can call some other functions to determine which stats to change.
    this.update_stats = function(ecost)
    {
        //Check energy cost of the current cell, and decrement the hero's energy
        //  by that amount.
        this.decrement_energy(ecost);

        //Set the player's new whiffles amount to be the amount of whiffles that
        //  the new cell contains.  Remove those whiffles from that cell.
        //this.whiffles = whiffles + wcost;

        //Set the hero's inner thoughts to be the message of the current cell.
        //this.innerthoughts = current_cell.message;
    }


    //This function will decrement the hero's energy according to the integer
    // passed in as an argument.
    this.decrement_energy = function(energy_cost)
    {
	    this.energy -= energy_cost;
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
        var to_return = "(";
        to_return += this.x;
        to_return += ", ";
        to_return += this.y;
        to_return += ")";
        return to_return;
    }
    this.display_whiffles = function()
    {
        return this.whiffles;

    }
    this.display_energy = function()
    {
        return this.energy;
    }
    this.display_message = function()
    {
        return this.innerthoughts;
    }

   /* //This function checks if the hero has found the Royal Diamonds, and returns a bool.
    this.findDiamonds = function(playerX,playerY,diamondX,diamondY)
    {
	if(playerX == diamondX && playerY == diamondY)
	{
		alert("You have found the Royal Diamonds!!");
		alert("You have won the game. Congratulations!");
		return true;
	}
	return false;
    }*/
}
