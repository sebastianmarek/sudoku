module.exports = function solveSudoku(matrix) {
	var possibleNumbers = [0,0,0,0,0,0,0,0,0,0];
	var firstEmpty;

	if(matrix && isMatrixSolved(matrix)) {
		console.log(matrix);
		return matrix;
	}

	firstEmpty = getFirstEmpty(matrix);
	possibleNumbers = getPossibleNumbers(matrix, firstEmpty);

	for(var i = 1; i < 10; i++){
		if(possibleNumbers[i] == 1){
			matrix[firstEmpty.x][firstEmpty.y] = i;
			solveSudoku(matrix);
		}
	}

	matrix[firstEmpty.x][firstEmpty.y] = 0;

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

	for(var y = 0; y < 9; y++){
		if(matrix[firstEmpty.x][y] != 0) possibilities[matrix[firstEmpty.x][y]] = -1;
	}

	for(var x = 0; x < 9; x++){
		if(matrix[x][firstEmpty.y] != 0) possibilities[matrix[x][firstEmpty.y]] = -1;
	}	

	var k = Math.floor(firstEmpty.x/3)*3;
	var l = Math.floor(firstEmpty.y/3)*3;

	for(var x = k; x < k + 3; x++){
		for(var y = l; y < l + 3; y++){
			if(matrix[k][l] != 0) possibilities[matrix[k][l]] = -1;
		}
	}

	return possibilities;

}