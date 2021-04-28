import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';

import { Project } from '@app/core/models/project.model';
import { Task } from '@app/core/models/task.model';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskComponent {
  @Input() task: Task;
  @Input() project: Project;
  @Output() onNavigateToBoard = new EventEmitter<void>();
  @Output() onNavigateToProject = new EventEmitter<string>();
  @Output() onCreateSubTask = new EventEmitter<string>();
  @Output() onEditTask = new EventEmitter<Task>();
  @Output() onDeleteTask = new EventEmitter<string>();

  constructor() { }

  navigateToBoard(): void {
    this.onNavigateToBoard.emit();
  }

  navigateToProject(): void {
    this.onNavigateToProject.emit(this.project.id);
  }

  createSubTask():void {
    this.onCreateSubTask.emit(this.task.id);
  }

  editTask(): void {
    this.onEditTask.emit(this.task);
  }

  deleteTask(): void {
    this.onDeleteTask.emit(this.task.id);
  }
}
