const boardSlots = document.querySelectorAll(".board-slot");

const gameBoard = (() => {
  const board = [0, 0, 0, 0, 0, 0, 0, 0, 0];
  let winnerExists = false;
  let tieExists = false;
  const gameStart = false;

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

  const resetBoard = () => {
    for (let index = 0; index < board.length; index += 1) {
      board[index] = 0;
    }
  };

  const checkColumn = (start, end, playerNumber) => {
    let winningColumn = true;
    board.slice(start, end).forEach((index) => {
      if (index !== playerNumber) {
        winningColumn = false;
      }
    });
    return winningColumn;
  };

  const checkRow = (chosenRow, playerNumber) => {
    let winningRow = true;
    chosenRow.forEach((tile) => {
      if (board[tile] !== playerNumber) {
        winningRow = false;
      }
    });
    return winningRow;
  };

  const checkDiagonal = (diagonalArray, playerNumber) => {
    let winningDiagonal = true;
    diagonalArray.forEach((tile) => {
      if (board[tile] !== playerNumber) {
        winningDiagonal = false;
      }
    });
    return winningDiagonal;
  };

  const checkWinner = (playerNumber, chosenTile) => {
    const winningArray = [playerNumber, playerNumber, playerNumber];
    if ([0, 1, 2].includes(chosenTile)) {
      if (
        checkColumn(0, 3, playerNumber) ||
        checkRow([chosenTile, chosenTile + 3, chosenTile + 6, playerNumber])
      ) {
        winnerExists = true;
      }
    }
    if ([3, 4, 5].includes(chosenTile)) {
      if (
        checkColumn(3, 6, playerNumber) ||
        checkRow([chosenTile, chosenTile - 3, chosenTile + 3, playerNumber])
      ) {
        winnerExists = true;
      }
    }
    if ([6, 7, 8].includes(chosenTile)) {
      if (
        checkColumn(6, 9, playerNumber) ||
        checkRow([chosenTile, chosenTile - 3, chosenTile - 6], playerNumber)
      ) {
        winnerExists = true;
      }
    }
    if ([0, 2, 4, 6, 8].includes(chosenTile)) {
      if (
        checkDiagonal([0, 4, 8], playerNumber) ||
        checkDiagonal([2, 4, 6], playerNumber)
      ) {
        winnerExists = true;
      }
    } else if (!board.includes(0)) {
      tieExists = true;
    }
  };
  const getWinnerExists = () => winnerExists;
  const falsifyWinnerExists = () => {
    winnerExists = false;
  };
  return {
    board,
    displayBoard,
    checkWinner,
    getWinnerExists,
    gameStart,
    resetBoard,
    falsifyWinnerExists,
  };
})();

const Player = (playerName, playerNumber) => {
  const markTile = (chosenBoardTile) => {
    if (gameBoard.board[chosenBoardTile] !== 0) {
      return;
    }
    gameBoard.board[chosenBoardTile] = playerNumber;
  };
  return { playerName, playerNumber, markTile };
};

const gameFlow = (() => {
  let currentTurn = 1;
  let playerOne;
  let playerTwo;

  const createPlayers = (playerOneName, playerTwoName) => {
    playerOne = Player(playerOneName, 1);
    playerTwo = Player(playerTwoName, 2);
  };

  const resetTurns = () => {
    currentTurn = 1;
  };
  const playTurn = (event) => {
    if (gameBoard.getWinnerExists() || gameBoard.gameStart === false) {
      return;
    }
    console.log(currentTurn);
    const chosenBoardTile = Number(event.target.dataset.index);
    if (currentTurn % 2 !== 0) {
      playerOne.markTile(chosenBoardTile);
      gameBoard.checkWinner(playerOne.playerNumber, chosenBoardTile);
    } else {
      playerTwo.markTile(chosenBoardTile);
      gameBoard.checkWinner(playerTwo.playerNumber, chosenBoardTile);
    }
    currentTurn += 1;
    gameBoard.displayBoard();
  };
  return { playTurn, playerOne, playerTwo, resetTurns, createPlayers };
})();

const displayController = (() => {
  const newGameForm = document.querySelector(".new-game-form");

  const initializeDisplay = () => {
    const playerOneInput = document.createElement("input");
    playerOneInput.id = "playerone";
    playerOneInput.required = "true";
    const playerOneLabel = document.createElement("label");
    playerOneLabel.htmlFor = "playerone";
    playerOneLabel.textContent = "Player One: ";
    const playerTwoInput = document.createElement("input");
    playerTwoInput.id = "playertwo";
    playerTwoInput.required = "true";
    const playerTwoLabel = document.createElement("label");
    playerTwoLabel.htmlFor = "playertwo";
    playerTwoLabel.textContent = "Player Two: ";
    const submitPlayersButton = document.createElement("button");
    submitPlayersButton.type = "submit";
    submitPlayersButton.textContent = "Start Game!";
    const playerOneContainer = document.createElement("div");
    playerOneContainer.appendChild(playerOneLabel);
    playerOneContainer.appendChild(playerOneInput);
    const playerTwoContainer = document.createElement("div");
    playerTwoContainer.appendChild(playerTwoLabel);
    playerTwoContainer.appendChild(playerTwoInput);
    newGameForm.appendChild(playerOneContainer);
    newGameForm.appendChild(playerTwoContainer);
    newGameForm.appendChild(submitPlayersButton);
    newGameForm.addEventListener("submit", (event) => {
      event.preventDefault();
      gameFlow.createPlayers(playerOneInput.value, playerTwoInput.value);
      gameBoard.gameStart = true;
      while (newGameForm.firstChild) {
        newGameForm.removeChild(newGameForm.firstChild);
      }
      const resetButton = document.createElement("button");
      resetButton.textContent = "Reset Game";
      resetButton.addEventListener("click", resetGame);
      newGameForm.appendChild(resetButton);
    });
  };

  const resetGame = () => {
    newGameForm.removeChild(newGameForm.firstChild);
    gameBoard.resetBoard();
    gameBoard.displayBoard();
    gameBoard.gameStart = false;
    gameBoard.falsifyWinnerExists();
    gameFlow.resetTurns();
    initializeDisplay();
  };

  return { initializeDisplay };
})();

let slotIndex = 0;
boardSlots.forEach((slot) => {
  slot.dataset.index = slotIndex;
  slotIndex += 1;
  slot.addEventListener("click", gameFlow.playTurn);
});

displayController.initializeDisplay();
gameBoard.displayBoard();
