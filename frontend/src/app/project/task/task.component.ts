import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { Form, FormControl } from '@angular/forms';

import { Project } from '@app/core/models/project.model';
import { Task, tasksStatuses, taskStatusesSet } from '@app/core/models/task.model';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskComponent implements OnChanges {
  @Input() task: Task;
  @Input() project: Project;
  @Output() onNavigateToBoard = new EventEmitter<void>();
  @Output() onNavigateToProject = new EventEmitter<string>();
  @Output() onCreateSubTask = new EventEmitter<{ projectId: string, taskId: string }>();
  @Output() onEditTask = new EventEmitter<Task>();
  @Output() onDeleteTask = new EventEmitter<{ projectId: string, taskId: string }>();
  @Output() onUpdateTaskStatus = new EventEmitter<Task>();

  taskStatus: FormControl;
  tasksStatuses = tasksStatuses;
  taskStatusesSet = taskStatusesSet;

  constructor() {
    this.taskStatus = new FormControl('');
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

  updateTaskStatus(value: string): void {
    const updatedTask = {
      ...this.task,
      status: value
    } as Task;
    
    this.onUpdateTaskStatus.emit(updatedTask);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.task && this.task) {
      this.taskStatus.setValue(this.task.status);
    }
  }

  compareObjects(o1: any, o2: any): boolean {
    console.log(o1, o2);
    
    return o1.name === o2.name && o1.id === o2.id;
  }
}
