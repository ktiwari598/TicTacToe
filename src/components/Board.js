import "../css/Board.css";
import Square from "./Square";

function calculateWinner(squares) {
  const winnerPattern = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < winnerPattern.length; i++) {
    const [a, b, c] = winnerPattern[i];
    if (squares[a] && squares[a] === squares[b] && squares[b] === squares[c]) {
      [...[a, b, c]].map((value) => {
        document.getElementById(value).style.backgroundColor = "red";
        document.getElementById(value).style.color = "#fff";
        return 0;
      });
      return squares[a];
    }
  }
  return null;
}

export default function Board({ xIsNext, squares, onPlay, isDraw }) {
  console.log("Inside Board");
  /*
  square is [null, null, null, null, null, null, null, null, null] initially
  */
  function handleClick(i) {
    if (squares[i] || calculateWinner(squares)) return;
    const nextSquares = squares.slice();
    if (xIsNext) nextSquares[i] = "X";
    else nextSquares[i] = "O";
    console.log("Board", squares, nextSquares);
    onPlay(nextSquares);
  }

  let status, winner;
  if (isDraw) {
    status = "Match Draw";
  } else {
    winner = calculateWinner(squares);
    if (winner) {
      status = "Winner : " + winner;
    } else {
      status = "Next Player Move : " + (xIsNext ? "X" : "O");
    }
  }

  console.log(winner, status);
  return (
    <>
      <div className="game-board">
        {status.includes("Winner") || status.includes("Match Draw") ? (
          <h2 id="status">
            <b>{status}</b>
          </h2>
        ) : (
          <h2 id="status">{status}</h2>
        )}

        <div className="square-box">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="board-row">
              {[...squares.slice(i * 3, i * 3 + 3)].map((square, ind) => (
                <Square
                  key={ind + i * 3}
                  id={ind + i * 3}
                  value={square}
                  handleClick={() => handleClick(ind + i * 3)}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
      {/* <div className="board-row">
        <Square value={squares[0]} handleClick={() => handleClick(0)} />
        <Square value={squares[1]} handleClick={() => handleClick(1)} />
        <Square value={squares[2]} handleClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} handleClick={() => handleClick(3)} />
        <Square value={squares[4]} handleClick={() => handleClick(4)} />
        <Square value={squares[5]} handleClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} handleClick={() => handleClick(6)} />
        <Square value={squares[7]} handleClick={() => handleClick(7)} />
        <Square value={squares[8]} handleClick={() => handleClick(8)} />
      </div> */}
    </>
  );
}
