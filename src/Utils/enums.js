export const PlayerValue = Object.freeze({
  0: "O",
  1: "X",
});

export const PlayerName = Object.freeze({
  0: "Player 1",
  1: "Player 2",
});

export const WinnerStrikePosition = Object.freeze({
  Row_0: "RowTop",
  Row_1: "RowMiddle",
  Row_2: "RowBottom",
  Column_0: "ColumnLeft",
  Column_1: "ColumnMiddle",
  Column_2: "ColumnRight",
  DiagonalLeft: "DiagonalLeft",
  DiagonalRight: "DiagonalRight",
});

export const WinnerStrikeClassname = Object.freeze({
  RowTop: "game-winner-top-strike",
  RowMiddle: "game-winner-row-middle-strike",
  RowBottom: "game-winner-bottom-strike",
  ColumnLeft: "game-winner-left-strike",
  ColumnMiddle: "game-winner-column-middle-strike",
  ColumnRight: "game-winner-right-strike",
  DiagonalLeft: "game-winner-diagonal-left-strike",
  DiagonalRight: "game-winner-diagonal-right-strike",
});
