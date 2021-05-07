import { Injectable } from '@angular/core';
import { CanActivate, CanLoad } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';

import { RouterStoreActions, RouterStoreSelectors } from '@app/root-store/features/router';
import { AppState } from '@app/root-store/state';
import { IssuesService } from '@app/core/services/issues.service';

@Injectable({
	providedIn: 'root',
})
export class IssueGuard implements CanActivate {

	constructor(
		private _store$: Store<AppState>,
		private _issuesService: IssuesService
	) { }

	canActivate() {
		return this.verifyIssueExists()
			.pipe(
				map((hasIssueExists) => {
					if (!hasIssueExists) {
						this._store$.dispatch(RouterStoreActions.navigateProjectsBoard());
						return false;
					}

					return true;
				})
			);
	}

	private verifyIssueExists(): Observable<boolean> {
		return this._store$.pipe(
			select(RouterStoreSelectors.selectedIssueId),
			mergeMap((issueId) => this._issuesService.verifyIssueExists(issueId))
		);
	}
}
