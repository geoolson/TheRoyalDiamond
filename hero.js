//This is actually a JavaScript Class... It's weird, but it's how Javascript implements classes
// The class is implemented as a function that takes in several arguments that are stored in 
// the newly created object.
function Hero(x, y, whiffles, energy)
{
    this.x = x;
    this.y = y;
    this.whiffles = whiffles;
    this.energy = energy;
    this.jems = 0;
    this.move_north = function() {this.y = this.y + 1;};
    this.move_south = function() {this.y = this.y - 1;};
    this.move_east = function() {this.x = this.x + 1;};
    this.move_west = function() {this.x = this.x - 1;};
}
