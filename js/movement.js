//Try to move
function tryMove(row1, col1, row2, col2) {
	if (table[row1][col1] == null || isRelationBlocked(row1, col1, row2, col2)) {
		return false;
	}
	if (table[row2][col2] == null) {
		return move(row1, col1, row2, col2);
	} else if (table[row1][col1].text() == table[row2][col2].text()) {
		return CaseFusion(row1, col1, row2, col2);
	}
	return false;
}

//Mooving the cell and update it's details
//Using css,animate and text functions
function move(row1, col1, row2, col2) {
	table[row2][col2] = table[row1][col1];
	table[row1][col1] = null;
	var number = table[row2][col2].text() * 1;
	var color = pikColor(number);

	table[row2][col2].css({
		background : color,
		color : 'black'
	}).animate({
		top : row2 * 100 + 'px',
		left : col2 * 100 + 'px'
	}, 100).text(number);
	return true;
}

//Move the cell up
function Up() {
	var moved = false;

	for (var i = 0; i < table_size; i++) {
		//++ because going up on the index
		for (var j = 0; j < table_size; j++) {
			for (var k = j + 1; k < table_size; k++) {
				//Keep the same colum but change the row
				if (tryMove(k, i, j, i)) {
					moved = true;
				}
			}
		}
	}

	if (moved) {
		didMovement();
	}
}

//Move the cell down
function Down() {
	var moved = false;

	for (var i = 0; i < table_size; i++) {
		//-- because going down on the index
		for (var j = table_size - 1; j >= 0; j--) {
			for (var k = j - 1; k >= 0; k--) {
				//Keep same column but change rows
				if (tryMove(k, i, j, i)) {
					moved = true;
				}
			}
		}
	}

	if (moved) {
		didMovement();
	}
}

//Move the cell left
function Left() {
	var moved = false;

	for (var i = 0; i < table_size; i++) {
		//++ because increase the index
		for (var j = 0; j < table_size; j++) {
			for (var k = j + 1; k < table_size; k++) {
				//Keep row but change colums
				if (tryMove(i, k, i, j)) {
					moved = true;
				}
			}
		}
	}

	if (moved) {
		didMovement();
	}
}

//Move the cell right
function Right() {
	var moved = false;

	for (var i = 0; i < table_size; i++) {
		//-- because decrease the index
		for (var j = table_size - 1; j >= 0; j--) {
			for (var k = j - 1; k >= 0; k--) {
				//Keep same row but change column
				if (tryMove(i, k, i, j)) {
					moved = true;
				}
			}
		}
	}

	if (moved) {
		didMovement();
	}
}

//Making a movement between two unused cells 
function didMovement() {
	clearspace();

	if (stillPlaying()) {
		var unused = pickACase();
		makeNewCase(unused[0], unused[1]);
	}
}

