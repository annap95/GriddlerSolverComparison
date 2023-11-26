import { Griddler } from '../model/griddler';
import { Line } from '../model/line';
import { PossibleSolutionDictionary } from '../model/possible-solution-dictionary';
import { LinePossibleSolution } from '../model/line-possible-solution';
import { CellStatus } from '../model/cell-status';
import { Cell } from '../model/cell';
import * as _ from 'lodash';

export function processCombinationsPhase(griddler: Griddler): void {
  const dictionary: PossibleSolutionDictionary = new PossibleSolutionDictionary();

  griddler.getCols().forEach((column: Line): void => {
    let linePossibleSolutions: Array<LinePossibleSolution> | null = dictionary.get([griddler.getHeight(), column.getDefinition()]);
    if (linePossibleSolutions === null) {
      linePossibleSolutions = generatePossibleSolutionsForLine(column);
      dictionary.set([griddler.getHeight(), column.getDefinition()], linePossibleSolutions);
    }
    column.setPossibleSolutions(_.cloneDeep(linePossibleSolutions));
  });

  griddler.getRows().forEach((row: Line): void => {
    let linePossibleSolutions: Array<LinePossibleSolution> | null = dictionary.get([griddler.getWidth(), row.getDefinition()]);
    if (linePossibleSolutions === null) {
      linePossibleSolutions = generatePossibleSolutionsForLine(row);
      dictionary.set([griddler.getWidth(), row.getDefinition()], linePossibleSolutions);
    }
    row.setPossibleSolutions(_.cloneDeep(linePossibleSolutions));
  });
}

function generatePossibleSolutionsForLine(line: Line): Array<LinePossibleSolution> {
  return generatePossibleSolutions(line.getDefinition(), line.getNumberOfEmptyCells(), true);
}

function generatePossibleSolutions(fullBlocks: Array<number>, emptyCellsNumber: number, isFirst: boolean): Array<LinePossibleSolution> {
  // jeżeli definicja jest pustą listą, to zwracam jedną pustą kombinację
  if (fullBlocks.length === 0) {
    return [new LinePossibleSolution(Array(emptyCellsNumber).fill(null).map(() => new Cell(CellStatus.EMPTY)))];
  }
  const result: Array<LinePossibleSolution> = [];
  for (let x: number = isFirst ? 0 : 1; x <= emptyCellsNumber - (fullBlocks.length - 1); x++) {
    const tail: Array<LinePossibleSolution> = generatePossibleSolutions(fullBlocks.slice(1, fullBlocks.length), emptyCellsNumber - x, false);
    for (let y: number = 0; y < tail.length; y++) {
      const e: Array<Cell> = Array(x).fill(null).map(() => new Cell(CellStatus.EMPTY));
      const f: Array<Cell> = Array(fullBlocks[0]).fill(null).map(() => new Cell(CellStatus.FULL));
      result.push(new LinePossibleSolution([...e, ...f, ...(tail[y].getCells())]));
    }
  }
  return result;
}
