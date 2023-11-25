import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { TextFieldModule } from '@angular/cdk/text-field';
import { Algorithm } from '../../algorithm/core/model/algorithm';
import { ALGORITHMS } from '../../algorithm/core/model/algorithms';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    MatSelectModule,
    MatInputModule,
    TextFieldModule,
    ReactiveFormsModule
  ],
  selector: 'app-griddler-data-form',
  templateUrl: './griddler-data-form.component.html',
  styleUrls: ['./griddler-data-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GriddlerDataFormComponent {
  readonly formGroup: FormGroup;

  readonly algorithms: Array<Algorithm> = ALGORITHMS;

  constructor(private fb: FormBuilder) {
    this.formGroup = fb.group({

    });
  }

}
