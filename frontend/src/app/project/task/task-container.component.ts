import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { ProjectsStoreActions, ProjectsStoreSelectors } from '@app/root-store/features/projects';
import { AppState } from '@app/root-store/state';
import { TasksStoreActions, TasksStoreSelectors } from '@app/root-store/features/tasks';
import { Task } from '@app/core/models/task.model';
import { Project } from '@app/core/models/project.model';
import { RouterStoreActions } from '@app/root-store/features/router';
import { DialogService } from '@app/core/services/dialog.service';
import * as TasksActions from '@app/root-store/features/tasks/actions';
import { deleteConfirmBtnText, deleteItemText, deleteItemTitle, editItemTitle, saveConfirmBtnText } from '@app/shared/dialogs/dialogs.constants';

@Component({
  selector: 'app-task-container',
  templateUrl: './task-container.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskContainerComponent implements OnInit {
  task$: Observable<Task>;
  project$: Observable<Project>;

  constructor(
    private _store$: Store<AppState>,
    private _dialogService: DialogService
  ) { }

  navigateToBoard(): void {
    this._store$.dispatch(RouterStoreActions.navigateProjectsBoard());
  }

  navigateToProject(projectId: string): void {
    this._store$.dispatch(RouterStoreActions.navigateProject({ projectId }));
  }

  openCreateSubTaskModal(projectId: string, taskId: string): void {
    // TODO: create sub task modal
  }

  openDeleteTaskDialog(projectId: string, taskId: string): void {
    this._dialogService.open('ConfirmActionDialogComponent', {
      title: deleteItemTitle('task'),
      text: deleteItemText('task'),
      confirmBtnText: deleteConfirmBtnText,
      handleConfirm: () => {
        this.deleteTask(projectId, taskId);
      }
    });
  }

  openEditTaskDialog(task: Task): void {
    const { name, description, id } = task;

    this._dialogService.open('CreateTaskDialogComponent', {
      title: editItemTitle('task'),
      confirmBtnText: saveConfirmBtnText,
      taskName: name,
      description: description,
      handleConfirm: (updatedData: Project) => {
          this.updateTask({ ...task, ...updatedData });
      }
    });
  }

  ngOnInit() {
    this._store$.dispatch(ProjectsStoreActions.getProject());
    this._store$.dispatch(TasksStoreActions.getTask());

    this.task$ = this._store$.pipe(select(TasksStoreSelectors.selectedTaskSelector));
    this.project$ = this._store$.pipe(select(ProjectsStoreSelectors.selectedProject))
  }

  private deleteTask(projectId: string, taskId: string): void {
    this._store$.dispatch(TasksActions.deleteTask({ projectId, taskId }));
  }

  updateTask(updatedTask: Task): void {
    this._store$.dispatch(TasksActions.updateTask({ updatedTask }));
  }
}
