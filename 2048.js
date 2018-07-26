var main = function(){

	var score;
	var board = [];
	var empty= [[0,0,0,0],
		    [0,0,0,0],
		    [0,0,0,0],
		    [0,0,0,0]];

//**********************************************
//	Function:	Print board
//	Purpose: 	Empties the table, then appends the rows and
//				columns with the proper classes
//	Parameters: None
//	Returns:	Null
////*********************************************
	var printBoard = function(){
		$('table').empty();
		for (var i=0; i<4; i++){
			$('table').append($('<tr class="a">'));
			for (var j=0; j<4; j++){
				$('.a').append($('<td class="b">'));
				$('.b').addClass('n' + board[i][j].toString());
				if (board[i][j]){$('.b').text(board[i][j])};
				$('td').removeClass("b");
			};
			$('tr').removeClass("a");
		};
	};

//**********************************************
//	Function:	Add Two
//	Purpose: 	Randomly adds a 2 or 4 in any position containing a 0
//	Parameters: None
//	Returns:	Null
////*********************************************
	var addTwo = function(){
		while (1) {			//continues until an empty position is found
			var i = Math.floor(Math.random() * 4); 
			var j = Math.floor(Math.random() * 4); 
			if (board[i][j]==0) {
				board[i][j]=2;
				score += 2;
				if (Math.random() * 4 < 1){  //25% chance of 4
					board[i][j]=4;
					score += 2;
				}
				$('span').text(score);
				break;
			};
		};
	};

//**********************************************
//	Function:	Reverse Board
//	Purpose: 	reverses 2nd index of board array (flips board on y axis)
//				so that the Move Tiles function only has to work for one direction
//	Parameters: None
//	Returns:	Reversed board
////*********************************************
	var reverseBoard = function(){
		let temp = [[0,0,0,0],
			[0,0,0,0],
			[0,0,0,0],
			[0,0,0,0]];
		for (var i=0; i<4; i++){
			for (var j=0; j<4; j++){
				temp[i][j] = board[i][Math.abs(j-3)];
			};
		};
		return temp;
	};

//**********************************************
//	Function:	Transpose (Board)
//	Purpose: 	Transposes board array to orient for the Move Tiles function
//	Parameters: None
//	Returns:	Transposed board
////*********************************************
	var transpose = function(){
		let temp = [[0,0,0,0],
			[0,0,0,0],
			[0,0,0,0],
			[0,0,0,0]];
		for (var i=0; i<4; i++){
			for (var j=0; j<4; j++){
				temp[i][j] = board[j][i];
			};
		};
		return temp;
	};		
	
//**********************************************
//	Function:	Move Tiles
//	Purpose: 	Moves elements of array "left". 0's are filled, then two
//				equal values are combined
//	Parameters: None
//	Returns:	True, if move was possible, false, if no move possible
////*********************************************
	var moveTiles = function(){
		let x = false;		//this indicates the ability to move. The first 'if' statement determines if a move is possible.
		for (var i=0; i<4; i++){
			if ((board[i][0]==0 && (board[i][1] || board[i][2] || board[i][3]))
				|| (board[i][1]==0 && (board[i][2] || board[i][3]))
				|| (board[i][2]==0 && board[i][3])
				|| (board[i][0]==board[i][1] && board[i][0])
				|| (board[i][1]==board[i][2] && board[i][1])
				|| (board[i][2]==board[i][3] && board[i][2])){ x = true };
			if (board[i][2]==0){
				board[i][2]=board[i][3];
				board[i][3]=0};
			if (board[i][1]==0){
				board[i][1]=board[i][2];
				board[i][2]=board[i][3];
				board[i][3]=0};
			if (board[i][0]==0){
				board[i][0]=board[i][1];
				board[i][1]=board[i][2];
				board[i][2]=board[i][3];
				board[i][3]=0};
			if (board[i][0]==board[i][1]){
				board[i][0] *= 2;
				board[i][1]=board[i][2];
				board[i][2]=board[i][3];
				board[i][3]=0};
			if (board[i][1]==board[i][2]){
				board[i][1] *= 2;
				board[i][2]=board[i][3];
				board[i][3]=0};		
			if (board[i][2]==board[i][3]){
				board[i][2] *= 2;
				board[i][3]=0};
		};	
		return x;		

	};

//****** Event Listeners *******************************************
	
//**********************************************
//	Action:	 	Save - on click
//	Purpose: 	saves current board and score into variables. displays "saved"
//	Parameters: None
//	Returns:	None
////*********************************************
	$('.save').click(function(){
		saved_board = board;
		saved_score = score;
		$('p').text("Saved").show().fadeOut("slow");
	});
	
//**********************************************
//	Action:	 	Load - on click
//	Purpose: 	sets current board and score from saved variables, then prints board
//	Parameters: None
//	Returns:	None
////*********************************************
	$('.load').click(function(){
		board = saved_board;
		score = saved_score;
		$('text').text(score);
		printBoard();
	});
	
//**********************************************
//	Action:	 	Reset - on click
//	Purpose: 	Clears game board, resets score, adds 2's, prints board
//				When first loading page, no dialogue.
//	Parameters: None
//	Returns:	None
////*********************************************
	$('.reset').click(function(){
		if ( board.length == 0 || confirm("Are you sure? (Does not erase saved game)")){
			board = [[0,0,0,0],
					 [0,0,0,0],
					 [0,0,0,0],
					 [0,0,0,0]];
			score = 0;
			addTwo();
			addTwo();
			printBoard();
		}
	});
	
	
//**********************************************
//	Action:	 	on keypress
//	Purpose: 	Orients board, moves tiles left, returns board to
//				original orientation, then prints board. if move
//				was successful, adds another 2
//	Parameters: key pressed
//	Returns:	None
////*********************************************
	$(document).keypress(function (e) {
  		if (e.which == 97 || e.which == 65) {
			if (moveTiles(board)){addTwo()};
		};
		if (e.which == 100 || e.which == 68) {
			board = reverseBoard(board);
			if (moveTiles(board)){addTwo()};
			board = reverseBoard(board);
		};
		if (e.which == 119 || e.which == 87) {
			board = transpose(board);
			if (moveTiles(board)){addTwo()};
			board = transpose(board);
		};
		if (e.which == 115 || e.which == 84) {
			board = transpose(board);
			board = reverseBoard(board);
			if (moveTiles(board)){addTwo()};
			board = reverseBoard(board);
			board = transpose(board);
		};
		printBoard();
	});

//start game by resetting the board
	$('.reset').trigger("click");	

};


$(document).ready(main);
