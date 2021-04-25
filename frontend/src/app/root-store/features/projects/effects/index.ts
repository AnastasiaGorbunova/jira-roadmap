import { Injectable, OnDestroy } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { EMPTY, from, of } from 'rxjs';
import {
  catchError,
  filter,
  map,
  mergeMap,
  switchMap,
  withLatestFrom,
} from 'rxjs/operators';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

import * as ProjectsActions from '../actions';
import * as ProjectsSelectors from '../selectors';
import { ProjectsService } from 'src/app/core/services/projects.service';
import { AppState } from 'src/app/root-store/state';
import { ProjectsStoreSelectors } from '..';

@UntilDestroy()
@Injectable()
export class ProjectsEffects implements OnDestroy {
  private hasProjectsLoaded: boolean = false;

  public getProjects$ = createEffect(() =>
    this._actions$.pipe(
      ofType(ProjectsActions.getProjects),
      mergeMap(() => {
        return this._projectsService.getProjects().pipe(
          untilDestroyed(this),
          map((projects) => {
            
            this.hasProjectsLoaded = true;
            console.log('EFFECTS PROJECTS', projects);
            return ProjectsActions.getProjectsSuccess({ projects });
          }
          ), 
          catchError((error) =>
            of(ProjectsActions.getProjectsFailed({ message: error.messages }))
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
        map(() => {
          return ProjectsActions.deleteProjectSuccess({ projectId })
        }
        ), 
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
      map(() => {
        console.log('EFFECTS createProject', newProject);
        return ProjectsActions.createProjectSuccess({ newProject })
      }
      ), 
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
  ) {}

  ngOnDestroy() {}
}
