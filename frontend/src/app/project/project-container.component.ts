import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

import { Project } from '@app/core/models/project.model';
import { SubTaskStatusMap, Task, TaskStatus, TaskStatusMap } from '@app/core/models/task.model';
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
  // tasksStatusMap$: Observable<TaskStatusMap>;

  // TODO: add normal type and rename
  tasksIssueMap$: Observable<{ tasksWithSubtasks: Task[], otherIssues: { [status: string]: Task[] } }>;
  subtasksStatusMap$: Observable<SubTaskStatusMap>;

  constructor(
    private _store$: Store<AppState>,
    private _dialogService: DialogService,
    private _projectsService: ProjectsService
  ) { }

  deleteProject(projectId: string): void {
    this._projectsService.openDeleteProjectDialog(projectId);
  }

  // TODO: add common modal for creation (project/task/subtask)
  openCreateTaskModal(projectId: string): void {
    this._dialogService.open('CreateTaskDialogComponent', {
      title: createItemTitle('task'),
      confirmBtnText: createConfirmBtnText,
      handleConfirm: (task: Task) => {
        this.createTask(projectId, task);
      }
    });
  }

  openEditProjectDialog(project: Project): void {
    const { name, description, id } = project;

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
    this._store$.dispatch(TasksStoreActions.getTasks());
    this._store$.dispatch(TasksStoreActions.getSubTasks());

    this.project$ = this._store$.pipe(select(ProjectsStoreSelectors.selectedProject));
    // this.tasksStatusMap$ = this._store$.pipe(select(TasksStoreSelectors.tasksStatusMapSelector));
    this.tasksIssueMap$ = this._store$.pipe(select(TasksStoreSelectors.tasksIssueMapSelector));
    this.subtasksStatusMap$ = this._store$.pipe(select(TasksStoreSelectors.subtasksStatusMapSelector));
  }

  private async createTask(projectId: string, newTask: Task): Promise<void> {
    const currentUserId = await this._store$.pipe(select(AuthStoreSelectors.currentUserId))
      .pipe(take(1))
      .toPromise();

    const task = {
      ...newTask,
      project_id: projectId,
      creator_id: currentUserId,
      status: TaskStatus.ToDo
    }

    this._store$.dispatch(TasksStoreActions.createTask({ task }))
  }

  private updateProject(project: Project, updatedData: Project): void {
    const updatedProject = { ...project, ...updatedData };

    this._store$.dispatch(ProjectsStoreActions.updateProject({ projectId: project.id, updatedProject }));
  }
}
