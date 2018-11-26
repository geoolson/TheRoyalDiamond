//Map Dump - This function will get the map item from memory and display it as an alert (for testing purposes I believe) - Jon
function map_dump()
{
    var theMap = localStorage.getItem('map');
    alert(theMap);
}
