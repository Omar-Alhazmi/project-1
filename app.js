$(document).ready(function () {
    //declaring a function to creat array and connactet to the table in html 
    const gameBoard = function arrayBoard() {

        let board = [];

        $(".cells").each(function (index) {
            board[index] = $(this).text();
        });
        return board;
    }
    //  declaring variable to use it in change turn function
    let turn = 1;
    //  declaring variable to count mve
    let moveCuont = 0;
    //  declaring variable to cunt tie 
    let drawMatch = 0;
    let drawMatchText = $('#ptie');
    //  declaring variable  to cunt player1 Wins
    let player1Wins = 0;
    let player1WinsText = $('#p1');
    //  declaring variable  to cunt player2 Wins
    let player2Wins = 0;
    let player2WinsText = $('#p2');
    //  declaring variable  to push the winning Message
    const divShow = document.querySelector('#win');

    //create a checkWinner function with 3 argument and convert them to gather
    //to use it in winningCase
    const checkWinner = function conditions(a, b, c) {

        if (a === 'X' && b === 'X' && c === 'X') {
            return 1;
        } else if (a === 'O' && b === 'O' && c === 'O') {
            return -1;
        } else {
            return 0;
        }
    }
    //declaring a winningCase function take board as argument and check the winning Cases
    const winningCase = function checkWinCases(board) {

        return checkWinner(board[0], board[1], board[2]) +
            checkWinner(board[3], board[4], board[5]) +
            checkWinner(board[6], board[7], board[8]) +
            checkWinner(board[0], board[3], board[6]) +
            checkWinner(board[1], board[4], board[7]) +
            checkWinner(board[2], board[5], board[8]) +
            checkWinner(board[0], board[4], board[8]) +
            checkWinner(board[2], board[4], board[6]);
    }
    //declaring a gameOver function take result as argument and check the result
    //to display wining Message
    const gameOver = function gameOverMessage(result) {
        //  declaring local variable saveing ID boardMessage
        //  to display message.
        let divMessage = $("#boardMessage");
        //if result gretor than 0 then 
        // display message x win 
        if (result > 0) {
            divShow.classList.add('show')
            //increasing player 1 Wins by 1
            player1Wins++
            player1WinsText.text(player1Wins)
            divMessage.text("X win!");
            divMessage.css('color', '#DBDBDB')

            return;
            //else if result leser than 0 then 
            // display message o win 
        } else if (result < 0) {
            divShow.classList.add('show')
            //increasing player 2 Wins by 1
            player2Wins++;
            player2WinsText.text(player2Wins)
            divMessage.text("O win!");
            divMessage.css('color', '#DBDBDB')
            return;
            //else if result equle to 0 then 
            // display message Draw. 
        } else {
            divShow.classList.add('show');
            divMessage.text("Match   Draw .");
            drawMatch++;
            drawMatchText.text(drawMatch);
            divMessage.css('color', '#DBDBDB')
        }
    };
    //declaring a reset function to reset Game board and players status 
    const reset = function resetGame() {
        //reset moveCuont to 0
        moveCuont = 0;
        //reset turn to 1 to set player1 x as defoult
        turn = 1;
        //Lifting the block from the blocked cells
        $(".cells").unbind('click').one("click", main);
        //cells emptying
        $(".cells").text('');
        //remove the div message
        divShow.classList.remove('show')
        //reset player1Wins to 0
        player1Wins = 0;
        player1WinsText.text(player1Wins);
        //reset drawMatch to 0
        drawMatch = 0;
        drawMatchText.text(drawMatch);
        //reset player2Wins to 0
        player2Wins = 0;
        player2WinsText.text(player2Wins);
    };
    //declaring a rfresh function to reset Game board
    const rfresh = function resetGame() {
        //reset moveCuont to 0
        moveCuont = 0;
        //reset turn to 1 to set player1 x as defolt
        turn = 1;
        //remove the div message
        divShow.classList.remove('show')
        $(".cells").unbind('click').one("click", main);
        $(".cells").text('');
        const divMessage = $("#boardMessage");
        divMessage.css('color', 'gray');
        divMessage.text('');
    }
    //declaring a main function 
    //check the turn and and diploy text for players
    const main = function mainFunction() {


        let result,board;
        let player1 = '';
        let player2 = '';

        //if turn = 1 then this is player1 turn
        if (turn === 1) {
            //if player 1 does not equal to empty string
            //and winningCase does not equal to 0
            //and player 2 does not equal to empty string 
            //then return 
            if (player1 !== '' || winningCase(gameBoard()) !== 0 ||
                player2 !== '') {

                return;
            };

            player1 = "X"
            //create event when player1 click 
            //the cell disply X
            event.target.innerHTML = player1
            board = gameBoard();
            result = winningCase(board);
            //if result does not equal to 0
            // then check the gameOver function
            if (result !== 0) {
                gameOver(result);
                return;
            };
            //increasing turn by 1
            //to change the current turn to player 2          
            turn++;
            moveCuont++;

        } else {
            //if player 1 does not equal to empty string
            //and winningCase does not equal to 0
            //and player 2 does not equal to empty string 
            //then return 
            if (player1 !== '' || winningCase(gameBoard()) !== 0 ||
                player2 !== '') {

                return;
            };

            player2 = 'O'
            //create event when player2 click 
            //the cell disply O
            event.target.innerHTML = player2
            board = gameBoard();
            result = winningCase(board);
            //if result does not equal to 0
            // then check the gameOver function
            if (result !== 0) {
                gameOver(result);
                return;
            }
            //decreasing turn by 1
            //to change the current turn to player 1       
            turn--
            moveCuont++
        };
        board = gameBoard();
        result = checkWinner(board);
        //if moveCuont equal to 9
        // then check the gameOver function
        if (moveCuont === 9) {
            gameOver(result);
            return;
        }
    };
     //add event listener when one clicking on the cells
    $(".cells").one('click', main);
     //add event listener when click the reset button
    $("#reset").click(reset);
    //add event listener when click the rfresh button
    $("#rfresh").click(rfresh);
});