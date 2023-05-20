/* eslint-disable quotes */
/* eslint-disable indent */
const Gameboard = (() => {
    let gameBoard = ["x","o","x","o","x","o","x","o","x"];
    return {gameBoard};
})();

const player = (name,icon) => {
    const play = (eId) => {
        Gameboard.gameBoard[eId] = icon;
        displayController.display();
    };
    return { name,icon,play };
};

const displayController = (() => {
    let array = document.querySelectorAll(".card");
    const display = () => {
        for (let i in Gameboard.gameBoard) {
            array[i].textContent = Gameboard.gameBoard[i];
        }
    };
    const restartDisplay = () => {
        Gameboard.gameBoard = ["","","","","","","","",""];
        displayController.display();
        let fieldset = document.querySelector(".player1");
        let div = document.querySelector(".player1text");
        fieldset.style.backgroundColor = "inherit";
        div.textContent = "";
        fieldset = document.querySelector(".player2");
        div = document.querySelector(".player2text");
        fieldset.style.backgroundColor = "inherit";
        div.textContent = "";
    };
    return {display,restartDisplay};
})();

const game = (() => {
    const playRound = () => {
        displayController.restartDisplay();
        const name1 = document.getElementById("player1");
        const name2 = document.getElementById("player2");

        const player1 = player(name1.value,"X");
        const player2 = player(name2.value,"O");
        let count = 0;
        window.addEventListener("click",myfunction);
        function myfunction(e) {
            let element = e.target;
            let eId = element.id;
            let eClass = element.className;
            if (eClass=="card" && Gameboard.gameBoard[eId] == "") {
                if (count%2==0) {
                    player1.play(eId);
                }
                else {
                    player2.play(eId);
                }
                count++;
                if (count >= 5) {
                    count = gameOver(count,player1,player2);
                }
            }
            if (count == 10) {
                window.removeEventListener("click",myfunction);
            }
        }
        return {player1,player2};
    };

    const gameOver = (count,player1,player2) => {
        let i;
        for (i = 0 ; i < 9 ; i=i+3) {
            let j = i;
            if (Gameboard.gameBoard[j]==Gameboard.gameBoard[j+1] && Gameboard.gameBoard[j+1]==Gameboard.gameBoard[j+2] && Gameboard.gameBoard[j]!="") {
                if (Gameboard.gameBoard[j]=="X") {
                    winner(player1,player1,player2);
                }
                else {
                    winner(player2,player1,player2);
                }
                return 10;
            }
        }

        for (i = 0 ; i < 3 ; i++) {
            let j = i;
            if (Gameboard.gameBoard[j]==Gameboard.gameBoard[j+3] && Gameboard.gameBoard[j+3]==Gameboard.gameBoard[j+6] && Gameboard.gameBoard[j]!="") {
                if (Gameboard.gameBoard[j]=="X") {
                    winner(player1,player1,player2);
                }
                else {
                    winner(player2,player1,player2);
                }
                return 10;
            }
        }

        if (Gameboard.gameBoard[0]==Gameboard.gameBoard[4] && Gameboard.gameBoard[4]==Gameboard.gameBoard[8] && Gameboard.gameBoard[0]!="") {
            if (Gameboard.gameBoard[0]=="X") {
                winner(player1,player1,player2);
            }
            else {
                winner(player2,player1,player2);
            }
            return 10;
        }

        if (Gameboard.gameBoard[2]==Gameboard.gameBoard[4] && Gameboard.gameBoard[4]==Gameboard.gameBoard[6] && Gameboard.gameBoard[2]!="") {
            if (Gameboard.gameBoard[2]=="X") {
                winner(player1,player1,player2);
            }
            else {
                winner(player2,player1,player2);
            }
            return 10;
        }
        if (count >= 9 ) {
            alert("tie");
            return 10;
        }
        return count;
    };
    const winner = (player,player1,player2) => {
        if (player == player1) {
            const fieldset = document.querySelector(".player1");
            const div = document.querySelector(".player1text");
            fieldset.style.backgroundColor = "green";
            div.textContent = "winner";
        }
        else {
            const fieldset = document.querySelector(".player2");
            const div = document.querySelector(".player2text");
            fieldset.style.backgroundColor = "green";
            div.textContent = "winner";
        }
    };
    return {playRound};
})();

const gameStart = (() => {
    const start = () => {
        const button = document.querySelector("button");
        button.addEventListener("click",myfunction);
        function myfunction() {
            game.playRound();
        }
    };
    return { start };
})();

gameStart.start();