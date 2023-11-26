import { CellStatus } from './cell-status';

export class Cell {
  private status: CellStatus;

  constructor(status: CellStatus = CellStatus.UNDEFINED) {
    this.status = status;
  }

  getStatus(): CellStatus {
    return this.status;
  }

  setStatus(status: CellStatus): void {
    switch (this.status) {
      case CellStatus.FULL:
        this.validateStatus(status, [CellStatus.FULL]);
        break;
      case CellStatus.EMPTY:
        this.validateStatus(status, [CellStatus.EMPTY]);
        break;
      case CellStatus.TEMP_FULL:
        this.validateStatus(status, [CellStatus.FULL, CellStatus.TEMP_FULL, CellStatus.CONFLICT]);
        this.status = status;
        break;
      case CellStatus.TEMP_EMPTY:
        this.validateStatus(status, [CellStatus.EMPTY, CellStatus.TEMP_EMPTY, CellStatus.CONFLICT]);
        this.status = status;
        break;
      case CellStatus.CONFLICT:
        this.validateStatus(status, [CellStatus.UNDEFINED]);
        this.status = status;
        break;
      case CellStatus.UNDEFINED:
        this.status = status;
        break;
      default:
        throw new Error('Nieznany status!');
    }
  }

  private validateStatus(nextStatus: CellStatus, correctStatuses: Array<CellStatus>): void {
    if (!correctStatuses.includes(nextStatus)) {
      throw new Error('Nieoczekiwana zmiana stanu komórki!');
    }
  }
}
