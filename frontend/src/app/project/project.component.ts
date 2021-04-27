import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';

import { Project } from '@app/core/models/project.model';
import { Task, tasksStatuses, taskStatusesSet } from '@app/core/models/task.model';
import { preventKeyValueOrder, trackById } from '@app/core/utils';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectComponent {
  @Input() project: Project;

  // TODO: add to model
  @Input() tasksStatusMap: { [status: string]: Task[] };
  @Output() onCreateTask = new EventEmitter<string>();
  @Output() onEditProject = new EventEmitter<Project>();
  @Output() onNavigateToBoard = new EventEmitter<void>();

  trackById = trackById;
  preventKeyValueOrder = preventKeyValueOrder;
  tasksStatuses = tasksStatuses;
  taskStatusesSet = taskStatusesSet;

  constructor() { }

  createTask():void {
    console.log('emit');
    
    this.onCreateTask.emit(this.project.id);
  }

  editProject(): void {
    this.onEditProject.emit(this.project);
  }

  navigateToBoard(): void {
    this.onNavigateToBoard.emit();
  }
}
