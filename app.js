$(document).ready(function () {
    //declaring a function to creat array and connactet to the table in html 
    //and  return board  to
     const gameBoard = function arrayBoard() {

        let board = ['', '', '',
            '', '', '',
            '', '', ''
        ];

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
    const winningCase = function checkWin(board) {

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

        let divMessage = $("#boardMessage");
        if (result > 0) {
            divShow.classList.add('show')
            player1Wins++
            player1WinsText.text(player1Wins)
            divMessage.text("X win!");
            divMessage.css('color', 'white')
            return;
        } else if (result < 0) {
            divShow.classList.add('show')
            player2Wins++;
            player2WinsText.text(player2Wins)
            divMessage.text("O win!");
            return;
        } else {
            divShow.classList.add('show');
            divMessage.text("Match   Draw .");
            drawMatch++;
            drawMatchText.text(drawMatch);
            divMessage.css('color', 'white')
        }
    };
    //declaring a reset function to reset Game board and players status 
    const reset = function resetGame() {
        moveCuont = 0;
        turn = 1;
        $(".cells").unbind('click').one("click", main);
        $(".cells").text('');
        divShow.classList.remove('show')
        player1Wins = 0;
        player1WinsText.text(player1Wins);
        drawMatch = 0;
        drawMatchText.text(drawMatch);
        player2Wins = 0;
        player2WinsText.text(player2Wins);
        const divMessage = $("#boardMessage");
        divMessage.css('color', 'gray');
        divMessage.text('');
    };
    //declaring a rfresh function to reset Game board
    const rfresh = function resetGame() {
        moveCuont = 0;
        turn = 1;
        divShow.classList.remove('show')
        $(".cells").unbind('click').one("click", main);
        $(".cells").text('');
        const divMessage = $("#boardMessage");
        divMessage.css('color', 'gray');
        divMessage.text('');
    }
    //declaring a main function to 
    const main = function mainFunction() {

        let board, result;
        let player1 = '';
        let player2 = '';

        if (turn === 1) {

            if (player1 !== '' || winningCase(gameBoard()) !== 0 ||
                player2 !== '') {

                return;
            };
 
            player1 = "X"
            event.target.innerHTML = player1
        
            board = gameBoard();
            result = winningCase(board);
            if (result !== 0) {
                gameOver(result);
                return;
            };

            turn++;

            moveCuont++;

        } else {
            if (player1 !== '' || winningCase(gameBoard()) !== 0 ||
                player2 !== '') {

                return;
            };
            player2 = 'O'
            event.target.innerHTML = player2
            board = gameBoard();
            result = winningCase(board);
            if (result !== 0) {
                gameOver(result);
                return;
            }
            turn--
            moveCuont++
        };
        result = checkWinner(board);
        if (moveCuont === 9) {
            gameOver(result);
            return;
        }
    };
    $(".cells").one('click', main)
    $("#reset").click(reset);
    $("#rfresh").click(rfresh);
});