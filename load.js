import gameHTML from pages.js;
import mapMenuHTML from pages.js;
import menuHTML from pages.js;

function displayGame()
{
    document.getElementById("root").innerHTML = gameHTML;
    return;
}

function displayMapMenu()
{
    document.getElementById("root").innerHTML = mapMenuHTML;
    return;
}

function displayMenu()
{
    document.getElementById("root").innerHTML = menuHTML;
}