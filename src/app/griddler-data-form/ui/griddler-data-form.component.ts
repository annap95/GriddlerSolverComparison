import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { TextFieldModule } from '@angular/cdk/text-field';
import { Algorithm } from '../../algorithm/core/model/algorithm/algorithm';
import { ALGORITHMS } from '../../algorithm/core/model/algorithm/algorithms';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Griddler } from '../../algorithm/algorithm01/model/griddler';
import { Cell } from '../../algorithm/algorithm01/model/cell';
import { CellStatus } from '../../algorithm/algorithm01/model/cell-status';
import { processAlgorithm01 } from '../../algorithm/algorithm01/service/algorithm01';
import { Algorithm01GriddlerViewComponent } from '../../algorithm/algorithm01/ui/algorithm01-griddler-view/algorithm01-griddler-view.component';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    MatSelectModule,
    MatInputModule,
    TextFieldModule,
    ReactiveFormsModule,
    Algorithm01GriddlerViewComponent
  ],
  selector: 'app-griddler-data-form',
  templateUrl: './griddler-data-form.component.html',
  styleUrls: ['./griddler-data-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GriddlerDataFormComponent {
  readonly formGroup: FormGroup;

  readonly algorithms: Array<Algorithm> = ALGORITHMS;

  griddler: Griddler | null = null;

  constructor(private fb: FormBuilder) {
    this.formGroup = fb.group({

    });
  }

  solve(): void {
    const colsDef: Array<Array<number>> = [
      [2,1],
      [2,2,2],
      [7,3],
      [7,3,1],
      [6,3,2],
      [7,2],
      [7],
      [2],
      [2,11],
      [11],
      [11],
      [4],
      [11],
      [11],
      [11]
    ];
    const rowsDef: Array<Array<number>> = [
      [4,4],
      [9],
      [5],
      [5],
      [5,7],
      [5,7],
      [5,7],
      [7],
      [3,3],
      [5,3,3],
      [5,3,3],
      [3,3,3],
      [3,3],
      [1,1,3,3],
      [2,2,3,3]
    ];
    this.griddler = new Griddler(colsDef, rowsDef);
    processAlgorithm01(this.griddler);
    console.log('GRIDDLER', this.griddler);
    let result: string = '';
    this.griddler.getSolution()?.forEach((row: Array<Cell>) => {
      result += row.map((cell: Cell) => cell.getStatus() === CellStatus.FULL ? 'o' : ' ').join('');
      result += '\n'
    });
    console.log(result);

  }
}
