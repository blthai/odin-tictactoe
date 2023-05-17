const boardSlots = document.querySelectorAll(".board-slot");

const createPlayer = (name, playerNumber) => {
  return { name, playerNumber };
};

const playerOne = createPlayer('Benji', 1);
const playerTwo = createPlayer('Maylinh', 2);

const gameBoard = (() => {
  const board = [0, 0, 0, 0, 0, 0, 0, 0, 0];
  let currentTurn = 1;
  let slotIndex = 0;
  
  const displayBoard = () => {
    let index = 0;
    boardSlots.forEach((slot) => {
      if (board[index] === 1) {
        slot.textContent = "X";
      } else if (board[index] === 2) {
        slot.textContent = "O";
      } else {
        slot.textContent = "-";
      }
      index += 1;
    });
    index = 0;
  };

  const markTile = (event) => {
    const chosenBoardTile = event.target.dataset.index;
    if(board[chosenBoardTile]!==0){
      return;
    }
    if(currentTurn % 2 !== 0){
      board[chosenBoardTile] = playerOne.playerNumber;
    }else{
      board[chosenBoardTile] = playerTwo.playerNumber;
    }
    currentTurn+=1;
    gameBoard.displayBoard();
  };

  boardSlots.forEach((slot) => {
    slot.dataset.index = slotIndex;
    slotIndex+=1;
    slot.addEventListener('click', markTile);
  })


  const checkWinner = () => {
    
  };

  const playRound = () => {

    gameBoard.displayBoard();
  };
  

  return { board, playRound};
})();




const gameFlow = (() => {
  let winnerExists = false;

  const startGame = () => {
    while(winnerExists === false){
      gameBoard.playRound();
    }
  };
  
})();

gameBoard.displayBoard();
