import { useState } from "react";
import Board from "./Board";
import { Button } from "react-bootstrap";
import "../css/Game.css";

const defaultHistory = [Array(9).fill(null)];

export default function Game() {
  console.log("Inside Game");
  const [history, setHistory] = useState(defaultHistory);
  const [currentMove, setCurrentMove] = useState(0);
  const currentSquare = history[currentMove];
  const xIsNext = currentMove % 2 === 0;
  const isDraw = currentMove === 9;

  console.log("first", currentSquare, history, currentMove, xIsNext);

  /*
  For handling click buttons, squares is updated square after click
  [null, null, null, null, O, null, null, X, null]
  */
  function handlePlay(squares) {
    let nextHistory;
    nextHistory = [...history.slice(0, currentMove + 1), squares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  /*
  For jumping to patricular step
  */
  function jumpTo(nextMove) {
    if (nextMove === 0) {
      setHistory(defaultHistory);
    }
    setCurrentMove(nextMove);
    [...Array(9)].map((_, ind) => {
      document.getElementById(ind).style.backgroundColor = "white";
      document.getElementById(ind).style.color = "#000";
      return 0;
    });
  }

  const moves = history.map((item, move) => {
    let description;
    if (move > 0) {
      description = "Back to move " + move;
    } else {
      description = "Restart Game";
    }
    return (
      <li key={move} style={{ listStyle: "none" }}>
        <Button
          style={
            description === "Restart Game"
              ? { width: "100%", margin: "1%", backgroundColor: "#fff862" }
              : { width: "100%", margin: "1%" }
          }
          variant="light"
          onClick={() => jumpTo(move)}
        >
          {description}
        </Button>
      </li>
    );
  });

  console.log("second", currentSquare, history);

  return (
    <div className="game">
      <h1 id="main-heading">Welcome to the famous TicTacToe game!</h1>
      <div className="game-class">
        <Board
          xIsNext={xIsNext}
          squares={currentSquare}
          onPlay={handlePlay}
          isDraw={isDraw}
        />
        <div className="game-info">
          <h3 id="game-history-title">Game History</h3>
          <ol>{moves}</ol>
        </div>
      </div>
    </div>
  );
}
