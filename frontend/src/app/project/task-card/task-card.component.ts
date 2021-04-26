import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { Task } from 'src/app/core/models/task.model';

@Component({
  selector: 'app-task-card',
  templateUrl: './task-card.component.html',
  styleUrls: ['./task-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskCardComponent implements OnInit {
  @Input() task: Task;
  
  constructor() { }

  ngOnInit() {
  }

}
