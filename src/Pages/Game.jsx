import React, { useEffect, useState } from "react";
import { checkGameTied, checkWinner, togglePlayer } from "../Utils/functions";
import { PlayerValue, WinnerStrikeClassname } from "../Utils/enums";
import { IoIosRefresh } from "react-icons/io";
import Button from "../Components/Button";
import useSound from "use-sound";
import tap from "../Sounds/tap.mp3";
import mouseClickOne from "../Sounds/mouseClickOne.mp3";
import mouseClickTwo from "../Sounds/mouseClickTwo.mp3";
import winnerMusic from "../Sounds/winnerMusic.mp3";

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

  const [play] = useSound(winnerMusic);
  const [playerUser1] = useSound(mouseClickOne);
  const [playerUser2] = useSound(mouseClickTwo);

  const handleGameUpdate = (row, column) => {
    let updateValue = PlayerValue[player];
    let temp = grid;
    if (temp[row][column] !== 0 || winner) {
      return;
    }
    temp[row][column] = updateValue;
    setGrid(temp);

    let PlayerName = {
      0: player1 ? player1 : "Player 1",
      1: player2 ? player2 : "Player 2",
    };

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

  const refreshGrid = () => {
    let initialGrid = [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ];
    setGrid(initialGrid);
    setWinner(null);
    setWinnerStrike(null);
    setPlayer(0);
  };

  useEffect(() => {
    setPlayer1(localStorage.getItem("Player_1"));
    setPlayer2(localStorage.getItem("Player_2"));
  }, []);

  useEffect(() => {
    if (winner) {
      play();
    }
  }, [winner]);

  return (
    <div className="game">
      <div className="utils">
        <Button
          text={<IoIosRefresh />}
          onButtonClick={refreshGrid}
          customClassname="game-refresh"
        />
      </div>

      <div>
        <div className="game-title">Tic Tac Toe</div>

        {!winner && (
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
        )}

        {winner ? (
          <div className="game-result">{winner} is the winner</div>
        ) : isTied ? (
          <div className="game-result">Match Tied!</div>
        ) : (
          <></>
        )}

        <div className="game-grid">
          {grid.map((element, rowIndex) => {
            return (
              <div
                className={`game-row ${
                  rowIndex === 1 ? "game-row-border" : ""
                }`}
              >
                {element.map((item, columnIndex) => {
                  return (
                    <div
                      className={`game-box ${
                        columnIndex === 1 ? "game-column-border" : ""
                      }`}
                      onClick={() => {
                        handleGameUpdate(rowIndex, columnIndex);
                        {
                          player === 0 ? playerUser1() : playerUser2();
                        }
                      }}
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
