
//opens file then calls the parser
var openFile = function(event){
  var input = event.target;

  var reader = new FileReader();
  reader.onload = function(){
    map = JSON.parse(reader.result);
    initMap(map);
  };
  reader.readAsText(input.files[0]);
};

function initMap(map){
  let dim = map.width;
  let energy = map.hero.energy;
  let whiffles = map.hero.whiffles;
  let x = map.hero.x;
  let y = map.hero.y;
  game_map = new Map(dim, dim, x, y, energy, whiffles);
  map.cells.forEach( cell => {
      game_map.cells[cell.x][cell.y] = new mapCell(cell.x, cell.y, cell.isVisible, cell.terrain, cell.object);
  });
  game_map.hero.inventory = map.hero.inventory;
  game_map.update();
}
