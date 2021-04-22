import { Injectable, OnDestroy } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import {
  catchError,
  map,
  mergeMap,
} from 'rxjs/operators';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

import * as ProjectsActions from '../actions';
import { ProjectsService } from 'src/app/core/services/projects.service';
import { AppState } from 'src/app/root-store/state';

@UntilDestroy()
@Injectable()
export class ProjectsEffects implements OnDestroy {
  public getProjects$ = createEffect(() =>
    this._actions$.pipe(
      ofType(ProjectsActions.getProjects),
      mergeMap(() => {
        return this._projectsService.getProjects().pipe(
          untilDestroyed(this),
          map((projects) => {
            console.log('EFFECTS PROJECTS', projects);
            
            return ProjectsActions.getProjectsSuccess({ projects })
          }
          ), 
          catchError((error) =>
            of(ProjectsActions.getProjectsFailed({ message: error.messages }))
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
