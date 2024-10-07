import { WinnerStrikePosition } from "./enums";

export const checkWinner = (checkValue, Grid) => {
  let isWinner = false;
  let position = null;

  for (let i = 0; i < 3; i++) {
    let count = 0;
    for (let j = 0; j < 3; j++) {
      if (Grid[i][j] === checkValue) {
        count++;
      }
    }
    position = `Row_${i}`;
    if (count === 3) {
      isWinner = true;
      break;
    }
  }
  if (isWinner) {
    return { isWinner: true, type: WinnerStrikePosition[position] };
  }

  for (let i = 0; i < 3; i++) {
    let count = 0;
    for (let j = 0; j < 3; j++) {
      if (Grid[j][i] === checkValue) {
        count++;
      }
    }
    position = `Column_${i}`;
    if (count === 3) {
      isWinner = true;
      break;
    }
  }
  if (isWinner) {
    return { isWinner: true, type: WinnerStrikePosition[position] };
  }
  isWinner = true;

  let x = 0;
  let y = 0;
  while (x < 3 && y < 3) {
    if (Grid[x][y] !== checkValue) {
      isWinner = false;
      break;
    }
    x++;
    y++;
  }
  if (isWinner) {
    return { isWinner: true, type: WinnerStrikePosition.DiagonalLeft };
  }
  isWinner = true;

  x = 0;
  y = 2;
  while (x < 3 && y >= 0) {
    if (Grid[x][y] !== checkValue) {
      isWinner = false;
      break;
    }
    x++;
    y--;
  }
  if (isWinner) {
    return { isWinner: true, type: WinnerStrikePosition.DiagonalRight };
  }
  return isWinner;
};

export const togglePlayer = (player, setPlayer) => {
  if (player === 0) {
    setPlayer(1);
  } else {
    setPlayer(0);
  }
};

export const checkGameTied = (grid) => {
  let isTied = true;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (grid[i][j] === 0) {
        isTied = false;
        break;
      }
    }
  }
  return isTied;
};
