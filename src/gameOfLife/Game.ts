import {
  randomLife,
  createCell,
  type Cell,
  isCell,
  nextGeneration,
  stringify as stringifyCell,
} from "./Cell";

export type Game = {
  kind: "Game";
  columns: number;
  rows: number;
  cells: Cell[][];
};

export function createGame(columns: number, rows: number): Game {
  const cells = Array.from({ length: rows }).map(() =>
    Array.from({ length: columns }).map(() => createCell(randomLife()))
  );

  return {
    kind: "Game",
    columns,
    rows,
    cells,
  };
}

export function stringify(game: Game) {
  return game.cells
    .map((row) => row.map((cell) => stringifyCell(cell)).join(" "))
    .join("\n");
}

export function advance(game: Game): Game {
  const nextGenerationCells: Cell[][] = [];

  for (let row = 0; row < game.rows; row++) {
    const newCellRow = [];
    for (let column = 0; column < game.columns; column++) {
      const currentCell = game.cells[row][column];
      const neighbours = getNeighbours(game, row, column);
      const nextGenerationCell = nextGeneration(currentCell, neighbours);

      newCellRow.push(nextGenerationCell);
    }
    nextGenerationCells.push(newCellRow);
  }

  return {
    ...game,
    cells: nextGenerationCells,
  };
}

function getCell(game: Game, row: number, column: number): Cell | null {
  if (row < 0 || row >= game.rows) return null;
  if (column < 0 || column >= game.columns) return null;

  return game.cells[row][column];
}

function getNeighbours(game: Game, row: number, column: number): Cell[] {
  // prettier-ignore
  const neighbours = [
    [-1, -1], [-1, 0], [-1, 1],
    [0,  -1],/* self */[0,  1],
    [1,  -1], [1,  0], [1,  1],
  ]
  .map(([y, x]) => getCell(game, row + y, column + x))
  .filter(isCell);

  return neighbours;
}
