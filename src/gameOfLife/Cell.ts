export enum Alive {
  False = 0,
  True = 1,
}

export function randomLife(randomizer = Math.random) {
  return randomizer() > 0.5 ? Alive.True : Alive.False;
}

export type Cell = {
  kind: "Cell";
  isAlive: Alive;
};

export const isCell = (unknown: unknown): unknown is Cell =>
  !!unknown && (unknown as Cell).kind === "Cell";

export function createCell(isAlive: Alive): Cell {
  return {
    kind: "Cell",
    isAlive,
  };
}

export function nextGeneration(cell: Cell, neighbours: Cell[]): Cell {
  const surrounding = neighbours
    .map((cell) => cell.isAlive)
    .reduce((a: number, b: number) => a + b, 0);

  if (cell.isAlive && surrounding > 1 && surrounding <= 3) {
    return createCell(Alive.True);
  }

  if (!cell.isAlive && surrounding === 3) {
    return createCell(Alive.True);
  }

  return createCell(Alive.False);
}

export function stringify(cell: Cell): string {
  return cell.isAlive ? "X" : " ";
}
