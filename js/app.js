document.addEventListener('DOMContentLoaded', () => {

    const squares = document.querySelectorAll('.sqr');

    const messageElement = document.getElementById('message');

    const boardElement = document.querySelector('.board');

    let currentPlayer = 'X';
    let gameActive = true;
    let gameState = Array(9).fill(null);
  
    const winningConditions = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
  
    function handleCellClick(event) {
      const clickedCellIndex = Array.from(squares).indexOf(event.target);
  
      if (gameState[clickedCellIndex] !== null || !gameActive) {
        return;
      }
  
      gameState[clickedCellIndex] = currentPlayer;
      event.target.textContent = currentPlayer;
  
      if (checkWinner()) {
        messageElement.textContent = `Player ${currentPlayer} Wins!`;
        gameActive = false;
        return;
      }
  
      if (gameState.every(cell => cell !== null)) {
        messageElement.textContent = "It's a Tie!";
        gameActive = false;
        return;
      }
  
      currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
      messageElement.textContent = `Player ${currentPlayer}'s turn`;
    }
  
    function checkWinner() {
      for (let i = 0; i < winningConditions.length; i++) {
        const [a, b, c] = winningConditions[i];
        if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
          return true;
        }
      }
      return false;
    }
  
    function resetGame() {
      gameState = Array(9).fill(null);
      squares.forEach(cell => (cell.textContent = ''));
      currentPlayer = 'X';
      gameActive = true;
      messageElement.textContent = `Player ${currentPlayer}'s turn`;
    }
  
    squares.forEach(cell => cell.addEventListener('click', handleCellClick));
  
    const resetButton = document.createElement('button');

    resetButton.textContent = 'Reset Game';

    resetButton.addEventListener('click', resetGame);
    
    document.body.appendChild(resetButton);
  
    messageElement.textContent = `Player ${currentPlayer}'s turn`;
  });