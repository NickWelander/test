var main = function(){

	var score;
	var board = [];
	var temp = [];
	var empty= [[0,0,0,0],
		    [0,0,0,0],
		    [0,0,0,0],
		    [0,0,0,0]];

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

	var addTwo = function(){
		while (1) {		
			var i = Math.floor(Math.random() * 4); 
			var j = Math.floor(Math.random() * 4); 
			if (board[i][j]==0) {
				board[i][j]=2;
				score += 2;
				if (Math.random() * 4 < 1){
					board[i][j]=4;
					score += 2;
				}
				$('span').text(score);
				break;
			};
		};
	};

	var reverseIt = function(temp){
		temp = [[0,0,0,0],
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

	var transpose = function(temp){
		temp = [[0,0,0,0],
			[0,0,0,0],
			[0,0,0,0],
			[0,0,0,0]];
		for (var i=0; i<4; i++){
			for (var j=0; j<4; j++){
				temp[i][j] = board[j][Math.abs(i)];
			};
		};
		return temp;
	};
		
	
	var moveStuff = function(board){
		var x=0;
		for (var i=0; i<4; i++){
			if ((board[i][0]==0 && (board[i][1] || board[i][2] || board[i][3]))
				|| (board[i][1]==0 && (board[i][2] || board[i][3]))
				|| (board[i][2]==0 && board[i][3])
				|| (board[i][0]==board[i][1] && board[i][0])
				|| (board[i][1]==board[i][2] && board[i][1])
				|| (board[i][2]==board[i][3] && board[i][2])){x=1};
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

	$('.save').click(function(){
		saved_board = board;
		saved_score = score;
		$('p').text("Saved").show().fadeOut("slow");
	});

	$('.load').click(function(){
		board = saved_board;
		score = saved_score;
		$('text').text(score);
		printBoard();
	});

	$('.reset').click(function(){
		if ( board.length == 0 || confirm("Are you sure? (Does not erase saved game)")){
			board = [[0,0,0,0],
				[0,0,0,0],
				[0,0,0,0],
				[0,0,0,0]];
			score = -2;
			addTwo();
			addTwo();
			printBoard();
		}
	});
	
//**********************************************************************

	$('.reset').trigger("click");

	$(document).keypress(function (e) {
  		if (e.which == 97 || e.which == 65) {
			if (moveStuff(board)){addTwo()};
			printBoard();

		};
		if (e.which == 100 || e.which == 68) {
			board = reverseIt(board);
			if (moveStuff(board)){addTwo()};
			board = reverseIt(board);
			printBoard();
		};
		if (e.which == 119 || e.which == 87) {
			board = transpose(board);
			if (moveStuff(board)){addTwo()};
			board = transpose(board);
			printBoard();
		};
		if (e.which == 115 || e.which == 84) {
			board = transpose(board);
			board = reverseIt(board);
			if (moveStuff(board)){addTwo()};
			board = reverseIt(board);
			board = transpose(board);
			printBoard();
		};
	});

			

};


$(document).ready(main);
