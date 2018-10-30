//This function checks if the hero has run out of energy, and returns a bool.
//Subject to change depending on how we fit the function into the program/if we want the function to end the game as well.
function outOfEnergy(int energyUnit) {
	if(energyUnit <= 0) {
		alert("The hero has run out of energy.");
		alert("You have lost. Game Over!");
		return true;
	}
	return false;
}
