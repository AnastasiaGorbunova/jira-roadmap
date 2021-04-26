import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { Project } from '../core/models/project.model';
import { Task, TaskStatus } from '../core/models/task.model';
import { DialogService } from '../core/services/dialog.service';
import { ProjectsStoreActions, ProjectsStoreSelectors } from '../root-store/features/projects';
import { RouterStoreActions } from '../root-store/features/router';
import { TasksStoreActions, TasksStoreSelectors } from '../root-store/features/tasks';
import { AppState } from '../root-store/state';
import { createConfirmBtnText, createItemTitle, editItemTitle, saveConfirmBtnText } from '../shared/dialogs/dialogs.constants';

@Component({
  selector: 'app-project-container',
  templateUrl: './project-container.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectContainerComponent implements OnInit {
  project$: Observable<Project>;
  tasksStatusMap$: Observable<{ [status: string]: Task[] }>;

  constructor(
    private _store$: Store<AppState>,
    private _dialogService: DialogService
  ) { }

  createTask(projectId: string, task: Task): void {
    console.log('dispatch', projectId, task);
    task.status = TaskStatus.ToDo;
    
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

    this.project$ = this._store$.pipe(select(ProjectsStoreSelectors.selectedProject));
    this.tasksStatusMap$ = this._store$.pipe(select(TasksStoreSelectors.tasksStatusMapSelector));
  }

  private updateProject(project: Project, updatedData: Project): void {
    const updatedProject = { ...project, ...updatedData };

    this._store$.dispatch(ProjectsStoreActions.updateProject({ projectId: project.id, updatedProject }));
 }
}
