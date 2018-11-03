//This file will contain all of the class data for the cell class.
// The cell class holds the information for each cell of the Frupal
// Map.  The Map will be a 2D array of cell objects, so this class
// is a building block for the Map class.

function mapCell(x, y, isVisible, terrain, object)
{
    //If any parameter was omitted in constructor call, set all data members to 0
    if (x === undefined || y === undefined || isVisible === undefined ||
    terrain === undefined || object === undefined)
    {
        this.x = 0;
        this.y = 0;
        this.isVisible = 0;
        this.terrain = 0;
        this.object = "None";
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
