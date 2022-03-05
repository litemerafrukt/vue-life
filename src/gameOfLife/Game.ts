import { Cell } from "./Cell";

const isCell = (unknown: unknown): unknown is Cell => unknown instanceof Cell;

export class Game {
  public cells: Cell[][];

  constructor(private columns: number, private rows: number) {
    this.cells = Array.from({ length: rows }).map(() =>
      Array.from({ length: columns }).map(() => new Cell())
    );
  }

  toString(): string {
    return this.cells
      .map((row) => row.map((cell) => `${cell}`).join(" "))
      .join("\n");
  }

  loop() {
    const newWorld = [];

    for (let row = 0; row < this.rows; row++) {
      const newRow = [];
      for (let column = 0; column < this.columns; column++) {
        const currentCell = this.cells[row][column];
        const neighbours = this.neighbours(row, column);
        const nextGenerationCell = currentCell.nextGeneration(neighbours);

        newRow.push(nextGenerationCell);
      }
      newWorld.push(newRow);
    }

    this.cells = newWorld;
  }

  private getCell(row: number, column: number): Cell | null {
    if (row < 0 || row >= this.rows) return null;
    if (column < 0 || column >= this.columns) return null;

    return this.cells[row][column];
  }

  private neighbours(row: number, column: number): Cell[] {
    // prettier-ignore
    const neighbours = [
      [-1, -1], [-1, 0], [-1, 1],
      [0,  -1],/* self */[0,  1],
      [1,  -1], [1,  0], [1,  1],
    ]
    .map(([y, x]) => this.getCell(row + y, column + x))
    .filter(isCell);

    return neighbours;
  }
}
