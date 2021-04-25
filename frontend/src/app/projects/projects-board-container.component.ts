import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

import { Project } from '../core/models/project.model';
import { DialogService } from '../core/services/dialog.service';
import { AuthStoreSelectors } from '../root-store/features/auth';
import { ProjectsStoreActions, ProjectsStoreSelectors } from '../root-store/features/projects';
import { AppState } from '../root-store/state';
import { createConfirmBtnText, createProjectTitle } from '../shared/dialogs/dialogs.constants';

@Component({
  selector: 'app-projects-board-container',
  templateUrl: './projects-board-container.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectsBoardContainerComponent implements OnInit {
  projects$: Observable<Project[]>;

  constructor(
    private _store$: Store<AppState>,
    private _dialogService: DialogService
  ) {}

  async createProject(newProject: Project): Promise<void> {
    const currentUserId = await this._store$.pipe(select(AuthStoreSelectors.currentUserId))
      .pipe(take(1))
      .toPromise();

    newProject.creator_id = currentUserId;
     
    this._store$.dispatch(ProjectsStoreActions.createProject({ newProject }));
  }

  openCreateProjectDialog(): void {
    this._dialogService.open('CreateProjectDialogComponent', {
      title: createProjectTitle,
      confirmBtnText: createConfirmBtnText,
      handleConfirm: (newProject: Project) => {
          this.createProject(newProject);
      }
    });
  }

  ngOnInit() {
    this._store$.dispatch(ProjectsStoreActions.getProjects());

    this.projects$ = this._store$.pipe(select(ProjectsStoreSelectors.selectProjects));
  }
}
