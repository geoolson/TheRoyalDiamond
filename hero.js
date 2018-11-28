//This is actually a JavaScript Class... It's weird, but it's how Javascript implements classes
// The class is implemented as a function that takes in several arguments that are stored in 
// the newly created object.
function Hero(x, y, energy, whiffles, binoculars, inventory) {
    //Data Members:
    this.x = parseInt(x);
    this.y = parseInt(y);
    this.energy = energy;
    this.whiffles = whiffles;
    this.inventory = new Inventory(inventory);
    this.binoculars = binoculars;


    //Member Functions:


    //These functions are called by the map class.  They simply increment the
    //  hero's location.
    this.move_north = function () {
        //The hero starts at 0,0 which is at the top left corner of the map.
        //When the hero moves North, the y value will be decreasing until it gets to 0.
        this.y += 1;
    };
    this.move_south = function () {
        //When the hero moves South, the y value will increase.
        this.y -= 1;
    };
    this.move_east = function () {
        //When the hero moves East, the x value will increase.
        this.x += 1;
    };
    this.move_west = function () {
        //When the hero moves West, the x value will decrease.
        this.x -= 1;
    };


    //update Hero Energy
    this.update_energy = function (energy_change) {
        this.energy += energy_change;
    }

    //update Hero Whiffles
    this.update_whiffles = function (whiffle_change) {
        this.whiffles += whiffle_change;
    }

    //check whiffle balance for hero purchases,
    // return true if hero has enough whiffles
    this.check_balance = function (whiffle_change){
        if (this.whiffles - whiffle_change < 0)
            return false;
        return true;
    }


    //These functions will return an HTML string representing the hero's current
    //  statistics.
    this.display_location = function () {
        var to_return = "(";
        to_return += this.x;
        to_return += ", ";
        to_return += this.y;
        to_return += ")";
        return to_return;
    }
    this.display_whiffles = function () {
        return this.whiffles;

    }
    this.display_energy = function () {
        return this.energy;
    }
    this.display_inventory = function() {
        document.getElementById("inventory").innerHTML = this.inventory.display_inventory();
    }
}
