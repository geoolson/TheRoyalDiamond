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
