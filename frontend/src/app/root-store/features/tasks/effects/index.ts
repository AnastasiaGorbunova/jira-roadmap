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
import * as RouterActions from '@app/root-store/features/router/actions';
import { AppState } from '@app/root-store/state';
import { TasksService } from '@app/core/services/tasks.service';
import { RouterStoreSelectors } from '@app/root-store/features/router';

@UntilDestroy()
@Injectable()
export class TasksEffects implements OnDestroy {
  private hasTasksProjectIdMap = {};
  private hasSubTasksProjectIdMap = {};

  public createTask$ = createEffect(() =>
    this._actions$.pipe(
      ofType(TasksActions.createTask),
      switchMap(({ task }) => {

        return from(this._tasksService.createTask(task)).pipe(
          untilDestroyed(this),
          map(() => TasksActions.createTaskSuccess()),
          catchError((error) =>
            of(TasksActions.createTaskFailure({ message: error.messages }))
          )
        );
      })
    )
  );

  public createSubTask$ = createEffect(() =>
  this._actions$.pipe(
    ofType(TasksActions.createSubTask),
    switchMap(({ subtask }) => {

      return from(this._tasksService.createSubTask(subtask)).pipe(
        untilDestroyed(this),
        map(() => TasksActions.createSubTaskSuccess()),
        catchError((error) =>
          of(TasksActions.createSubTaskFailure({ message: error.messages }))
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
      filter((projectId: string) => !this.hasTasksProjectIdMap[projectId]),
      mergeMap((projectId: string) => {
        this.hasTasksProjectIdMap = {
          ...this.hasTasksProjectIdMap,
          [projectId]: true
        };
        console.log('GET TASKS');

        return this._tasksService.getTasksByProjectId(projectId).pipe(
          untilDestroyed(this),
          map((tasks) => {
            console.log('tasks', tasks);
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

  public getSubTasks$ = createEffect(() =>
  this._actions$.pipe(
    ofType(TasksActions.getSubTasks),
    switchMap(() =>
      this._store$.pipe(
        select(RouterStoreSelectors.selectedProjectId),
        take(1)
      )
    ),
    filter((projectId: string) => !this.hasSubTasksProjectIdMap[projectId]),
    mergeMap((projectId: string) => {

      // TODO: если загружаем из таск вью, проверяем есть ли taskId и берем таски по нему
      // see get desks map
      this.hasSubTasksProjectIdMap = {
        ...this.hasSubTasksProjectIdMap,
        [projectId]: true
      };
      console.log('GET TASKS');

      return this._tasksService.getSubTasksByProjectId(projectId).pipe(
        untilDestroyed(this),
        map((subtasks) => {
          console.log('subtasks', subtasks);
          return TasksActions.getSubTasksSuccess({ projectId, subtasks });
        }
        ),
        catchError((error) =>
          of(TasksActions.getSubTasksFailure({ message: error.messages }))
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
      filter(({ projectId }) => !this.hasTasksProjectIdMap[projectId]),
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

  public deleteTask$ = createEffect(() =>
    this._actions$.pipe(
      ofType(TasksActions.deleteTask),
      switchMap(({ projectId, taskId }) => {
        return from(this._tasksService.deleteTask(projectId, taskId)).pipe(
          untilDestroyed(this),
          mergeMap(() => of(TasksActions.deleteTaskSuccess(), RouterActions.navigateProject({ projectId }))),
          catchError((error) =>
            of(TasksActions.deleteTaskFailure({ message: error.messages }))
          )
        );
      })
    )
  );

  public updateTask$ = createEffect(() =>
    this._actions$.pipe(
      ofType(TasksActions.updateTask),
      switchMap(({ updatedTask }) => {
        return from(this._tasksService.updateTask(updatedTask)).pipe(
          untilDestroyed(this),
          map(() => TasksActions.updateTaskSuccess()),
          catchError((error) =>
            of(TasksActions.updateTaskFailure({ message: error.messages }))
          )
        );
      })
    )
  );

  constructor(
    private _actions$: Actions,
    private _tasksService: TasksService,
    private _store$: Store<AppState>
  ) { }

  ngOnDestroy() { }
}
