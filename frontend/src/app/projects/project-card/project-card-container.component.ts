import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { Store } from '@ngrx/store';

import { Project } from 'src/app/core/models/project.model';
import { DialogService } from 'src/app/core/services/dialog.service';
import { ProjectsStoreActions } from 'src/app/root-store/features/projects';
import { AppState } from 'src/app/root-store/state';
import { deleteConfirmBtnText, deleteProjectText, deleteProjectTitle, editProjectTitle, saveConfirmBtnText } from 'src/app/shared/dialogs/dialogs.constants';

@Component({
  selector: 'app-project-card-container',
  templateUrl: './project-card-container.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectCardContainerComponent {
  @Input() project: Project;

  constructor(
    private _store$: Store<AppState>,
    private _dialogService: DialogService
  ) { }

  private deleteProject(projectId: string): void {
    this._store$.dispatch(ProjectsStoreActions.deleteProject({ projectId }));
  }

  private updateProject(projectId: string, updatedData: Project): void {
     const updatedProject = { ...this.project, ...updatedData };

     this._store$.dispatch(ProjectsStoreActions.updateProject({ projectId, updatedProject }));
  }

  openEditProjectDialog(projectId: string): void {
    this._dialogService.open('CreateProjectDialogComponent', {
      title: editProjectTitle,
      confirmBtnText: saveConfirmBtnText,
      projectName: this.project.name,
      description: this.project.description,
      handleConfirm: (updatedData: Project) => {
          this.updateProject(projectId, updatedData);
      }
    });
  }

  openDeleteProjectDialog(projectId: string): void {
    this._dialogService.open('ConfirmActionDialogComponent', {
      title: deleteProjectTitle,
      text: deleteProjectText,
      confirmBtnText: deleteConfirmBtnText,
      handleConfirm: () => {
          this.deleteProject(projectId);
      }
    });
  }
}
