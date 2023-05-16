const boardSlots = document.querySelectorAll(".board-slot");

const gameBoard = (() => {
  const board = [0, 0, 0, 0, 0, 0, 0, 0, 0];

  const displayBoard = () => {
    let index = 0;
    boardSlots.forEach((slot) => {
      if(board[index]=== 1){
        slot.textContent = "X";
      }
      else if(board[index]=== 2){
        slot.textContent = "O";
      }
      else{
        slot.textContent = "-";
      }
      index+=1;
    })
    index = 0;
  };
  return {board, displayBoard};

  
})();

const displayController = (() => {})();

const createPlayer = (name) => {
    return {name};
};

const gameFlow = () => {};

gameBoard.displayBoard();
