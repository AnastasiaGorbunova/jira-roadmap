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

import * as IssuesActions from '@app/root-store/features/issues/actions';
import * as RouterActions from '@app/root-store/features/router/actions';
import { AppState } from '@app/root-store/state';
import { IssuesService } from '@app/core/services/issues.service';
import { RouterStoreSelectors } from '@app/root-store/features/router';
import { Issue } from '@app/core/models/issue.model';

@UntilDestroy()
@Injectable()
export class IssuesEffects implements OnDestroy {
  private hasIssuesProjectIdMap = {};

  public createIssue$ = createEffect(() =>
    this._actions$.pipe(
      ofType(IssuesActions.createIssue),
      switchMap(({ issue }) => {
        return from(this._issuesService.createIssue(issue)).pipe(
          untilDestroyed(this),
          map(() => IssuesActions.createIssueSuccess()),
          catchError((error) =>
            of(IssuesActions.createIssueFailure({ message: error.messages }))
          )
        );
      })
    )
  );

  public getIssues$ = createEffect(() =>
    this._actions$.pipe(
      ofType(IssuesActions.getIssues),
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
        return this._issuesService.getIssuesByProjectId(projectId).pipe(
          untilDestroyed(this),
          map((issues) => {
            return IssuesActions.getIssuesSuccess({ projectId, issues });
          }
          ),
          catchError((error) =>
            of(IssuesActions.getIssuesFailure({ message: error.messages }))
          )
        );
      })
    )
  );

  public getIssue$ = createEffect(() =>
    this._actions$.pipe(
      ofType(IssuesActions.getIssue),
      switchMap(() =>
        this._store$.pipe(
          select(RouterStoreSelectors.selectRouterParams),
          take(1)
        )
      ),
      filter(({ projectId }) => !this.hasIssuesProjectIdMap[projectId]),
      mergeMap(({ projectId, issueId }) => {
        return this._issuesService.getIssue(issueId).pipe(
          untilDestroyed(this),
          map((issue) => IssuesActions.getIssueSuccess({ projectId, issue })),
          catchError((error) =>
            of(IssuesActions.getIssueFailure({ message: error.messages }))
          )
        );
      })
    )
  );

  public getIssueSubtasks$ = createEffect(() =>
  this._actions$.pipe(
    ofType(IssuesActions.getIssueSubtasks),
    switchMap(() =>
      this._store$.pipe(
        select(RouterStoreSelectors.selectRouterParams),
        take(1)
      )
    ),
    filter(({ projectId }) => !this.hasIssuesProjectIdMap[projectId]),
    mergeMap(({ projectId, issueId }) => {
      return this._issuesService.getIssueSubtasks(issueId).pipe(
        untilDestroyed(this),
        map((issues: Issue[]) => IssuesActions.getIssueSubtasksSuccess({ projectId, issues })),
        catchError((error) =>
          of(IssuesActions.getIssueSubtasksFailure({ message: error.messages }))
        )
      );
    })
  )
);

  public deleteIssue$ = createEffect(() =>
    this._actions$.pipe(
      ofType(IssuesActions.deleteIssue),
      switchMap(({ projectId, issueId }) => {
        return from(this._issuesService.deleteIssue(issueId)).pipe(
          untilDestroyed(this),
          mergeMap(() => of(IssuesActions.deleteIssueSuccess(), RouterActions.navigateProject({ projectId }))),
          catchError((error) =>
            of(IssuesActions.deleteIssueFailure({ message: error.messages }))
          )
        );
      })
    )
  );

  public updateIssue$ = createEffect(() =>
    this._actions$.pipe(
      ofType(IssuesActions.updateIssue),
      switchMap(({ issue, issueId }) => {
        return from(this._issuesService.updateIssue(issueId, issue)).pipe(
          untilDestroyed(this),
          map(() => IssuesActions.updateIssueSuccess()),
          catchError((error) =>
            of(IssuesActions.updateIssueFailure({ message: error.messages }))
          )
        );
      })
    )
  );

  constructor(
    private _actions$: Actions,
    private _issuesService: IssuesService,
    private _store$: Store<AppState>
  ) { }

  ngOnDestroy() { }
}
