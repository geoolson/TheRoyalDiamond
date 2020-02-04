//This class will hold all of the player's inventory data.
function Inventory(inventory={})
{
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
        for (let [item, count] of Object.entries(this.inventory)) {
            inventory_to_html += `<p>${item} x${count} ---- Cost: \$${this.costs[item]} ea.</p>`;
        }
        inventory_to_html += '<button type="button" onclick="close_inventory()">CLOSE</button>';
        return inventory_to_html;
    }
}
