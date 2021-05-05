import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { Project } from '@app/core/models/project.model';
import { preventKeyValueOrder, trackById } from '@app/core/utils';

@Component({
  selector: 'app-projects-board',
  templateUrl: './projects-board.component.html',
  styleUrls: ['./projects-board.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectsBoardComponent {
  @Input() projects: Project[];
  @Input() isCurrentUserAdmin: boolean;
  @Output() onCreateProject = new EventEmitter<void>();

  preventKeyValueOrder = preventKeyValueOrder;
  trackById = trackById;

  createProject(): void {
    this.onCreateProject.emit();
  }
}
