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

import * as TasksActions from '@app/root-store/features/tasks/actions';
import { AppState } from '@app/root-store/state';
import { TasksService } from '@app/core/services/tasks.service';
import { RouterStoreSelectors } from '@app/root-store/features/router';

@UntilDestroy()
@Injectable()
export class TasksEffects implements OnDestroy {
  private hasTasksLoaded: boolean = false;

  public createTask$ = createEffect(() =>
    this._actions$.pipe(
      ofType(TasksActions.createTask),
      switchMap(({ projectId, task }) => {

        return from(this._tasksService.createTask(projectId, task)).pipe(
          untilDestroyed(this),
          map(() => TasksActions.createTaskSuccess()),
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
        this.hasTasksLoaded = true;

        return this._tasksService.getTasks(projectId).pipe(
          untilDestroyed(this),
          map((tasks) => TasksActions.getTasksSuccess({ projectId, tasks })),
          catchError((error) =>
            of(TasksActions.getTasksFailure({ message: error.messages }))
          )
        );
      })
    )
  );

  public getTask$ = createEffect(() =>
  this._actions$.pipe(
    ofType(TasksActions.getTask),
    switchMap(() =>
      this._store$.pipe(
        select(RouterStoreSelectors.selectRouterParams),
        take(1)
      )
    ),
    filter(() => {
      return !this.hasTasksLoaded;
    }),
    mergeMap(({ projectId, taskId }) => {
      return this._tasksService.getTask(projectId, taskId).pipe(
        untilDestroyed(this),
        map((task) => TasksActions.getTaskSuccess({ projectId, task })),
        catchError((error) =>
          of(TasksActions.getTaskFailure({ message: error.messages }))
        )
      );
    })
  )
);

  constructor(
    private _actions$: Actions,
    private _tasksService: TasksService,
    private _store$: Store<AppState>
  ) {}

  ngOnDestroy() { }
}
