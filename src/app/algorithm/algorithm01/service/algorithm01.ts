import { Griddler } from '../model/griddler';
import { processCombinationsPhase } from './combinations-phase';
import { processIntersectionPhase } from './intersection-phase';

export function processAlgorithm01(griddler: Griddler): void {
  processCombinationsPhase(griddler);
  processIntersectionPhase(griddler);
}
