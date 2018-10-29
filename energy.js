function outOfEnergy(int energyUnit) {
	if(energyUnit <= 0) {
		alert("The hero has run out of energy.");
		alert("You have lost. Game Over!");
		return true;
	}
	return false;
}
