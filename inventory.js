//This class will hold all of the player's inventory data.
function Inventory(inventory={"list": [[""]]})
{
    this.list = inventory.list;

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
            this.list.push([new_item]);
    }
    this.display_inventory = function()
    {
        var inventory_to_html = "<h3>Inventory</h3>";
        //Code for placing inventory items in the string goes here
        //go through the array of arrays.  At each subarray, add that subarray[0] to the html, and add "x" and add the subarray's size.
        for(var i = 1; i < this.list.length; i++)
        {
            var cost = 0;
            if(this.list[i][0] == "Rock")
                cost = 1;
            else if(this.list[i][0] == "Shears")
                cost = 35;
            else if(this.list[i][0] == "Axe")
                cost = 30;
            else if(this.list[i][0] == "Hatchet")
                cost = 15;
            else if(this.list[i][0] == "Chainsaw")
                cost = 60;
            else if(this.list[i][0] == "Chisel")
                cost = 5;
            else if(this.list[i][0] == "Sledge")
                cost = 25;
            else if(this.list[i][0] == "Jackhammer")
                cost = 100;
            else if(this.list[i][0] == "Machete")
                cost = 25;
            else if(this.list[i][0] == "Binoculars")
                cost = 50;
            else
                cost = 1;
            inventory_to_html += ("<p>" + this.list[i][0] + " x" + this.list[i].length + " ---- Cost: $" + cost + " ea.</p>");
        }
        inventory_to_html += '<button type="button" onclick="close_inventory()">CLOSE</button>';
        return inventory_to_html;
    }
}
