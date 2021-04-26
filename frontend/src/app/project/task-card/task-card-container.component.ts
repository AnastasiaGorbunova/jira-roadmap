import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { Task } from 'src/app/core/models/task.model';

@Component({
  selector: 'app-task-card-container',
  templateUrl: './task-card-container.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskCardContainerComponent implements OnInit {
  @Input() task: Task[];

  constructor() { }

  ngOnInit() {
  }

}
