//Starting Map Class - This class will create a new Hero and keep track of him and his
// stats. Some of the functions in this map class will call functions in the hero class.
// This map class will communicate extensively with the hero class.

var game_map;
var text;

//map class constructor
function Map(width, height, starting_x, starting_y, starting_energy, starting_whiffles) {
    //default constructor
    if(width === undefined){
        //This creates a new hero, and passes the hero constructor the parameters
        this.hero = new Hero(0, 0, 10000,10000, false);
        this.width = 25;
        this.height = 25;
        this.diamond_x = 2;
        this.diamond_y = 2;
        this.cells = [[]];
        for (var i = 0; i < this.width; ++i) {
            this.cells[i] = [];
            for (var j = 0; j < this.height; ++j) {
                this.cells[i][j] = new mapCell();
            }
        }
        this.place_chests()
        this.cells[this.diamond_x][this.diamond_y].object = "Royal Diamonds";
        return;
    }
    //copy constructor
    if(height === undefined ){
        var state = width;
        this.hero = new Hero(state.hero.x, state.hero.y, 
                             state.hero.energy, state.hero.whiffles, 
                             state.hero.binoculars, 
                             state.hero.inventory);
        this.width = state.width;
        this.height = state.height;
        this.diamond_x = state.diamond_x;
        this.diamond_y = state.diamond_y;
        this.cells = state.cells;
        this.cells[this.diamond_x][this.diamond_y].object = "Royal Diamonds";
        return;
    }
    else{
        //This creates a new hero, and passes the hero constructor the parameters
        this.hero = new Hero(starting_x, starting_y, starting_energy, starting_whiffles, false);
        this.width = parseInt(width);
        this.height = parseInt(height);
        this.diamond_x = 2;
        this.diamond_y = 2;
        this.cells = [[]];
        for (var i = 0; i < this.width; ++i) {
            this.cells[i] = [];
            for (var j = 0; j < this.height; ++j) {
                this.cells[i][j] = new mapCell();
            }
        }
        this.place_chests()
        this.cells[this.diamond_x][this.diamond_y].object = "Royal Diamonds";
        return;
    }
}

//Member Functions:

//These functions move the hero.  They call the hero's move functions, and they
// check to see if the hero needs to wrap to the other side of the map.

//MOVE NORTH
Map.prototype.move_north = function()
{
    this.move(0,1);
};

// MOVE SOUTH
Map.prototype.move_south = function()
{
    this.move(0,-1);
};

//MOVE EAST
Map.prototype.move_east = function()
{
    this.move(1,0);
};

// MOVE WEST
Map.prototype.move_west = function()
{
    this.move(-1,0);
};

Map.prototype.move = function(x,y)
{
    // exit function early if hero has no energy
    if(this.hero.energy <= 0)
      return;
    nextx = (this.hero.x + x) % this.width;
    nexty = (this.hero.y + y) % this.height;
    if(nextx < 0)
        nextx = this.width -1;
    if(nexty < 0)
        nexty = this.height -1;
    if ( !this.isWater(nextx, nexty) ){
        this.hero.x = nextx;
        this.hero.y = nexty;
    }

    // Message needs to come before checking for (and removing) chests.
    // Check for binoculars
    document.getElementById("message").value  = message(this.hero, this.cells[this.hero.x][this.hero.y]);

    let item = this.cells[this.hero.x][this.hero.y].object;
    //update balances if hero PURCHASES a POWER BAR
    if(item === "PowerBar")
        this.powerBar();
    else if(item === "Binoculars")
        this.binoculars();
    else if(item in this.hero.costs)
        this.purchase_item(item, this.hero.costs[item]);

    // Compare hero's current cell terrain with bog value
    // and calls update hero stats tp deduct energy by 2
    if(this.cells[this.hero.x][this.hero.y].terrain === BOG) {
        this.hero.update_energy(-2);
    }
    else{
        //update energy for one step
        this.hero.update_energy(-1);
    }

    this.isObstacle();
    //Update the Map.
    this.update();
};

// checking if the cell contains water
Map.prototype.isWater = function(x,y)
{
    return this.cells[x][y].terrain === WATER;
};

//checking for obstacle then removing said obstacle and decrementing hero's energy
Map.prototype.isObstacle = function()
{
    let currentObject = this.cells[this.hero.x][this.hero.y].object;
    if(currentObject === "Tree")
    {
        this.hero.energy -= 10;
        this.cells[this.hero.x][this.hero.y].object = "None";
    }
    else if(currentObject === "Boulder")
    {
        this.hero.energy -= 16;
        this.cells[this.hero.x][this.hero.y].object = "None";
    }
    else if(currentObject === "BlackberryBushes")
    {
        this.hero.energy -= 4;
        this.cells[this.hero.x][this.hero.y].object = "None";
    }
    if(this.hero.energy <= 0)
        this.player_lost();
};

//This function will be called when the player has won the game.  It
// will do an end-game sequence.
Map.prototype.player_won = function()
{
    window.location.replace("win.html");
    localStorage.clear();
};

//This function will be called when the player has lost the game.  It
// will do an end-game sequence.
Map.prototype.player_lost = function()
{
    window.location.replace("lose.html");
    localStorage.clear();
};

//  update the web page's information with the current information about the hero.
//  It will also update the map's visibility.
Map.prototype.update = function()
{
    var view_distance = 1;
    if(this.hero.binoculars) {
        view_distance = 2;
    }
    //Update the map to set the tiles around the hero to be visible:
    var start_i = this.hero.x - view_distance;
    if (start_i < 0) {
        start_i = 0;
    }
    var start_j = this.hero.y-view_distance;
    if (start_j < 0) {
        start_j = 0;
    }
    for (var i = start_i; (i <= this.hero.x + view_distance) && (i < this.width); ++i) {
        for (var j = start_j; (j <= this.hero.y + view_distance) && (j < this.height); ++j) {
            this.cells[i][j].isVisible = true;
        }
    }


    //check for treasure chests
    this.check_chests();

    //Update the map displayed on the page:
    document.getElementById("map_box").innerHTML = this.map_string();

    // Update the game state information displayed on the page:
    document.getElementById("location").value  = this.hero.display_location();
    document.getElementById("energy").value  = this.hero.display_energy();
    document.getElementById("whiffles").value  = this.hero.display_whiffles();
    this.hero.display_inventory();
        localStorage.setItem('map', JSON.stringify(game_map) );

    //check diamonds
    if ((this.hero.x === this.diamond_x) && (this.hero.y === this.diamond_y))
        this.player_won();

    //check energy level
    if (this.hero.energy <= 0)
        this.player_lost();
};

// Places a number of treasure chests on the map cells randomly
Map.prototype.place_chests = function(){
  //chests in the lower left corner for testing
    this.cells[0][1].object = "Chest 1";
    this.cells[0][2].object = "Chest 2";
    var amount = 5;
    var x, y, type;
    for (var i = 0; i < amount; ++i){
        x = Math.floor(Math.random() * this.width);
        y = Math.floor(Math.random() * this.height);
        type = Math.floor(Math.random() * 2);
        if (type == 1){
          this.cells[x][y].object = "Chest 1";
        }
        else{
          this.cells[x][y].object = "Chest 2";
        }
    }
};

// Formats the map array as the contents of an HTML table.
Map.prototype.map_string = function() {
  let result = "";
  const genElement = (cellObject, terrain, x, y) =>
  {
    let terrainCells = ["meadow", "forest", "water", "wall", "bog", "swamp"];
    let cells = {
      "Tree": { color: "red", character: "T"},
      "Boulder": { color: "red", character: "R"},
      "BlackberryBushes": { color: "red", character: "B"},
      "Binoculars": { color: "black", character: "F"},
      "Royal Diamonds": { color: "blue", character: "D"},
      "Chest 1": { color: "orange", character: "C"},
      "Chest 2": { color: "orange", character: "C"},
      "PowerBar": { color: "purple", character: "P"},
      "Axe": { color: "green", character: "A"},
      "Shears": { color: "green", character: "S"},
      "Rock": { color: "green", character: "R"},
      "Machete": { color: "green", character: "M"},
      "Chainsaw": { color: "green", character: "X"},
      "Jackhammer": { color: "green", character: "J"},
      "Chisel": { color: "green", character: "H"},
      "Sledge": { color: "green", character: "L"},
      "Hatchet": { color: "green", character: "T"},
      "Hero": { color: "black", character: "<b>@<b>"},
    };
    let terrainCell = terrainCells[terrain];
    if(terrainCell === "water"){
      let above = this.cells[x][y+1].terrain
      let below = this.cells[x][y-1].terrain;
      let left = this.cells[x-1][y].terrain;
      let right = this.cells[x+1][y].terrain;
      if(above !== WATER){
        terrainCell += " top";
        if(left !== WATER)
          terrainCell += "-left";
        else if(right !== WATER)
          terrainCell += "-right";
      }
      else if(below !== WATER){
        terrainCell += " bottom";
        if(left !== WATER)
          terrainCell += "-left";
        else if(right !== WATER)
          terrainCell += "-right";
      }
      else if(left !== WATER){
          terrainCell += " left";
      }
      else if(right !== WATER){
          terrainCell += " right";
      }
      else
          terrainCell += " full";
    }
    if(cellObject === "None")
      return `<span class="${terrainCell}"> </span>`;
    else
    {
      let cellCharacter = cells[cellObject].character;
      let cellColor = cells[cellObject].color;
      return `<span class="${terrainCell}" style="color:${cellColor};">${cellCharacter}</span>`;
    }
  }

  for (let y = this.height-1; y >= 0; --y)
  {
    for (let x = 0; x < this.width; ++x)
    {
      let cell = this.cells[x][y];
      if (y === this.hero.y && x === this.hero.x)
        result += genElement("Hero", cell.terrain);
      else if(cell.isVisible) 
        result += genElement(cell.object, cell.terrain, x, y);
      else 
        result += " ";
    }
    result += "<br>";
  }
  return result;
};

Map.prototype.powerBar = function ()
{
    //check if hero has enough whiffles
    if (this.hero.check_balance(1) === false){
        alert("You do not have enough whiffles for a Power Bar.")
    } else {
        //prompt user
        var result = window.confirm("Would You like to purchase a POWER BAR (20 energy units) for 1 Whiffle?");
        if (result) {
            //if purchased, remove from mapCell
            this.cells[this.hero.x][this.hero.y].object = "None";
            this.hero.update_energy(20);
            this.hero.update_whiffles(-1);
        }
    }
};

Map.prototype.binoculars = function ()
{
    //check if hero has enough whiffles
    if (this.hero.check_balance(50) === false){
        alert("You do not have enough whiffles for Binoculars.")
    } else {
        //prompt user
        var result = window.confirm("Would You like to purchase a pair of BINOCULARS for 50 Whiffle?");
        if (result) {
            //if purchased, remove from mapCell
            this.cells[this.hero.x][this.hero.y].object = "None";
            this.hero.binoculars = true;
            this.hero.update_whiffles(-50);
            this.hero.add_item("Binoculars");
        }
    }
};

Map.prototype.check_chests = function () {
    //check chests
    if(this.cells[this.hero.x][this.hero.y].object == "Chest 1"){
        this.hero.update_whiffles(100);
        this.cells[this.hero.x][this.hero.y].object = "None";
    }

    if(this.cells[this.hero.x][this.hero.y].object == "Chest 2"){
        this.hero.whiffles = 0;
        this.cells[this.hero.x][this.hero.y].object = "None";
    }
};

Map.prototype.purchase_item = function(item_type, item_cost) {
    if(this.hero.check_balance(item_cost) === false)
    {
        alert("You do not have enough whiffles for " + item_type);
    }
    else
    {
        var result = window.confirm("Would you like to purchase " + item_type + " for " + item_cost + " Whiffles?");
        if(result){
            this.cells[this.hero.x][this.hero.y].object = "None";
            this.hero.inventory.add_item(item_type);
            this.hero.update_whiffles(-item_cost);
        }
    }
};

