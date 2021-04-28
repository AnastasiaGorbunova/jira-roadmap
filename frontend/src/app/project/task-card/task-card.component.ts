import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { Task } from 'src/app/core/models/task.model';

@Component({
  selector: 'app-task-card',
  templateUrl: './task-card.component.html',
  styleUrls: ['./task-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskCardComponent {
  @Input() task: Task;
  @Output() onNavigateToTask = new EventEmitter<string>();
  
  constructor() { }

  navigateToTask(): void {
    this.onNavigateToTask.emit(this.task.id);
  }
}
