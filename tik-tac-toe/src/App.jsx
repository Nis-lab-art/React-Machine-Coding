import { useState } from "react";
import "./App.css";

const initialBoard = () => Array(9).fill(null);
const WINNING_PATTERNS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [6, 4, 2],
];

function App() {
  const [board, setBoard] = useState(initialBoard());
  const [isXNext, setIsXNext] = useState(true);

  const calculateWinner = (currBoard) => {
    for (let i = 0; i < WINNING_PATTERNS.length; i++) {
      const [a, b, c] = WINNING_PATTERNS[i];
      if (
        currBoard[a] &&
        currBoard[a] === currBoard[b] &&
        currBoard[a] === currBoard[c]
      ) {
        return currBoard[a];
      }
    }
    return null;
  };

  const handleClick = (i) => {
    const winner = calculateWinner(board);
    if (winner || board[i]) return;
    const newBoard = [...board];
    newBoard[i] = isXNext ? "X" : "O";
    setBoard(newBoard);
    setIsXNext(!isXNext);
  };

  const resetGame = () => {
    setBoard(initialBoard());
    setIsXNext(true);
  };

  const getStatusMessage = () => {
    const winner = calculateWinner(board);
    if (winner) return `Player ${winner} wins`;
    if (!board.includes(null)) return `Its a draw`;
    return `Player ${isXNext ? "X" : "O"} turn`;
  };

  return (
    <div className="container">
      <h1>Tik Tac Toe</h1>
      <div className="status">
        {getStatusMessage()}
        <button className="reset-btn" onClick={resetGame}>
          Reset Game
        </button>
      </div>
      <div className="board">
        {board.map((b, index) => (
          <button
            key={index}
            className="cells"
            onClick={() => handleClick(index)}
            disabled={b !== null}
          >
            {b}
          </button>
        ))}
      </div>
    </div>
  );
}

export default App;
