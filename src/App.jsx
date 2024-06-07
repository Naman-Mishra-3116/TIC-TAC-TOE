import Player from "./components/Player";
import GameBoard from "./components/GameBoard";
import { useState } from "react";
import Log from "./components/Log";
import { WINNING_COMBINATIONS } from "./winning";
import GameOver from "./components/GameOver";

const initalValues = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function deriveActivePlayer(gameTurns) {
  let currentActivePlayer = "X";
  if (gameTurns.length > 0 && gameTurns[0].player === "X") {
    currentActivePlayer = "O";
  }
  return currentActivePlayer;
}
function App() {
  const [gameTurn, setGameTurn] = useState([]);
  const [playerName, setPlayerName] = useState({
    X: "Player 1",
    O: "Player 2",
  });

  const activePlayer = deriveActivePlayer(gameTurn);

  let gameBoard = [...initalValues.map((array) => [...array])];
  let winner = null;

  for (const turn of gameTurn) {
    const {
      square: { row, col },
      player,
    } = turn;
    gameBoard[row][col] = player;
  }

  for (const comb of WINNING_COMBINATIONS) {
    const first = gameBoard[comb[0].row][comb[0].column];
    const second = gameBoard[comb[1].row][comb[1].column];
    const third = gameBoard[comb[2].row][comb[2].column];

    if (first && first === second && second === third) {
      winner = playerName[first];
    }
  }
  function handlePlayerChange(symbol, name) {
    setPlayerName((prevPlayerName) => {
      return {
        ...prevPlayerName,
        [symbol]: name,
      };
    });
  }
  const isDraw = gameTurn.length === 9 && !winner;

  function onClickSquare(rowIndex, colIndex) {
    setGameTurn((prevTurn) => {
      const currentActivePlayer = deriveActivePlayer(prevTurn);
      const updatedTurn = [
        {
          square: { row: rowIndex, col: colIndex },
          player: currentActivePlayer,
        },
        ...prevTurn,
      ];
      return updatedTurn;
    });
  }

  function restart() {
    setGameTurn([]);
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            name={"Player 1"}
            symbol={"X"}
            isActive={activePlayer === "X"}
            playerChange={handlePlayerChange}
          ></Player>
          <Player
            name={"Player 2"}
            symbol={"O"}
            isActive={activePlayer === "O"}
            playerChange={handlePlayerChange}
          ></Player>
        </ol>
        {(winner || isDraw) && (
          <GameOver winner={winner ? winner : "Draw"} onRestart={restart} />
        )}
        <GameBoard onSelectSquare={onClickSquare} board={gameBoard}></GameBoard>
      </div>
      <Log logs={gameTurn} currentPlayer={activePlayer}></Log>
    </main>
  );
}

export default App;
