import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Griddler } from '../../model/griddler';
import { CommonModule } from '@angular/common';
import { CellStatus } from '../../model/cell-status';

@Component({
  selector: 'app-algorithm01-griddler-view',
  templateUrl: './algorithm01-griddler-view.component.html',
  styleUrls: ['./algorithm01-griddler-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule
  ],
  standalone: true
})
export class Algorithm01GriddlerViewComponent {
  @Input() griddler: Griddler | null = null;

  CellStatus: typeof CellStatus = CellStatus;
}
