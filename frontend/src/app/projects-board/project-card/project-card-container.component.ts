import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { Store } from '@ngrx/store';

import { Project } from '@app/core/models/project.model';
import { DialogService } from '@app/core/services/dialog.service';
import { ProjectsStoreActions } from '@app/root-store/features/projects';
import { RouterStoreActions } from '@app/root-store/features/router';
import { AppState } from '@app/root-store/state';
import { deleteConfirmBtnText, deleteItemText, deleteItemTitle } from '@app/shared/dialogs/dialogs.constants';

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

  navigateToProject(projectId: string): void {
    this._store$.dispatch(RouterStoreActions.navigateProject({ projectId }));
  }  

  openDeleteProjectDialog(projectId: string): void {
    this._dialogService.open('ConfirmActionDialogComponent', {
      title: deleteItemTitle('project'),
      text: deleteItemText('project'),
      confirmBtnText: deleteConfirmBtnText,
      handleConfirm: () => {
          this.deleteProject(projectId);
      }
    });
  }

  private deleteProject(projectId: string): void {
    this._store$.dispatch(ProjectsStoreActions.deleteProject({ projectId }));
  }
}
