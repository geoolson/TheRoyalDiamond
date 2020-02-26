// These constants are the different terrain types
const MEADOW = 0;
const FOREST = 1;
const WATER = 2;
const WALL = 3;
const BOG = 4;
const SWAMP = 5;

//This class will hold all of the player's inventory data.
function Inventory(inventory={})
{
    // this.inventory stores key value pairs of the hero's inventory
    // where the key is the item and the value is the quantity
    this.inventory = inventory;

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

    this.display_inventory = function()
    {
        let inventory_to_html = "<h3>Inventory</h3>";
        Object.keys(this.inventory).forEach( item => {
            // example of templated string appended to inventory_to_html:
            //   <p>Axe x2 ---- Cost: $30 ea.</p>
            let cost = this.costs[item];
            let count = this.inventory[item];
            inventory_to_html += `<p>${item} x${count} ---- Cost: \$${cost} ea.</p>`;
        });
        inventory_to_html += '<button type="button" onclick="close_inventory()">CLOSE</button>';
        return inventory_to_html;
    }
}
