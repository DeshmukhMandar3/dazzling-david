import React, { useEffect, useState } from "react";
import { checkGameTied, checkWinner, togglePlayer } from "../Utils/functions";
import { PlayerName, PlayerValue, WinnerStrikeClassname } from "../Utils/enums";

const Game = () => {
  const [player, setPlayer] = useState(0);
  const [player1, setPlayer1] = useState("");
  const [player2, setPlayer2] = useState("");
  const [winner, setWinner] = useState(null);
  const [isTied, setIsTied] = useState(false);
  const [winnerStrike, setWinnerStrike] = useState(null);
  const [grid, setGrid] = useState([
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ]);

  const handleGameUpdate = (row, column) => {
    let updateValue = PlayerValue[player];
    let temp = grid;
    if (temp[row][column] !== 0 || winner) {
      return;
    }
    temp[row][column] = updateValue;
    setGrid(temp);

    let checkedValue = checkWinner(updateValue, grid);
    if (checkedValue?.isWinner) {
      setWinner(PlayerName[player]);
      setWinnerStrike(checkedValue?.type);
      return;
    }
    if (checkGameTied(grid)) {
      setIsTied(true);
      return;
    }
    togglePlayer(player, setPlayer);
  };

  useEffect(() => {
    setPlayer1(localStorage.getItem("Player_1"));
    setPlayer2(localStorage.getItem("Player_2"));
  }, []);

  return (
    <div className="game">
      <div>
        <div className="game-title">Tic Tac Toe</div>

        <div className="game-players">
          <div
            className={player === 0 ? "game-selected-player" : "game-player"}
          >
            {player1 ? player1 : "Player 1"}
          </div>
          <div
            className={player === 1 ? "game-selected-player" : "game-player"}
          >
            {player2 ? player2 : "Player 2"}
          </div>
        </div>

        {winner ? (
          <div>{winner} is the winner</div>
        ) : isTied ? (
          <div>Match Tied!</div>
        ) : (
          <div style={{ height: "12px" }}></div>
        )}

        <div className="game-grid">
          {grid.map((element, rowIndex) => {
            return (
              <div className="game-row">
                {element.map((item, columnIndex) => {
                  return (
                    <div
                      className="game-box"
                      onClick={() => handleGameUpdate(rowIndex, columnIndex)}
                    >
                      {item == "0" ? "" : item}
                    </div>
                  );
                })}
              </div>
            );
          })}

          {winner && <hr className={WinnerStrikeClassname[winnerStrike]} />}
        </div>
      </div>
    </div>
  );
};

export default Game;
