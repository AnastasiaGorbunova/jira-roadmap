import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { Form, FormControl } from '@angular/forms';

import { Project } from '@app/core/models/project.model';
import { Task, tasksStatuses, taskStatusesSet } from '@app/core/models/task.model';
import { User } from '@app/core/models/user.model';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskComponent implements OnChanges {
  @Input() task: Task;
  @Input() project: Project;
  @Input() users: User[];
  @Output() onNavigateToBoard = new EventEmitter<void>();
  @Output() onNavigateToProject = new EventEmitter<string>();
  @Output() onCreateSubTask = new EventEmitter<{ projectId: string, taskId: string }>();
  @Output() onEditTask = new EventEmitter<Task>();
  @Output() onDeleteTask = new EventEmitter<{ projectId: string, taskId: string }>();
  @Output() onUpdateTaskFields = new EventEmitter<Task>();

  taskStatus: FormControl;
  taskAssignee: FormControl;
  tasksStatuses = tasksStatuses;
  taskStatusesSet = taskStatusesSet;

  constructor() {
    this.taskStatus = new FormControl('');
    this.taskAssignee = new FormControl();
  }

  navigateToBoard(): void {
    this.onNavigateToBoard.emit();
  }

  navigateToProject(): void {
    this.onNavigateToProject.emit(this.project.id);
  }

  createSubTask():void {
    const data = {
      projectId: this.project.id,
      taskId: this.task.id
    }
    this.onCreateSubTask.emit(data);
  }

  editTask(): void {
    this.onEditTask.emit(this.task);
  }

  deleteTask(): void {
    const data = {
      projectId: this.project.id,
      taskId: this.task.id
    };

    this.onDeleteTask.emit(data);
  }

  updateTaskField(fieldName: string, value: string): void {

    const newValue = fieldName === 'assignee_id' && value === 'unassigned' ? null : value;

    const updatedTask = {
      ...this.task,
      [fieldName]: newValue
    } as Task;
    
    this.onUpdateTaskFields.emit(updatedTask);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.task && this.task) {
      this.taskStatus.setValue(this.task.status);
      this.taskAssignee.setValue(this.task.assignee_id || 'unassigned');
    }
  }
}
