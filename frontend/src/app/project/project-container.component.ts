import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

import { Project } from '@app/core/models/project.model';
import { Issue, IssueStatus } from '@app/core/models/task.model';
import { DialogService } from '@app/core/services/dialog.service';
import { ProjectsStoreActions, ProjectsStoreSelectors } from '@app/root-store/features/projects';
import { RouterStoreActions } from '@app/root-store/features/router';
import { TasksStoreActions, TasksStoreSelectors } from '@app/root-store/features/tasks';
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

  // TODO: add type and for child components too
  projectIssuesMap$: Observable<any>;

  constructor(
    private _store$: Store<AppState>,
    private _dialogService: DialogService,
    private _projectsService: ProjectsService
  ) { }

  deleteProject(projectId: string): void {
    this._projectsService.openDeleteProjectDialog(projectId);
  }

  openCreateIssueModal(projectId: string): void {
    this._dialogService.open('CreateIssueDialogComponent', {
      title: createItemTitle('issue'),
      confirmBtnText: createConfirmBtnText,
      isProjectLevel: true,
      handleConfirm: (issue: Issue) => {
        this.createIssue(projectId, issue);
      }
    });
  }

  openEditProjectDialog(project: Project): void {
    const { name, description } = project;

    this._dialogService.open('CreateProjectDialogComponent', {
      title: editItemTitle('project'),
      confirmBtnText: saveConfirmBtnText,
      projectName: name,
      description: description,
      handleConfirm: (updatedData: Project) => {
        this.updateProject(project, updatedData);
      }
    });
  }

  navigateToBoard(): void {
    this._store$.dispatch(RouterStoreActions.navigateProjectsBoard());
  }

  ngOnInit() {
    this._store$.dispatch(ProjectsStoreActions.getProject());
    this._store$.dispatch(TasksStoreActions.getIssues());

    this.project$ = this._store$.pipe(select(ProjectsStoreSelectors.selectedProject));
    this.projectIssuesMap$ = this._store$.pipe(select(TasksStoreSelectors.projectIssuesMapSelector));
  }

  private async createIssue(projectId: string, newIssue: Issue): Promise<void> {
    const currentUserId = await this._store$.pipe(select(AuthStoreSelectors.currentUserId))
      .pipe(take(1))
      .toPromise();

    const issue = {
      ...newIssue,
      project_id: projectId,
      creator_id: currentUserId,
      status: IssueStatus.ToDo
    } as Issue;

    this._store$.dispatch(TasksStoreActions.createIssue({ issue }));
  }

  private updateProject(project: Project, updatedData: Project): void {
    const updatedProject = { ...project, ...updatedData };

    this._store$.dispatch(ProjectsStoreActions.updateProject({ projectId: project.id, updatedProject }));
  }
}
