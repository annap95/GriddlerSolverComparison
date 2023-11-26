import { BaseGriddler } from '../../core/model/griddler/base-griddler';
import { Line } from './line';
import { CellStatus } from './cell-status';
import { Cell } from './cell';

export class Griddler extends BaseGriddler {
  private rows: Array<Line> = [];
  private cols: Array<Line> = [];

  constructor(colsDef: Array<Array<number>>,
              rowsDef: Array<Array<number>>) {
    super(colsDef, rowsDef);
    this.initializeCols();
    this.initializeRows();
  }

  getRows(): Array<Line> {
    return this.rows;
  }

  getCols(): Array<Line> {
    return this.cols;
  }

  setCellStatus(rowNumber: number, colNumber: number, cellStatus: CellStatus): void {
    this.rows[rowNumber].getCells()[colNumber].setStatus(cellStatus);
    this.cols[colNumber].getCells()[rowNumber].setStatus(cellStatus);
  }

  isSolved(): boolean {
    return this.rows.every((line: Line) => line.getSolved()) && this.cols.every((line: Line) => line.getSolved());
  }

  getSolution(): Array<Array<Cell>> | null {
    if (!this.isSolved()) {
      return null;
    }
    // TODO sprawdzenie rows = cols
    return this.rows.map((line: Line) => line.getCells());
  }

  private initializeCols(): void {
    for (let i: number = 0; i < this.width; i++) {
      this.cols.push(new Line(this.colsDef[i], this.height));
    }
  }

  private initializeRows(): void {
    for (let i: number = 0; i < this.height; i++) {
      this.rows.push(new Line(this.rowsDef[i], this.width));
    }
  }
}
