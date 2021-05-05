import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { Store } from '@ngrx/store';

import { Project } from '@app/core/models/project.model';
import { ProjectsStoreActions } from '@app/root-store/features/projects';
import { RouterStoreActions } from '@app/root-store/features/router';
import { AppState } from '@app/root-store/state';
import { deleteConfirmBtnText, deleteItemText, deleteItemTitle } from '@app/shared/dialogs/dialogs.constants';
import { ProjectsService } from '@app/core/services/projects.service';

@Component({
  selector: 'app-project-card-container',
  templateUrl: './project-card-container.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectCardContainerComponent {
  @Input() project: Project;

  constructor(
    private _store$: Store<AppState>,
    private _projectsService: ProjectsService
  ) { }

  navigateToProject(projectId: string): void {
    this._store$.dispatch(RouterStoreActions.navigateProject({ projectId }));
  }  

  openDeleteProjectDialog(project: Project): void {
    this._projectsService.openDeleteProjectDialog(project);
  }
}
