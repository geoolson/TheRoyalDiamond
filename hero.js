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


    //These functions are called by the map class
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


    //This function will decrement the hero's energy according to the integer
    // passed in as an argument.
    this.decrement_energy = function() 
    {
        if(!outOfEnergy(this.energy))
	    this.energy = this.energy - 1;
	    document.getElementById("energy").innerHTML = "<b>Energy: </b>" + this.energy;
    }


    /*This function checks if the hero has run out of energy, and returns a bool.
    this.outOfEnergy = function(decrement_amount) 
    {
	    if(energyUnit <= 0) 
        {
		    alert("The hero has run out of energy.");
		    alert("You have lost. Game Over!");
		    return true;
	    }

	    return false;
    }
    */
}
