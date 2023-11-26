import { LinePossibleSolution } from './line-possible-solution';
import * as _ from 'lodash';

export class PossibleSolutionDictionary {
  private keys: Array<[number, Array<number>]> = [];
  private values: Array<Array<LinePossibleSolution>> = [];

  get(key: [number, Array<number>]): Array<LinePossibleSolution> | null {
    for (let i: number = 0; i < this.keys.length; i++) {
      if (_.isEqual(this.keys[i], key)) {
        return this.values[i];
      }
    }
    return null;
  }

  set(key: [number, Array<number>], value: Array<LinePossibleSolution>): void {
    for (let i: number = 0; i < this.keys.length; i++) {
      if (_.isEqual(this.keys[i], key)) {
        this.values[i] = value;
        return;
      }
    }
    this.keys.push(key);
    this.values.push(value);
  }
}
