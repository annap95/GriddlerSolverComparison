import { Cell } from '../model/cell';
import { CellStatus } from '../model/cell-status';
import { Line } from '../model/line';
import { LinePossibleSolution } from '../model/line-possible-solution';
import { Griddler } from '../model/griddler';
import { LineType } from '../model/line-type';

export function processIntersectionPhase(griddler: Griddler): void {
  processFirstIntersectionPhase(griddler);
  processSecondIntersectionPhase(griddler);
}

function processFirstIntersectionPhase(griddler: Griddler): void {
  calculateCertainCellsForGriddler(griddler);
}

function processSecondIntersectionPhase(griddler: Griddler): void {
  while (!griddler.isSolved()) {
    removeNotMatchingSolutions(griddler);
    calculateCertainCellsForGriddler(griddler);
  }
}

function removeNotMatchingSolutions(griddler: Griddler): void {
  griddler.getRows().forEach((row: Line) => removeNotMatchingLineSolutions(row));
  griddler.getCols().forEach((col: Line) => removeNotMatchingLineSolutions(col));
}

function removeNotMatchingLineSolutions(line: Line): void {
  for (let i: number = 0; i < line.getCells().length; i++) {
    const cell: Cell = line.getCells()[i];
    if (cell.getStatus() === CellStatus.FULL) {
      const possibleSolutions: Array<LinePossibleSolution> = line.getPossibleSolutions()
        .filter((possibleSolution: LinePossibleSolution): boolean => possibleSolution.getCells()[i].getStatus() === CellStatus.FULL);
      line.setPossibleSolutions(possibleSolutions);
    } else if (cell.getStatus() === CellStatus.EMPTY) {
      const possibleSolutions: Array<LinePossibleSolution> = line.getPossibleSolutions()
        .filter((possibleSolution: LinePossibleSolution): boolean => possibleSolution.getCells()[i].getStatus() === CellStatus.EMPTY);
      line.setPossibleSolutions(possibleSolutions);
    }
  }
}

function calculateCertainCellsForGriddler(griddler: Griddler): void {
  for (let i: number = 0; i < griddler.getRows().length; i++) {
    calculateCertainCellsInLine(griddler, LineType.ROW, i);
  }
  for (let i: number = 0; i < griddler.getCols().length; i++) {
    calculateCertainCellsInLine(griddler, LineType.COL, i);
  }
}

function calculateCertainCellsInLine(griddler: Griddler, lineType: LineType, rowOrColIndex: number): void {
  const line: Line = lineType === LineType.ROW ? griddler.getRows()[rowOrColIndex] : griddler.getCols()[rowOrColIndex];
  mergeLinePossibilitiesToSolution(line);
  for (let i: number = 0; i < line.getCells().length; i++) {
    const rowNumber: number = lineType === LineType.ROW ? rowOrColIndex : i;
    const colNumber: number = lineType === LineType.COL ? rowOrColIndex : i;
    const cellStatus: CellStatus = getFirstPhaseFinalCellStatus(line.getCells()[i]);
    griddler.setCellStatus(rowNumber, colNumber, cellStatus);
  }
}

function mergeLinePossibilitiesToSolution(line: Line): void {
  line.getPossibleSolutions().forEach((linePossibleSolution: LinePossibleSolution): void => {
    for (let i: number = 0; i < linePossibleSolution.getCells().length; i++) {
      const currentCell: Cell = line.getCells()[i];
      const possibleCell: Cell = linePossibleSolution.getCells()[i];
      mergeCurrentCellWithPossible(currentCell, possibleCell);
    }
  })
}

function mergeCurrentCellWithPossible(currentCell: Cell, possibleCell: Cell): void {
  if (possibleCell.getStatus() === CellStatus.FULL) {
    if (currentCell.getStatus() === CellStatus.TEMP_EMPTY) {
      currentCell.setStatus(CellStatus.CONFLICT);
    } else if (currentCell.getStatus() === CellStatus.UNDEFINED) {
      currentCell.setStatus(CellStatus.TEMP_FULL);
    }
  } else if (possibleCell.getStatus() === CellStatus.EMPTY) {
    if (currentCell.getStatus() === CellStatus.TEMP_FULL) {
      currentCell.setStatus(CellStatus.CONFLICT);
    } else if (currentCell.getStatus() === CellStatus.UNDEFINED) {
      currentCell.setStatus(CellStatus.TEMP_EMPTY);
    }
  }
}

function getFirstPhaseFinalCellStatus(cell: Cell): CellStatus {
  switch (cell.getStatus()) {
    case CellStatus.FULL:
      return CellStatus.FULL;
    case CellStatus.EMPTY:
      return CellStatus.EMPTY;
    case CellStatus.TEMP_FULL:
      return CellStatus.FULL;
    case CellStatus.TEMP_EMPTY:
      return CellStatus.EMPTY;
    case CellStatus.CONFLICT:
      return CellStatus.UNDEFINED;
    case CellStatus.UNDEFINED:
      return CellStatus.UNDEFINED;
    default:
      throw new Error('Nieznany status!');
  }
}
