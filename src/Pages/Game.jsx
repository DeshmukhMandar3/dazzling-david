import React, { useState } from "react";
import { checkWinner, togglePlayer } from "../Utils/functions";
import { PlayerName, PlayerValue, WinnerStrikeClassname } from "../Utils/enums";

const Game = () => {
  const [player, setPlayer] = useState(0);
  const [winner, setWinner] = useState(null);
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
    }

    togglePlayer(player, setPlayer);
  };

  return (
    <div className="game">
      <div>
        <div className="game-title">Tic Tac Toe</div>
        {winner && <div>{winner} is the winner</div>}
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
