//This file will contain all of the class data for the cell class.
// The cell class holds the information for each cell of the Frupal
// Map.  The Map will be a 2D array of cell objects, so this class
// is a building block for the Map class.

function mapCell(x, y, isVisible, terrain, object)
{
    //If any parameter was omitted in constructor call, set all data members to 0
    if (x === undefined)
    {
        this.x = 0;
        this.y = 0;
        this.isVisible = 0;
        this.terrain = 0;
        this.object = "None";
        return;
    }
    else if (y === undefined)
    {
        var copy = x
        this.x = copy.x;
        this.y = copy.y;
        this.isVisible = copy.isVisible;
        this.terrain = copy.terrain;
        this.object = copy.object;
        return;
    }
    //Otherwise set them to the argument values...
    else
    {
        this.x = x;
        this.y = y;
        this.isVisible = isVisible;
        this.terrain = terrain;
        this.object = object;
    }
}
