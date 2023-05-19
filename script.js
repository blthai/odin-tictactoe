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
  let winnerExists = false;
  let tieExists = false;
  
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

  const checkColumn = (start, end, playerNumber) => {
    let winningColumn = true;
    board.slice(start, end).forEach((index) => {
      if(index !== playerNumber){
        
        winningColumn = false;
      }
    })    
    return winningColumn;
  }

  const checkRow = (chosenRow, playerNumber) => {
    let winningRow = true;
    chosenRow.forEach((tile) => {if(board[tile]!==playerNumber){winningRow=false;}})
    return winningRow;
  }

  const checkDiagonal = (diagonalArray, playerNumber) => {
    let winningDiagonal = true;
    diagonalArray.forEach((tile) => {
      if(board[tile]!==playerNumber){
      winningDiagonal=false;
    }})
    return winningDiagonal;
  }

  const checkWinner = (playerNumber, chosenTile) => {
    const winningArray = [playerNumber, playerNumber, playerNumber];
    if([0, 1, 2].includes(chosenTile)){
      if(checkColumn(0, 3, playerNumber) || checkRow([chosenTile, chosenTile + 3, chosenTile + 6, playerNumber])){
        winnerExists = true;
      }
    }
    if([3, 4, 5].includes(chosenTile)){
      if(checkColumn(3, 6, playerNumber) || checkRow([chosenTile, chosenTile - 3, chosenTile + 3, playerNumber])){
        winnerExists = true;
      }
    }
    if([6, 7, 8].includes(chosenTile)){
      if(checkColumn(6, 9, playerNumber) || checkRow([chosenTile, chosenTile - 3, chosenTile - 3, playerNumber])){
        winnerExists = true;
      }
    }
    if([0,2,4,6,8].includes(chosenTile)){
      if(checkDiagonal([0,4,8], playerNumber) || checkDiagonal([2, 4, 6], playerNumber)){
        winnerExists = true;
      }
    }
    else if(!board.includes(0)){
      tieExists = true;
    }
  };

  const markTile = (event) => {
    if(winnerExists){
      return;
    }
    const chosenBoardTile = Number(event.target.dataset.index);
    if(board[chosenBoardTile]!==0){
      return;
    }
    if(currentTurn % 2 !== 0){
      board[chosenBoardTile] = playerOne.playerNumber;
      checkWinner(playerOne.playerNumber, chosenBoardTile);
      
    }else{
      board[chosenBoardTile] = playerTwo.playerNumber;
      checkWinner(playerTwo.playerNumber, chosenBoardTile);
    }
    currentTurn+=1;
    gameBoard.displayBoard();
  };
  boardSlots.forEach((slot) => {
    slot.dataset.index = slotIndex;
    slotIndex+=1;
    slot.addEventListener('click', markTile);
  })
  const playRound = () => {

    gameBoard.displayBoard();
  };
  return { board, playRound, displayBoard, winnerExists};
})();


const gameFlow = (() => {
  const startGame = () => {
    while(gameBoard.winnerExists === false){
      gameBoard.playRound();
    }

  };
  return {};
})();

gameBoard.displayBoard();
