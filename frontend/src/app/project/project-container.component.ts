import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { Project } from '../core/models/project.model';
import { Task } from '../core/models/task.model';
import { DialogService } from '../core/services/dialog.service';
import { ProjectsStoreActions, ProjectsStoreSelectors } from '../root-store/features/projects';
import { TasksStoreActions, TasksStoreSelectors } from '../root-store/features/tasks';
import { AppState } from '../root-store/state';
import { createConfirmBtnText, createItemTitle } from '../shared/dialogs/dialogs.constants';

@Component({
  selector: 'app-project-container',
  templateUrl: './project-container.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectContainerComponent implements OnInit {
  project$: Observable<Project>;
  tasks$: Observable<Task[]>;

  constructor(
    private _store$: Store<AppState>,
    private _dialogService: DialogService
  ) { }

  createTask(projectId: string, task: Task): void {
    console.log('dispatch', projectId, task);
    
    this._store$.dispatch(TasksStoreActions.createTask({ projectId, task }))
  }

  openCreateTaskModal(projectId: string): void {
    this._dialogService.open('CreateTaskDialogComponent', {
      title: createItemTitle('task'),
      confirmBtnText: createConfirmBtnText,
      handleConfirm: (task: Task) => {
        this.createTask(projectId, task);
      }
    });
  }

  ngOnInit() {
    this._store$.dispatch(ProjectsStoreActions.getProject());
    this._store$.dispatch(TasksStoreActions.getTasks());

    // TODO: select project
    this.project$ = this._store$.pipe(select(ProjectsStoreSelectors.selectedProject));
    this.tasks$ = this._store$.pipe(select(TasksStoreSelectors.currentProjectTasksSelector));
  }

}
