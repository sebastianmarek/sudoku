module.exports = function solveSudoku(matrix) {
	var possibleNumbers;
	var firstEmpty;

	if(isMatrixSolved(matrix)) {
		return matrix;
	}

	firstEmpty = getFirstEmpty(matrix);
	possibleNumbers = getPossibleNumbers(matrix, firstEmpty);

	for(var i = 0; i < possibleNumbers.length; i++){

		matrix[firstEmpty.x][firstEmpty.y] = possibleNumbers[i];
		matrix = solveSudoku(matrix);	
		
		if(isMatrixSolved(matrix)) {
			return matrix;
		}

	}

	// wrong attempt, clear current field and go 1 step back
	matrix[firstEmpty.x][firstEmpty.y] = 0;
	return matrix;
}

function isMatrixSolved(matrix){
	for(var i = 0; i < 9; i++){
		for(var j = 0; j < 9; j++){
			if(matrix[i][j] == 0){
				return false;	
			} 
		}
	}
	return true;
}

function getFirstEmpty(matrix){
	for(var x = 0; x < 9; x++){
		for(var y = 0; y < 9; y++){
			if(matrix[x][y] == 0){
				var firstEmpty = {
					x : x,
					y : y
				};
				return firstEmpty;
			}
		}
	}
}

function getPossibleNumbers(matrix, firstEmpty){
	var possibilities = [1,1,1,1,1,1,1,1,1,1];
	var possibleNumbers = [];

	// set to -1 values that are already used in current row
	for(var y = 0; y < 9; y++){
		if(matrix[firstEmpty.x][y] != 0){
			
			possibilities[matrix[firstEmpty.x][y]] = -1;
		} 
	}

	// set to -1 values that are already used in current column
	for(var x = 0; x < 9; x++){
		if(matrix[x][firstEmpty.y] != 0){
			possibilities[matrix[x][firstEmpty.y]] = -1;
		} 
	}	

	// find starting point for current 3x3 square
	var k = Math.floor(firstEmpty.x/3)*3;
	var l = Math.floor(firstEmpty.y/3)*3;

	// set to -1 values that are already used in current 3x3 square
	for(var x = k; x < k + 3; x++){
		for(var y = l; y < l + 3; y++){
			if(matrix[x][y] != 0){
				possibilities[matrix[x][y]] = -1;
			} 
		}
	}

	// return only values that can be used
	for(var i = 1; i < 10; i++){
		if(possibilities[i] == 1) possibleNumbers.push(i);
	}

	return possibleNumbers;
}