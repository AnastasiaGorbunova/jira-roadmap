import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Project } from '../core/models/project.model';
import { preventKeyValueOrder, trackById } from '../core/utils';

@Component({
  selector: 'app-projects-board',
  templateUrl: './projects-board.component.html',
  styleUrls: ['./projects-board.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectsBoardComponent implements OnInit {
  @Input() projects: Project[];
  @Output() onCreateProject = new EventEmitter<void>();

  preventKeyValueOrder = preventKeyValueOrder;
  trackById = trackById;
  // TODO: add track by id

  createProject(): void {
    console.log('emit event');
    
    this.onCreateProject.emit();
  }

  ngOnInit() {
  }
}
