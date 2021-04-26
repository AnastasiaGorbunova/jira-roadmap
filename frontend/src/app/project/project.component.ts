import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';

import { Project } from '../core/models/project.model';
import { Task } from '../core/models/task.model';
import { trackById } from '../core/utils';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectComponent implements OnInit {
  @Input() project: Project;
  @Input() tasks: Task[];
  @Output() onCreateTask = new EventEmitter<string>();

  trackById = trackById;

  constructor() { }

  createTask():void {
    console.log('emit');
    
    this.onCreateTask.emit(this.project.id);
  }

  ngOnInit() {
  }

}
