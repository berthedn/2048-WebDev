//Create a new case
function makeNewCase(row, col) {
	//Create a number : 2 or 4
	var number = Math.random() < 0.9 ? 2 : 4;
	//Attribute the color depending on the number
	var color = pikColor(number);

	//Return the place where the new case is going
	//Ceate the css
	//Attribute the case to the html case and table
	return table[row][col] = $('<div>').css({
		background : color,
		color : 'black',
		top : row * 100 + 'px',
		left : col * 100 + 'px'
	}).text(number).addClass('case').appendTo($('#table'));
}

//Find an random unused cell so a number can be randomly assigned
function pickACase() {
	while (true) {
		var row = Math.floor(Math.random() * table_size);
		var col = Math.floor(Math.random() * table_size);

		if (table[row][col] == null) {
			return [ row, col ];
		}
	}
}

//Setting false on the unused cells
function clearspace() {
	for (var i = 0; i < table_size; i++) {
		for (var j = 0; j < table_size; j++) {
			space[i][j] = false;
		}
	}
}

//Fusion of two cells
function CaseFusion(row1, col1, row2, col2) {
	if (space[row2][col2]) {
		return false;
	}
	
	//Remove the old case
	table[row2][col2].remove();
	//Destination case take the value of original case
	table[row2][col2] = table[row1][col1];
	//Initialization of original case for the futur
	table[row1][col1] = null;
	//Adds up the number
	var number = table[row2][col2].text() * 2;
	//Assign the righ color
	var color = pikColor(number);
	
	space[row2][col2] = true;

	//Assign the animation of merging (growing when merging and coming back when it's done)
	table[row2][col2].css({
		top : row2 * 100 + 'px',
		left : col2 * 100 + 'px'
	}).text(number).animate({
		height : '90px',
		width : '90px'
	}, 100).animate({
		backgroundColor : color,
		color : 'black'
	}, 100).animate({
		height : '80px',
		width : '80px'
	}, 100);

	return true;
}

