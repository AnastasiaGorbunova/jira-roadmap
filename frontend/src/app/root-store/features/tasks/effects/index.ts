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
import { Issue } from '@app/core/models/task.model';

@UntilDestroy()
@Injectable()
export class TasksEffects implements OnDestroy {
  private hasIssuesProjectIdMap = {};

  public createIssue$ = createEffect(() =>
    this._actions$.pipe(
      ofType(TasksActions.createIssue),
      switchMap(({ issue }) => {
        return from(this._tasksService.createIssue(issue)).pipe(
          untilDestroyed(this),
          map(() => TasksActions.createIssueSuccess()),
          catchError((error) =>
            of(TasksActions.createIssueFailure({ message: error.messages }))
          )
        );
      })
    )
  );

  public getIssues$ = createEffect(() =>
    this._actions$.pipe(
      ofType(TasksActions.getIssues),
      switchMap(() =>
        this._store$.pipe(
          select(RouterStoreSelectors.selectedProjectId),
          take(1)
        )
      ),
      filter((projectId: string) => !this.hasIssuesProjectIdMap[projectId]),
      mergeMap((projectId: string) => {
        this.hasIssuesProjectIdMap = {
          ...this.hasIssuesProjectIdMap,
          [projectId]: true
        };
        return this._tasksService.getIssuesByProjectId(projectId).pipe(
          untilDestroyed(this),
          map((issues) => {
            return TasksActions.getIssuesSuccess({ projectId, issues });
          }
          ),
          catchError((error) =>
            of(TasksActions.getIssuesFailure({ message: error.messages }))
          )
        );
      })
    )
  );

  public getIssue$ = createEffect(() =>
    this._actions$.pipe(
      ofType(TasksActions.getIssue),
      switchMap(() =>
        this._store$.pipe(
          select(RouterStoreSelectors.selectRouterParams),
          take(1)
        )
      ),
      filter(({ projectId }) => !this.hasIssuesProjectIdMap[projectId]),
      mergeMap(({ projectId, issueId }) => {
        return this._tasksService.getIssue(issueId).pipe(
          untilDestroyed(this),
          map((issue) => TasksActions.getIssueSuccess({ projectId, issue })),
          catchError((error) =>
            of(TasksActions.getIssueFailure({ message: error.messages }))
          )
        );
      })
    )
  );

  public getIssueSubtasks$ = createEffect(() =>
  this._actions$.pipe(
    ofType(TasksActions.getIssueSubtasks),
    switchMap(() =>
      this._store$.pipe(
        select(RouterStoreSelectors.selectRouterParams),
        take(1)
      )
    ),
    filter(({ projectId }) => !this.hasIssuesProjectIdMap[projectId]),
    mergeMap(({ projectId, issueId }) => {
      return this._tasksService.getIssueSubtasks(issueId).pipe(
        untilDestroyed(this),
        map((issues: Issue[]) => {
          console.log('issues', issues);
          
          return TasksActions.getIssueSubtasksSuccess({ projectId, issues });
        }),
        catchError((error) =>
          of(TasksActions.getIssueSubtasksFailure({ message: error.messages }))
        )
      );
    })
  )
);

  public deleteIssue$ = createEffect(() =>
    this._actions$.pipe(
      ofType(TasksActions.deleteIssue),
      switchMap(({ projectId, issueId }) => {
        return from(this._tasksService.deleteIssue(issueId)).pipe(
          untilDestroyed(this),
          mergeMap(() => of(TasksActions.deleteIssueSuccess(), RouterActions.navigateProject({ projectId }))),
          catchError((error) =>
            of(TasksActions.deleteIssueFailure({ message: error.messages }))
          )
        );
      })
    )
  );

  public updateIssue$ = createEffect(() =>
    this._actions$.pipe(
      ofType(TasksActions.updateIssue),
      switchMap(({ issue, issueId }) => {
        return from(this._tasksService.updateIssue(issueId, issue)).pipe(
          untilDestroyed(this),
          map(() => TasksActions.updateIssueSuccess()),
          catchError((error) =>
            of(TasksActions.updateIssueFailure({ message: error.messages }))
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
