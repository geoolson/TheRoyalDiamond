//This is actually a JavaScript Class... It's weird, but it's how Javascript implements classes
// The class is implemented as a function that takes in several arguments that are stored in 
// the newly created object.
function Hero(x, y, energy, whiffles, binoculars, inventory={}) {
    //Data Members:
    this.x = parseInt(x);
    this.y = parseInt(y);
    this.energy = energy;
    this.whiffles = whiffles;
    this.inventory = inventory;
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

    // add item to hero's inventory
    this.add_item = function(item){
      if(item in this.inventory)
        this.inventory[item] += 1;
      else
        this.inventory[item] = 1;
    }

    this.costs = {
      "Rock": 1,
      "Shears": 35,
      "Axe": 30,
      "Hatchet": 15,
      "Chainsaw": 60,
      "Chisel": 5,
      "Sledge": 25,
      "Jackhammer": 100,
      "Machete": 25,
      "Binoculars": 50
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
        let inventory_to_html = "<h3>Inventory</h3>";
        Object.keys(this.inventory).forEach( item => {
            // example of templated string appended to inventory_to_html:
            //   <p>Axe x2 ---- Cost: $30 ea.</p>
            let cost = this.costs[item];
            let count = this.inventory[item];
            inventory_to_html += `<p>${item} x${count} ---- Cost: \$${cost} ea.</p>`;
        });
        inventory_to_html += '<button type="button" onclick="close_inventory()">CLOSE</button>';
        document.getElementById("inventory").innerHTML = inventory_to_html;
    }
}
