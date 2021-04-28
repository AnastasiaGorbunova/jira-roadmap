import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { ProjectsStoreActions, ProjectsStoreSelectors } from '@app/root-store/features/projects';
import { AppState } from '@app/root-store/state';
import { TasksStoreActions, TasksStoreSelectors } from '@app/root-store/features/tasks';
import { Task } from '@app/core/models/task.model';
import { Project } from '@app/core/models/project.model';
import { RouterStoreActions } from '@app/root-store/features/router';

@Component({
  selector: 'app-task-container',
  templateUrl: './task-container.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskContainerComponent implements OnInit {
  task$: Observable<Task>;
  project$: Observable<Project>;

  constructor(
    private _store$: Store<AppState>
  ) { }

  navigateToBoard(): void {
    this._store$.dispatch(RouterStoreActions.navigateProjectsBoard());
  }

  navigateToProject(projectId: string): void {
    this._store$.dispatch(RouterStoreActions.navigateProject({ projectId }));
  }

  ngOnInit() {
    this._store$.dispatch(ProjectsStoreActions.getProject());
    this._store$.dispatch(TasksStoreActions.getTask());
    
    this.task$ = this._store$.pipe(select(TasksStoreSelectors.selectedTaskSelector));
    this.project$ = this._store$.pipe(select(ProjectsStoreSelectors.selectedProject))
  }
}
