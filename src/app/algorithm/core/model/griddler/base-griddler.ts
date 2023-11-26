export abstract class BaseGriddler {
  protected readonly height: number;
  protected readonly width: number;

  protected readonly colsDef: Array<Array<number>>;
  protected readonly rowsDef: Array<Array<number>>;

  protected constructor(colsDef: Array<Array<number>>,
                        rowsDef: Array<Array<number>>) {
    this.height = rowsDef.length;
    this.width = colsDef.length;
    this.colsDef = colsDef;
    this.rowsDef = rowsDef;
  }

  getHeight(): number {
    return this.height;
  }

  getWidth(): number {
    return this.width;
  }
}
