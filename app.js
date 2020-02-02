
$(document).ready(function () {

    const gameBoard = function arrayBoard() {

        let board = ['','','',
                    '','','',
                    '','',''];

        $(".cells").each(function (index) {
            board[index] = $(this).text();
        });
        return board;
    }
    let turn = 1;
    let moveCuont = 0;
    let Tiegame = 0 ;
    let player1Wins = 0;
    let player2Wins = 0;
// create function to changeTurn between x and o 



// create a function wtih 3 arguomnt and convare them to gather 
    const checkWinner = function conditions(a, b, c) {

        if (a === 'X' && b === 'X' && c === 'X') {
            return 1;
        } else if (a === 'O' && b === 'O' && c === 'O') {
            return -1;
        } else {
            return 0;
        }
    }


// create a function take bord as arguomnt and check the winningCase
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



    const gameOver = function gameOverMessage(result) {

        let divMessage = $("#boardMessage");
        if (result > 0) {
            player1Wins++
            divMessage.text("X win!");
            divMessage.css('color', 'red')
            return;
        } else if (result < 0) {
            player2Wins++
            divMessage.text("O win!");
            return;
        } else  {
            Tiegame ++
            divMessage.text("Tie game.");
            divMessage.css('color', 'blue')
        }
    }
    const reset = function resetGame() {

        $(".cells").text('');
        const divMessage = $("#boardMessage");
        divMessage.css('color', 'gray');
        divMessage.text('Click a Cell');
    }
    
    let board = gameBoard();
    result = checkWinner(board);
    if (result !== 0) {
        showGameOver(result);
        return;
    }
    const changeTurn = function Turne() {

        let board , result;
    
        let player1 = '';
        let player2 = '';

        if (turn === 1) {

            if (player1 !== '' || winningCase(gameBoard()) !== 0 ||player2 !== '') {
             
                return;
            }

            if ($('td.cells').is(':empty')) {

                player1 = 'X'
                event.target.innerHTML = player1
                 board = gameBoard();
                 result = winningCase(board);
                if (result !== 0) {
                    gameOver(result);
                    return;
                }
            
                turn++

                moveCuont ++


            } else {
                return
            }

        } else {

            if (player1 !== '' || winningCase(gameBoard()) !== 0 || player2 !== '') {
                 
                return;
            }

            if ($('td.cells').is(':empty')) {

                player2 = 'O'
                event.target.innerHTML = player2
                board = gameBoard();
                result = winningCase(board);
                if (result !== 0) { 
                    gameOver(result);
                    return;
                }

                turn--

                moveCuont ++
               
            } else {

                return ;
            }

        }

            result = checkWinner(board);
            if (moveCuont === 9) {
                gameOver(result);
                return;
            }

    }


    $(".cells").click(changeTurn);
    $("#reset").click(reset);
    reset();
});