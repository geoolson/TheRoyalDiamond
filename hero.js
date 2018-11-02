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
    //  hero has stumbled upon an item, if they have found the royal gems, or if 
    //  they have acquired some more whiffles.  It will take a cellMap object in
    //  as an argument, so that it can call some other functions to determine
    //  which stats to change.
    this.update_stats = function(current_cell)
    {
        //Check For Diamonds 1st! If the player has found the diamonds, then they
        //  have won!
        if(current_cell.check_diamonds())
            return false;

        //Check energy cost of the current cell, and decrement the hero's energy
        //  by that amount.
        var energy_cost = current_cell.energy;
        this.decrement_energy(energy_cost);

        return true;
    }


    //This function will decrement the hero's energy according to the integer
    // passed in as an argument.
    this.decrement_energy = function(energy_cost) 
    {
        if(!outOfEnergy(this.energy - energy_cost))
	    this.energy = this.energy - energy_cost;
    }


    //This function checks if the hero has run out of energy, and returns a bool.
    this.outOfEnergy = function(energy_amount) 
    {
	    if(energy_amount <= 0) 
        {
		    alert("The hero has run out of energy.");
		    alert("You have lost. Game Over!");
		    return true;
	    }

	    return false;
    }
	
    //This function checks if the hero has found the Royal Diamonds, and returns a bool.
    this.findDiamonds = function(playerX,playerY,diamondX,diamondY)
    {
	if(playerX == diamondX && playerY == diamondY)
	{
		alert("You have found the Royal Diamonds!!");
		alert("You have won the game. Congratulations!");
		return true;
	}
	return false;
    }
}
