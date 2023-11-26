import { Cell } from './cell';
import { LinePossibleSolution } from './line-possible-solution';
import { CellStatus } from './cell-status';

export class Line {
  private readonly definition: Array<number>;
  private readonly cells: Array<Cell>;

  private solved: boolean = false;
  private possibleSolutions: Array<LinePossibleSolution> = [];

  constructor(definition: Array<number>, length: number) {
    this.definition = definition;
    this.cells = Array(length).fill(null).map(() => new Cell());
  }

  getDefinition(): Array<number> {
    return this.definition;
  }

  getCells(): Array<Cell> {
    return this.cells;
  }

  getNumberOfEmptyCells(): number {
    return this.cells.length - this.definition.reduce((total: number, item: number) => total + item);
  }

  getSolved(): boolean {
    if (!this.solved) {
      this.solved = this.cells.every((cell: Cell) => cell.getStatus() === CellStatus.FULL || cell.getStatus() === CellStatus.EMPTY);
    }
    return this.solved;
  }

  getPossibleSolutions(): Array<LinePossibleSolution> {
    return this.possibleSolutions;
  }

  setPossibleSolutions(possibleSolutions: Array<LinePossibleSolution>): void {
    this.possibleSolutions = possibleSolutions;
  }
}
