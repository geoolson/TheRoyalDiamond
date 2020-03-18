export const gameHTML = `
<head>
<title>Frupal</title>
<link rel="stylesheet" href="assets/terrain.css">
</head>
<script src="inventory.js"></script>
<script src="hero.js"></script>
<script src="cell.js"></script>
<script src="map.js"></script>
<script src="loadMap.js"></script>
<script src="message.js"></script>
<script>
//if there is no map in local storage, use the default map
window.onload = () =>{
  if(localStorage.getItem('map') === null){
    defaultMap = {
      "mapName": "Sample Frugal Game Map",
      "width": 20,
      "height": 20,
      "hero": {
        "x": 12,
        "y": 13,
        "energy": 100,
        "whiffles": 1000,
        "inventory": {
          "Axe": 1,
          "Shears": 1,
          "Rock": 1
        }
      },
      "cells": [
        {"x":1, "y":13, "isVisible": false, "terrain": 0, "object": "Boulder"},
        {"x":1, "y":6, "isVisible": false, "terrain": 0, "object": "Boulder"},
        {"x":1, "y":8, "isVisible": false, "terrain": 0, "object": "PowerBar"},
        {"x":3, "y":12, "isVisible": false, "terrain": 0, "object": "Tree"},
        {"x":3, "y":5, "isVisible": false, "terrain": 0, "object": "Boulder"},
        {"x":5, "y":15, "isVisible": false, "terrain": 0, "object": "Shears"},
        {"x":5, "y":17, "isVisible": false, "terrain": 0, "object": "Shears"},
        {"x":5, "y":5, "isVisible": false, "terrain": 4, "object": "Tree"},
        {"x":5, "y":6, "isVisible": false, "terrain": 4, "object": "None"},
        {"x":5, "y":7, "isVisible": false, "terrain": 4, "object": "None"},
        {"x":5, "y":8, "isVisible": false, "terrain": 4, "object": "Binoculars"},
        {"x":5, "y":9, "isVisible": false, "terrain": 4, "object": "None"},
        {"x":5, "y":10, "isVisible": false, "terrain": 4, "object": "None"},
        {"x":6, "y":10, "isVisible": false, "terrain": 3, "object": "None"},
        {"x":7, "y":10, "isVisible": false, "terrain": 3, "object": "None"},
        {"x":8, "y":10, "isVisible": false, "terrain": 3, "object": "None"},
        {"x":9, "y":10, "isVisible": false, "terrain": 3, "object": "None"},
        {"x":12, "y":4, "isVisible": false, "terrain": 2, "object": "None"},
        {"x":13, "y":4, "isVisible": false, "terrain": 2, "object": "None"},
        {"x":12, "y":3, "isVisible": false, "terrain": 2, "object": "None"},
        {"x":13, "y":3, "isVisible": false, "terrain": 2, "object": "None"},
        {"x":14, "y":3, "isVisible": false, "terrain": 2, "object": "None"},
        {"x":14, "y":4, "isVisible": false, "terrain": 2, "object": "None"},
        {"x":12, "y":5, "isVisible": false, "terrain": 2, "object": "None"},
        {"x":13, "y":5, "isVisible": false, "terrain": 2, "object": "None"},
        {"x":14, "y":5, "isVisible": false, "terrain": 2, "object": "None"},
        {"x":13, "y":10, "isVisible": false, "terrain": 1, "object": "None"},
        {"x":13, "y":11, "isVisible": false, "terrain": 1, "object": "None"},
        {"x":13, "y":12, "isVisible": false, "terrain": 1, "object": "None"},
        {"x":6, "y":2, "isVisible": false, "terrain": 0, "object": "PowerBar"}
      ]
    };
    initMap(defaultMap);
    localStorage.setItem('map', JSON.stringify(game_map) );
  }
  //if there is a map in local storage (from options page), use it
  else{
      var localFile = JSON.parse(localStorage.getItem('map'));
      game_map = new Map(localFile);
  }
  game_map.update();
}
function close_inventory()
{
    document.getElementById("inventory").innerHTML = "<button type='button' onclick='open_inventory()'>OPEN INVENTORY</button>";
}
function open_inventory()
{
    game_map.hero.display_inventory();
}

</script>
<body>
<h1>Welcome to Frupal</h1>
<form action="index.html" method="post">
<button type="submit">Back to Home Page</button>
</form>
<br>
<table>
<tr>
<th></th>
<th><button type="button" onclick="game_map.move_north()">NORTH</button></th>
<th></th>
</tr>
<tr>
<th><button type="button" onclick="game_map.move_west()">WEST</button></th>
<th></th>
<th><button type="button" onclick="game_map.move_east()">EAST</button></th>
</tr>
<tr>
<th></th>
<th><button type="button" onclick="game_map.move_south()">SOUTH</button></th>
<th></th>
</tr>
</table>
<br>
<form>
<br><br>
Current Location: <input id="location" type="text" value="(X, Y)" size= maxlength=12><br>
Energy:           <input id="energy" type="text" value=0 size=6 maxlength=6><br>
Whiffles:         <input id="whiffles" type="text" value=0 size=6 maxlength=10><br>
Message:          <input id="message" type="text" value="Welcome to the island ..." size=100 maxlength=100>
</form>
<br>
<b>Load Map</b>
<input type="file" onchange='openFile(event)'/>
<output id="map"></output>
<td id="clearstorage">
<button type='button' onclick='localStorage.clear()';>Clear Local Storage</button>
</td>
<br>
<table>
<td>
<pre id="map_box"></pre>
</td>
<td id="inventory">
    <button type='button' onclick='open_inventory()'>OPEN INVENTORY</button>
</td>
</table>
<script>
document.onkeydown = function (e) {
    switch (e.keyCode) {
        case 37: // left
            e.preventDefault();
            game_map.move_west();
            break;
        case 38: // up
            e.preventDefault();
            game_map.move_north();
            break;
        case 39: // right
            e.preventDefault();
            game_map.move_east();
            break;
        case 40: // down
            e.preventDefault();
            game_map.move_south();
            break;
    }
}
</script>
</body>
`

export const mapMenuHTML = `
<head>
    <script src="inventory.js"></script>
    <script src="hero.js"></script>
    <script src="cell.js"></script>
    <script src="map.js"></script>
    <script src="loadMap.js"></script>
    <script src="message.js"></script>
    <script>
        //This function will take in a value, and set the global variable "text" to be that value.  Value
        //  should be a game map string that the parser can interpret.  This function will then call
        //  dimensions() which will set up the map by parsing the global variable "text."
        //  It will then store the map into local storage.
        function store(val){
            text = val;
            if(!check_map_input(val))
            {
                alert("The map that you pasted is not in the correct format!");
                return false;
            }
            initMap(defaultMap);
            localStorage.setItem('map', JSON.stringify(game_map));
        };

        //This function will check the argument passed in, making sure that it follows the proper
        //  file requirements - this function does not check all file requirements... it just checks
        //  a few.
        function check_map_input(map_input)
        {
            if(!map_input)
                return false;
            else
            {
                //Get the map size first.
                var pattern = /[0-9]+/;
                var result = pattern.exec(map_input);
                if(!result)
                    return false;
                map_input = map_input.slice(result.index + result[0].length, map_input.length);
                var result_as_an_integer = parseInt(result);
                if(result_as_an_integer > 100)
                    return false;
            }
            return true;
        }

        //This function takes map options from form and adds a map file to local storage
        function file_from_preferences() {
            //Get the form from the document, and use it to create other map variables
            var form = document.getElementById("preferences");
            var size = form.size.value;
            var starting_x = form.starting_x.value;
            var starting_y = form.starting_y.value;
            var starting_whiffles = form.starting_whiffles.value;
            var starting_energy = form.elements.starting_energy.value;
            text = 'Sample Frugal Game Map' + size + ' ##################### ' + starting_x + ',' + starting_y + ' ' + starting_energy + ' ' + starting_whiffles + 'Axe Axe Sheers Rock ##################### 12,12,0,0, None 13,12,0,0, Tree 14,12,0,2, None';
            dimensions();
            localStorage.setItem('map', JSON.stringify(game_map));
        }
    </script>
    <title>Frupal Config</title>
</head>
<body>
    <h1>Frupal Config</h1>
    <form action="index.html" method="post">
        <button type="submit">Back to Home Page</button>
    </form>
    <h2>Enter Preferences:</h2>
    <form id="preferences" method="post" action="game.html">
        <p>Map Height (all maps are square): <input type="text" name="size" id="size" value="25"></p>

        <p>Initial Position: <input type="text" name="starting_x" id="starting_x" value="0"> , <input type="text" name="starting_y" value="0"></p>

        <p>Initial Energy: <input type="text" name="starting_energy" id="starting_energy" value="10"></p>

        <p>Initial Whiffles: <input type="text" name="starting_whiffles" id="starting_whiffles" value="1000"></p>

        <!--save button sends map file with user preferences to local storage-->
        <p><input type="button" onclick="file_from_preferences()" value="Save">
        <!--submit button redirects to game.html -->
        <button type="submit" name="submit">Start Game</button>
        </p>
    </form>
    <h2>Or Paste a Map Here:</h2>
    <form class="" action="game.html" method="post">
        <textarea name= "pastedmap" rows="8" cols="80"></textarea>

        <p>
        <!--save button sends map file from text box to local storage-->
        <button type="button" name="save" onclick="store(pastedmap.value)">Save</button>
        <!--submit button redirects to game.html -->
        <button type="submit">Submit</button>
        </p>
    </form>
</body>
`

export const menuHTML = `
    <script src="load.js"></script>
    <head>
        <title>Frupal</title>
        <h1>Welcome to Frupal</h1>
    </head>
    <body>
        <button onClick="displayGame()">Start</button>
        <button type="displayMapMenu()">Load and Options</button>
    </body>
`