// returns the message that will be
// updated as the hero moves around the map.
function message(hero_obj, map_tile){
    function terrainMessage(){
        let terrains = [
            "You are in a meadow... ",
            "You are in the forest... ",
            "There's some water!... ",
            "You bumped into a wall... ",
            "There is a bog and you lost 2 energy... ",
            "You're in a swamp... "
        ];
        let result = terrains[map_tile.terrain];
        if(result)
          return result;
        return " ";
    }
    // This function compares the content of
    // the current map cell and returns a message.
    function contentMessage(){
        let items = {
          "Royal Diamonds": "You have found the royal diamonds!",
          "None": " ",
          "Blackberry Bushes": "And there is a blackberry bush. ",
          "Chest 1": "And there is a type 1 Chest.",
          "Chest 2": "And there is a type 2 Chest.",
          "Tree": "And you lost 10 energy removing a tree.",
          "BlackberryBushes": "And you lost 4 energy removing some Blackberry Bushes.",
          "Boulder": "And you lost 16 energy removing a Boulder."
        };
        let result = items[map_tile.object];
        if(result)
          return result;
        return " ";
    }
    return "You are walking and ... " + terrainMessage() + contentMessage();
}

