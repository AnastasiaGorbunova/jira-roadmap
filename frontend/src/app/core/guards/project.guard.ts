import { Injectable } from '@angular/core';
import { CanActivate, CanLoad } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';

import { RouterStoreActions, RouterStoreSelectors } from '@app/root-store/features/router';
import { AppState } from '@app/root-store/state';
import { ProjectsService } from '@app/core/services/projects.service';

@Injectable({
	providedIn: 'root',
})
export class ProjectGuard implements CanActivate {

	constructor(
		private _store$: Store<AppState>,
		private _projectsService$: ProjectsService
	) { }

	canActivate() {
		return this.verifyProjectExists()
			.pipe(
				map((hasProjectExists) => {
					console.log('hasProjectExists', hasProjectExists);

					if (!hasProjectExists) {
						this._store$.dispatch(RouterStoreActions.navigateProjectsBoard());
						return false;
					}

					return true;
				})
			);
	}

	private verifyProjectExists(): Observable<boolean> {
		return this._store$.pipe(
			select(RouterStoreSelectors.selectedProjectId),
			mergeMap((projectId) => this._projectsService$.verifyProjectExists(projectId))
		);
	}
}
