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
    let Tiegame = 0;
    //  declaring variable  to cunt player1 Wins
    let player1Wins = $('#p1');

    //  declaring variable  to cunt player2 Wins
    let player2Wins = $('#p2');

    //create a function with 3 argument and convert them to gather
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


    //declaring a function take board as argument and check the winning Cases
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


    //declaring a function take result as argument and check the result
    //to display wining Message
    const gameOver = function gameOverMessage(result) {

        let divMessage = $("#boardMessage");
        if (result > 0) {
            divMessage.text("X win!");
            divMessage.css('color', 'red')
            return;
        } else if (result < 0) {
            //player2Wins++;
            divMessage.text("O win!");
            return;
        } else {
            Tiegame++
            divMessage.text("Tie game.");
            divMessage.css('color', 'blue')
        }
    };

    //declaring a function to reset Game board 
    const reset = function resetGame() {
        moveCuont = 0
        $(".cells").unbind('click').one("click", changeTurn)
        $(".cells").text('');
        const divMessage = $("#boardMessage");
        divMessage.css('color', 'gray');
        divMessage.text('');
    };


    const changeTurn = function Turne() {

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
    $(".cells").one('click', changeTurn)
    $("#reset").click(reset);

});