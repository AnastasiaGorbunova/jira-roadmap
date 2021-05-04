import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

import { ProjectsStoreActions, ProjectsStoreSelectors } from '@app/root-store/features/projects';
import { AppState } from '@app/root-store/state';
import { TasksStoreActions, TasksStoreSelectors } from '@app/root-store/features/tasks';
import { Project } from '@app/core/models/project.model';
import { RouterStoreActions } from '@app/root-store/features/router';
import { DialogService } from '@app/core/services/dialog.service';
import * as TasksActions from '@app/root-store/features/tasks/actions';
import { createConfirmBtnText, createItemTitle, deleteConfirmBtnText, deleteItemText, deleteItemTitle, editItemTitle, saveConfirmBtnText } from '@app/shared/dialogs/dialogs.constants';
import { UsersStoreSelectors } from '@app/root-store/features/users';
import { User } from '@app/core/models/user.model';
import { AuthStoreSelectors } from '@app/root-store/features/auth';
import { Issue, IssueStatus } from '@app/core/models/task.model';

@Component({
  selector: 'app-issue-container',
  templateUrl: './issue-container.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IssueContainerComponent implements OnInit {
  issue$: Observable<Issue>;
  project$: Observable<Project>;
  users$: Observable<User[]>;

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

  openCreateSubTaskModal(projectId: string, issueId: string): void {
    // this._dialogService.open('CreateTaskDialogComponent', {
    //   title: createItemTitle('subtask'),
    //   confirmBtnText: createConfirmBtnText,
    //   handleConfirm: (subtask: any) => {
    //     this.createSubTask({ ...subtask, project_id: projectId, task_id: taskId });
    //   }
    // });
  }

  openDeleteIssueDialog(projectId: string, issueId: string): void {
    this._dialogService.open('ConfirmActionDialogComponent', {
      title: deleteItemTitle('issue'),
      text: deleteItemText('issue'),
      confirmBtnText: deleteConfirmBtnText,
      handleConfirm: () => {
        this.deleteIssue(projectId, issueId);
      }
    });
  }

  updateIssue(updatedTask: any): void {
    // this._store$.dispatch(TasksActions.updateTask({ updatedTask }));
  }

  openEditIssueDialog(task: any): void {
    const { name, description, id } = task;

    // this._dialogService.open('CreateIssueDialogComponent', {
    //   title: editItemTitle('task'),
    //   confirmBtnText: saveConfirmBtnText,
    //   taskName: name,
    //   description: description,
    //   handleConfirm: (updatedData: Project) => {
    //     this.updateTask({ ...task, ...updatedData });
    //   }
    // });
  }

  ngOnInit() {
    this._store$.dispatch(ProjectsStoreActions.getProject());
    this._store$.dispatch(TasksStoreActions.getIssue());

    this.issue$ = this._store$.pipe(select(TasksStoreSelectors.issueSelector));
    this.project$ = this._store$.pipe(select(ProjectsStoreSelectors.selectedProject));
    this.users$ = this._store$.pipe(select(UsersStoreSelectors.usersSelector));
  }

  // private async createSubTask(newSubtask: any): Promise<void> {
  //   const currentUserId = await this._store$.pipe(select(AuthStoreSelectors.currentUserId))
  //     .pipe(take(1))
  //     .toPromise();

  //   const subtask = { 
  //     ...newSubtask, 
  //     creator_id: currentUserId,
  //     status: IssueStatus.ToDo
  //   };

    // this._store$.dispatch(TasksActions.createSubTask({ subtask }));
  // }

  private deleteIssue(projectId: string, issueId: string): void {
    this._store$.dispatch(TasksActions.deleteIssue({ projectId, issueId }));
  }
}
