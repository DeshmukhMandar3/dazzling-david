import React, { useEffect, useState } from "react";
import { checkGameTied, checkWinner, togglePlayer } from "../Utils/functions";
import { PlayerValue, WinnerStrikeClassname } from "../Utils/enums";
import { IoIosRefresh } from "react-icons/io";
import { IoArrowBackOutline } from "react-icons/io5";
import Button from "../Components/Button";
import useSound from "use-sound";
import mouseClickOne from "../Sounds/mouseClickOne.mp3";
import mouseClickTwo from "../Sounds/mouseClickTwo.mp3";
import winnerMusic from "../Sounds/winnerMusic.mp3";
import matchTied from "../Sounds/matchTied.mp3";
import notAllowed from "../Sounds/notAllowed.mp3";
import { useNavigate } from "react-router";

const Game = () => {
  const navigate = useNavigate();
  const [selectedPlayer, setSelectedPlayer] = useState(0);
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
  const [playUser1] = useSound(mouseClickOne);
  const [playUser2] = useSound(mouseClickTwo);
  const [playMatchTied] = useSound(matchTied);
  const [playNotAllowed] = useSound(notAllowed);

  const handleGameUpdate = (row, column) => {
    setGrid((previousGrid) => {
      if (previousGrid[row][column] !== 0 || winner) {
        playNotAllowed();
        return previousGrid;
      }

      if (!winner && !isTied) {
        if (selectedPlayer === 0) {
          playUser1();
        } else {
          playUser2();
        }
      }

      const updatedGrid = previousGrid.map((r, rowIndex) => {
        return r.map((cell, columnIndex) => {
          return row === rowIndex && column === columnIndex
            ? PlayerValue[selectedPlayer]
            : cell;
        });
      });

      let checkedValue = checkWinner(PlayerValue[selectedPlayer], updatedGrid);

      let PlayerName = {
        0: player1 ? player1 : "Player 1",
        1: player2 ? player2 : "Player 2",
      };

      if (checkedValue?.isWinner) {
        play();
        setWinner(PlayerName[selectedPlayer]);
        setWinnerStrike(checkedValue?.type);
        return updatedGrid;
      }

      if (checkGameTied(updatedGrid)) {
        playMatchTied();
        setIsTied(true);
        return updatedGrid;
      }

      togglePlayer(selectedPlayer, setSelectedPlayer);
      return updatedGrid;
    });
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
    setIsTied(false);
    setPlayer(0);
  };

  useEffect(() => {
    setPlayer1(localStorage.getItem("Player_1"));
    setPlayer2(localStorage.getItem("Player_2"));
  }, []);

  return (
    <div className="game">
      <div className="utils">
        <Button
          text={<IoArrowBackOutline />}
          onButtonClick={() => navigate("/")}
          customClassname="game-refresh"
        />
        <Button
          text={<IoIosRefresh />}
          onButtonClick={refreshGrid}
          customClassname="game-refresh"
        />
      </div>

      <div>
        <div className="game-title">Tic Tac Toe</div>
        {!winner && !isTied && (
          <div className="game-players">
            <div
              className={
                selectedPlayer === 0 ? "game-selected-player" : "game-player"
              }
            >
              {player1 ? player1 : "Player 1"}
            </div>
            <div
              className={
                selectedPlayer === 1 ? "game-selected-player" : "game-player"
              }
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
                key={rowIndex}
              >
                {element.map((item, columnIndex) => {
                  return (
                    <div
                      className={`game-box ${
                        columnIndex === 1 ? "game-column-border" : ""
                      }`}
                      onClick={() => {
                        handleGameUpdate(rowIndex, columnIndex);
                      }}
                      key={columnIndex}
                    >
                      {item == "0" ? "" : item}
                    </div>
                  );
                })}
              </div>
            );
          })}
          {winner && <div className={WinnerStrikeClassname[winnerStrike]} />}
        </div>
      </div>
    </div>
  );
};

export default Game;
