import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { Project } from '@app/core/models/project.model';
import { Issue, IssuesMap, IssueStatus } from '@app/core/models/issue.model';
import { DialogService } from '@app/core/services/dialog.service';
import { ProjectsStoreActions, ProjectsStoreSelectors } from '@app/root-store/features/projects';
import { RouterStoreActions } from '@app/root-store/features/router';
import { IssuesStoreActions, IssuesStoreSelectors } from '@app/root-store/features/issues';
import { AppState } from '@app/root-store/state';
import { createConfirmBtnText, createItemTitle, editItemTitle, saveConfirmBtnText } from '@app/shared/dialogs/dialogs.constants';
import { ProjectsService } from '@app/core/services/projects.service';
import { AuthStoreSelectors } from '@app/root-store/features/auth';

@Component({
  selector: 'app-project-container',
  templateUrl: './project-container.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectContainerComponent implements OnInit {
  project$: Observable<Project>;
  isUserAdmin$: Observable<boolean>;
  isUserLeader$: Observable<boolean>;
  projectIssuesMap$: Observable<IssuesMap>;

  constructor(
    private _store$: Store<AppState>,
    private _dialogService: DialogService,
    private _projectsService: ProjectsService
  ) { }

  deleteProject(project: Project): void {
    this._projectsService.openDeleteProjectDialog(project);
  }

  openCreateIssueModal(projectId: string): void {
    this._dialogService.open('IssueDialogComponent', {
      title: createItemTitle('issue'),
      confirmBtnText: createConfirmBtnText,
      handleConfirm: (issue: Issue) => {
        this.createIssue(projectId, issue);
      }
    });
  }

  openEditProjectDialog(project: Project): void {

    this._dialogService.open('ProjectDialogComponent', {
      title: editItemTitle('project'),
      confirmBtnText: saveConfirmBtnText,
      project,
      handleConfirm: (updatedData: Project) => {
        this.updateProject(project, updatedData);
      }
    });
  }

  navigateToBoard(): void {
    this._store$.dispatch(RouterStoreActions.navigateProjectsBoard());
  }

  navigateToIssue(issueId: string): void {
    this._store$.dispatch(RouterStoreActions.navigateIssue({ issueId }));
  }

  ngOnInit() {
    this._store$.dispatch(ProjectsStoreActions.getProject());
    this._store$.dispatch(IssuesStoreActions.getIssues());

    this.project$ = this._store$.pipe(select(ProjectsStoreSelectors.selectedProject));
    this.projectIssuesMap$ = this._store$.pipe(select(IssuesStoreSelectors.issuesMapSelector));
    this.isUserAdmin$ = this._store$.pipe(select(AuthStoreSelectors.isCurrentUserAdminSelector));
    this.isUserLeader$ = this._store$.pipe(select(AuthStoreSelectors.isCurrentUserLeaderSelector));
  }

  private async createIssue(projectId: string, newIssue: Issue): Promise<void> {
    const issue = {
      ...newIssue,
      project_id: projectId,
      status: IssueStatus.ToDo
    } as Issue;

    this._store$.dispatch(IssuesStoreActions.createIssue({ issue }));
  }

  private updateProject(project: Project, updatedProject: Project): void {
    this._store$.dispatch(ProjectsStoreActions.updateProject({ projectId: project.id, updatedProject }));
  }
}
