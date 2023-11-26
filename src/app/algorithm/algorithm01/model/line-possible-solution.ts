import { Cell } from './cell';

export class LinePossibleSolution {
  constructor(private cells: Array<Cell>) {
  }

  getCells(): Array<Cell> {
    return this.cells;
  }
}
