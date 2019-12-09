//Init of the table size
var table_size = 4;
//Init time animation (tend to be quick so the game can be played fast)
var animation = 50;
//declaration arrays
var table = [];
var space = [];

//Init arrays
for (var i = 0; i < table_size; i++) {
	var row1 = [];
	var row2 = [];
	for (var j = 0; j < table_size; j++) {
		//Used of push from the JQuery library
		row1.push(null);
		row2.push(false);
	}
	table.push(row1);
	space.push(row2);
}

//Test if their is unused cells in the table to keep playing or not
function stillPlaying() {
	for (var i = 0; i < table_size; i++) {
		for (var j = 0; j < table_size; j++) {
			if (table[i][j] == null) {
				return true;
			}
		}
	}
	return false;
}

//Check if relationBlocked
function isRelationBlocked(row1, col1, row2, col2) {
	//if on the same row
	if (row1 == row2) {
		var min = Math.min(col1, col2);
		var max = Math.max(col1, col2);

		for (var mid = min + 1; mid < max; mid++) {
			if (table[row1][mid])
				return true;
		}
	} else {
		var min = Math.min(row1, row2);
		var max = Math.max(row1, row2);

		for (var mid = min + 1; mid < max; mid++) {
			if (table[mid][col1])
				return true;
		}
	}
	return false;
}



//Case color depending on the number
function pikColor(number) {
	var color;
	switch (number) {
	case 2:
		color = 'silver'
		break;
	case 4:
		color = 'gray'
		break;
	case 8:
		color = 'red'
		break;
	case 16:
		color = 'maroon'
		break;
	case 32:
		color = 'yellow'
		break;
	case 64:
		color = 'olive'
		break;
	case 128:
		color = 'green'
		break;
	case 256:
		color = 'aqua'
		break;
	case 512:
		color = 'blue'
		break;
	case 1024:
		color = 'purple'
		break;
	default:
		color = 'silver'
	}
	return color;
}

//Jquery functions that launch the game
$(document).ready(function() {
	//Taking the input in from the user/keyboard and make a move
    $(document).keydown(function(e) {
      if (e.keyCode == 37) Left();
      if (e.keyCode == 38) Up();
      if (e.keyCode == 39) Right();
      if (e.keyCode == 40) Down();
    });

    //Generation of the first new case
    var unused = pickACase();
    makeNewCase(unused[0], unused[1]);

    //Generation of the second new case
    var unused = pickACase();
    makeNewCase(unused[0], unused[1]);
  });
