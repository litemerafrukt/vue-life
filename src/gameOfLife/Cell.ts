export enum Alive {
  False = 0,
  True = 1,
}

export class Cell {
  constructor(
    public isAlive: Alive = Math.random() > 0.5 ? Alive.True : Alive.False
  ) {}

  nextGeneration(neighbours: Cell[]): Cell {
    const surrounding = neighbours
      .map((cell) => cell.isAlive)
      .reduce((a: number, b: number) => a + b, 0);

    if (this.isAlive && surrounding > 1 && surrounding <= 3) {
      return new Cell(Alive.True);
    }

    if (!this.isAlive && surrounding === 3) {
      return new Cell(Alive.True);
    }

    return new Cell(Alive.False);
  }

  toString(): string {
    return this.isAlive ? "X" : " ";
  }
}
