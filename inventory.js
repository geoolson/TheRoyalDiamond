//This class will hold all of the player's inventory data.
function Inventory(inventory)
{
    if (inventory === undefined) {
        //Data Members:
        this.list = [[""]];
    } else {
        // Restore from JSON
        this.list = inventory.list;
    }

    //Member Functions:
    this.add_item = function(new_item)
    {
        var list_size = this.list.length;
        var already_exists = false;
        for(var i = 0; i < this.list.length; i++)
        {
            if(this.list[i][0] == new_item)
            {
                //alert("This item already exists in your inventory");
                already_exists = true;
                //Add the item to the array that already has another instance of the same item.
                this.list[i].push(new_item);
            }
        }
        //If the item doesn't exist anywhere in the list, we should push a new array onto the list.
        if(!already_exists)
        {
            //alert("This item did not exist in your inventory, so we will add it.");
            this.list.push([new_item]);
        }
    }
    this.display_inventory = function()
    {
        var inventory_to_html = "<h3>Inventory</h3>";
        //Code for placing inventory items in the string goes here
        //go through the array of arrays.  At each subarray, add that subarray[0] to the html, and add "x" and add the subarray's size.
        for(var i = 1; i < this.list.length; i++)
        {
            inventory_to_html += ("<p>" + this.list[i][0] + " x" + this.list[i].length + " ---- Cost: $60 ea.</p>");
        }
        inventory_to_html += '<button type="button" onclick="close_inventory()">CLOSE</button>';
        return inventory_to_html;
    }
}
