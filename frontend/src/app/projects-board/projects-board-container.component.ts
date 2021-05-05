import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable, pipe } from 'rxjs';
import { take } from 'rxjs/operators';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

import { Project } from '@app/core/models/project.model';
import { DialogService } from '@app/core/services/dialog.service';
import { AuthStoreSelectors } from '@app/root-store/features/auth';
import { ProjectsStoreActions, ProjectsStoreSelectors } from '@app/root-store/features/projects';
import { AppState } from '@app/root-store/state';
import { createConfirmBtnText, createItemTitle } from '@app/shared/dialogs/dialogs.constants';
import { UsersStoreActions, UsersStoreSelectors } from '@app/root-store/features/users';
import { User } from '@app/core/models/user.model';

@UntilDestroy()
@Component({
  selector: 'app-projects-board-container',
  templateUrl: './projects-board-container.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectsBoardContainerComponent implements OnInit {
  projects$: Observable<Project[]>;
  isCurrentUserAdmin$: Observable<boolean>;

  constructor(
    private _store$: Store<AppState>,
    private _dialogService: DialogService
  ) { }

  async createProject(newProject: Project): Promise<void> {
    const currentUserId = await this._store$.pipe(select(AuthStoreSelectors.currentUserIdSelector))
      .pipe(take(1))
      .toPromise();
    newProject.creator_id = currentUserId;
    
    this._store$.dispatch(ProjectsStoreActions.createProject({ newProject }));
  }

  openCreateProjectDialog(): void {
    this._dialogService.open('CreateProjectDialogComponent', {
      title: createItemTitle('project'),
      confirmBtnText: createConfirmBtnText,
      handleConfirm: (newProject: Project) => {
        this.createProject(newProject);
      }
    });
  }

  ngOnInit() {
    this._store$.dispatch(ProjectsStoreActions.getProjects());

    this.projects$ = this._store$.pipe(select(ProjectsStoreSelectors.selectProjects));
    this.isCurrentUserAdmin$ = this._store$.pipe(select(AuthStoreSelectors.isCurrentUserAdminSelector));
  }
}
