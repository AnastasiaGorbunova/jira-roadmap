import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';

import { Project } from '../core/models/project.model';
import { Task, tasksStatuses } from '../core/models/task.model';
import { preventKeyValueOrder, trackById } from '../core/utils';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectComponent implements OnInit {
  @Input() project: Project;

  // TODO: add to model
  @Input() tasksStatusMap: { [status: string]: Task[] };
  @Output() onCreateTask = new EventEmitter<string>();
  @Output() onEditProject = new EventEmitter<Project>();
  @Output() onNavigateToBoard = new EventEmitter<void>();

  trackById = trackById;
  preventKeyValueOrder = preventKeyValueOrder;
  tasksStatuses = tasksStatuses;

  constructor() { }

  createTask():void {
    console.log('emit');
    
    this.onCreateTask.emit(this.project.id);
  }

  ngOnInit() {
  }

  editProject(event: Event): void {
    event.stopPropagation();

    this.onEditProject.emit(this.project);
  }

  navigateToBoard(): void {
    this.onNavigateToBoard.emit();
  }

}
