import { WinnerStrikePosition } from "./enums";

export const checkWinner = (checkValue, Grid) => {
  let isWinner = true;

  for (let i = 0; i < 3; i++) {
    if (Grid[0][i] !== checkValue) {
      isWinner = false;
      break;
    }
  }

  if (isWinner) {
    return { isWinner: true, type: WinnerStrikePosition.RowTop };
  }
  isWinner = true;

  for (let i = 0; i < 3; i++) {
    if (Grid[i][0] !== checkValue) {
      isWinner = false;
      break;
    }
  }
  if (isWinner) {
    return { isWinner: true, type: WinnerStrikePosition.ColumnLeft };
  }
  isWinner = true;

  for (let i = 0; i < 3; i++) {
    if (Grid[i][2] !== checkValue) {
      isWinner = false;
      break;
    }
  }
  if (isWinner) {
    return { isWinner: true, type: WinnerStrikePosition.ColumnRight };
  }
  isWinner = true;

  for (let i = 0; i < 3; i++) {
    if (Grid[2][i] !== checkValue) {
      isWinner = false;
      break;
    }
  }
  if (isWinner) {
    return { isWinner: true, type: WinnerStrikePosition.RowBottom };
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
    return true;
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

  return isWinner;
};

export const togglePlayer = (player, setPlayer) => {
  if (player === 0) {
    setPlayer(1);
  } else {
    setPlayer(0);
  }
};
