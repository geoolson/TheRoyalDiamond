//This function checks if the hero's coordinates match those of the Royal Diamonds. It returns a boolean depending on the result.
//Subject to change depending on how we fit the function into the program/if we want the function to end the game.
function findDiamonds(int playerX, int playerY, int diamondX, int diamondY)
{
	if(playerX == diamondX && playerY == diamondY)
	{
		alert("You have found the Royal Diamonds!!");
		alert("You have won the game. Congratulations!");
		return true;
	}
	return false;
}
