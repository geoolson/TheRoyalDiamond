//This class will hold all of the player's inventory data.
function Inventory()
{
    //Data Members:
    this.list = [[""]];

    //Member Functions:
    this.add_item = function(new_item)
    {
        var list_size = this.list.length;
        var already_exists = false;
        for(var i = 0; i < this.list.length; i++)
        {
            if(this.list[i][0] == new_item)
            {
                alert("This item already exists in your inventory");
                already_exists = true;
                //Add the item to the array that already has another instance of the same item.
                this.list[i].push(new_item);
            }
        }
        //If the item doesn't exist anywhere in the list, we should push a new array onto the list.
        if(!already_exists)
        {
            alert("This item did not exist in your inventory, so we will add it.");
            this.list.push([new_item]);
        }
    }
}
