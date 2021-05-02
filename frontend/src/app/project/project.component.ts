import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';

import { Project } from '@app/core/models/project.model';
import { tasksStatuses, taskStatusesSet, TaskStatusMap } from '@app/core/models/task.model';
import { preventKeyValueOrder, trackById } from '@app/core/utils';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectComponent {
  @Input() project: Project;
  @Input() tasksStatusMap: TaskStatusMap;
  @Output() onCreateTask = new EventEmitter<string>();
  @Output() onEditProject = new EventEmitter<Project>();
  @Output() onDeleteProject = new EventEmitter<string>();
  @Output() onNavigateToBoard = new EventEmitter<void>();

  trackById = trackById;
  preventKeyValueOrder = preventKeyValueOrder;
  tasksStatuses = tasksStatuses;
  taskStatusesSet = taskStatusesSet;

  constructor() { }

  createTask():void {
    this.onCreateTask.emit(this.project.id);
  }

  editProject(): void {
    this.onEditProject.emit(this.project);
  }

  deleteProject(): void {
    this.onDeleteProject.emit(this.project.id);
  }

  navigateToBoard(): void {
    this.onNavigateToBoard.emit();
  }
}
