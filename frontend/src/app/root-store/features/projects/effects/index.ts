import { Injectable, OnDestroy } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { from, of } from 'rxjs';
import {
  catchError,
  filter,
  map,
  mergeMap,
  switchMap,
  take,
} from 'rxjs/operators';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

import * as ProjectsActions from '@app/root-store/features/projects/actions';
import { ProjectsService } from '@app/core/services/projects.service';
import { AppState } from '@app/root-store/state';
import { RouterStoreSelectors } from '@app/root-store/features/router';

@UntilDestroy()
@Injectable()
export class ProjectsEffects implements OnDestroy {
  private hasProjectsLoaded: boolean = false;
  private hasProjectLoadedMap = {};

  public getProjects$ = createEffect(() =>
    this._actions$.pipe(
      ofType(ProjectsActions.getProjects),
      mergeMap(() => {
        return this._projectsService.getProjects().pipe(
          untilDestroyed(this),
          map((projects) => {
            this.hasProjectsLoaded = true;
            return ProjectsActions.getProjectsSuccess({ projects });
        }),
          catchError((error) =>
            of(ProjectsActions.getProjectsFailed({ message: error.messages }))
          )
        );
      })
    )
  );

  public getProject$ = createEffect(() =>
    this._actions$.pipe(
      ofType(ProjectsActions.getProject),
      switchMap(() =>
        this._store$.pipe(
          select(RouterStoreSelectors.selectedProjectId),
          take(1)
        ),
      ),
      filter((projectId: string) => {
        return !this.hasProjectsLoaded && !this.hasProjectLoadedMap[projectId];
      }),
      mergeMap((projectId: string) => {
        this.hasProjectLoadedMap[projectId] = true;
        return this._projectsService.getProject(projectId).pipe(
          untilDestroyed(this),
          map((project) => ProjectsActions.getProjectSuccess({ project })),
          catchError((error) =>
            of(ProjectsActions.getProjectFailed({ message: error.messages }))
          )
        );
      })
    )
  );

  // TODO: check diff between switchMap and mergeMap
  public deleteProject$ = createEffect(() =>
    this._actions$.pipe(
      ofType(ProjectsActions.deleteProject),
      switchMap(({ projectId }) => {
        return from(this._projectsService.deleteProject(projectId)).pipe(
          untilDestroyed(this),
          map(() => ProjectsActions.deleteProjectSuccess({ projectId })),
          catchError((error) =>
            of(ProjectsActions.deleteProjectFailed({ message: error.messages }))
          )
        );
      })
    )
  );

  public createProject$ = createEffect(() =>
    this._actions$.pipe(
      ofType(ProjectsActions.createProject),
      switchMap(({ newProject }) => {
        return from(this._projectsService.createProject(newProject)).pipe(
          untilDestroyed(this),
          map(() => ProjectsActions.createProjectSuccess({ newProject })),
          catchError((error) =>
            of(ProjectsActions.createProjectFailed({ message: error.messages }))
          )
        );
      })
    )
  );

  public updateProject$ = createEffect(() =>
    this._actions$.pipe(
      ofType(ProjectsActions.updateProject),
      switchMap(({ projectId, updatedProject }) => {
        return from(this._projectsService.updateProject(projectId, updatedProject)).pipe(
          untilDestroyed(this),
          map(() => {
            return ProjectsActions.updateProjectSuccess({ updatedProject })
          }
          ),
          catchError((error) =>
            of(ProjectsActions.updateProjectFailed({ message: error.messages }))
          )
        );
      })
    )
  );



  constructor(
    private _actions$: Actions,
    private _projectsService: ProjectsService,
    private _store$: Store<AppState>
  ) { }

  ngOnDestroy() { }
}
