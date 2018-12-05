// Compares the heros current location
// with the map and checks for any obstacles
// which may include visibility, tools,
// items, jewels, frupals, etc.
function message(hero_obj, map_tile){
    // This will return the message that will be
    // updated as the hero moves around the map.
    return "You are walking and ... "
	+ xyEdgeMessage(hero_obj) + terrainMessage(map_tile)
	+ contentMessage(map_tile);

}


function xyEdgeMessage(hero_obj){
    //If hero is at the edge of the map
//    if(hero_obj.x == max || hero_obj.y == max || hero_obj.x == 0 || hero_obj.y == 0)
//	return " You are at an edge of the map! ";
//    else
	return " "
}


function terrainMessage(map_tile){
    switch(map_tile.terrain){
         case 0:
             return "You are in a meadow... ";
         case 1:
             return "You are in the forest... ";
         case 2:
             return "There's some water!... ";
         case 3:
             return "You bumped into a wall... ";
         case 4:
             return "There is a bog and you lost 2 energy... ";
         case 5:
             return "You're in a swamp... ";
         default:
             return " ";
    }
    return " ";
}


// This function compares the content of
// the current map cell and returns a message.
// There will be more to add to this.
function contentMessage(map_tile){
    if(map_tile.object == "Royal Diamonds")
        return "You have found the royal diamonds!";
    if(map_tile.object == "None")
        return " ";
    if(map_tile.object == "Blackberry Bushes")
        return "And there is a blackberry bush. ";
    if(map_tile.object == "Chest 1")
        return "And there is a type 1 Chest."
    if(map_tile.object == "Chest 2")
        return "And there is a type 2 Chest."
    if(map_tile.object == "Tree")
        return "And you lost 10 energy removing a tree."
    if(map_tile.object == "BlackberryBushes")
        return "And you lost 4 energy removing some Blackberry Bushes."
    if(map_tile.object == "Boulder")
        return "And you lost 16 energy removing a Boulder."
    return " ";
}
