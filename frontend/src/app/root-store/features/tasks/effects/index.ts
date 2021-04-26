import { Injectable, OnDestroy } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { from, of } from 'rxjs';
import {
  catchError,
  map,
  mergeMap,
  switchMap,
  take,
} from 'rxjs/operators';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

import * as TasksActions from '../actions';
import { AppState } from 'src/app/root-store/state';
import { TasksService } from 'src/app/core/services/tasks.service';
import { RouterStoreSelectors } from '../../router';

@UntilDestroy()
@Injectable()
export class TasksEffects implements OnDestroy {
  private hasProjectsLoaded: boolean = false;

  public createTask$ = createEffect(() =>
    this._actions$.pipe(
      ofType(TasksActions.createTask),
      switchMap(({ projectId, task }) => {
        console.log('crrr task ef');

        return from(this._tasksService.createTask(projectId, task)).pipe(
          untilDestroyed(this),
          map(() => {
            console.log('EFFECTS createTask', task);
            return TasksActions.createTaskSuccess();
          }
          ),
          catchError((error) =>
            of(TasksActions.createTaskFailure({ message: error.messages }))
          )
        );
      })
    )
  );

  public getTasks$ = createEffect(() =>
    this._actions$.pipe(
      ofType(TasksActions.getTasks),
      switchMap(() =>
        this._store$.pipe(
          select(RouterStoreSelectors.selectedProjectId),
          take(1)
        )
      ),
      mergeMap((projectId: string) => {
        return this._tasksService.getTasks(projectId).pipe(
          untilDestroyed(this),
          map((tasks) => {
            console.log('EFFECTS tasks', tasks);
            return TasksActions.getTasksSuccess({ projectId, tasks });
          }
          ),
          catchError((error) =>
            of(TasksActions.getTasksFailure({ message: error.messages }))
          )
        );
      })
    )
  );

  constructor(
    private _actions$: Actions,
    private _tasksService: TasksService,
    private _store$: Store<AppState>
  ) {
    console.log('effe tasks');

  }

  ngOnDestroy() { }
}
