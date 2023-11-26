import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Algorithm } from '../../algorithm/core/model/algorithm/algorithm';
import { ALGORITHMS } from '../../algorithm/core/model/algorithm/algorithms';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { GriddlerDataFormComponent } from '../../griddler-data-form/ui/griddler-data-form.component';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    GriddlerDataFormComponent,
    MatCardModule
  ],
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainComponent {
  readonly algorithms: Array<Algorithm> = ALGORITHMS;
}
