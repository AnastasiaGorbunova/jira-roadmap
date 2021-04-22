import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Project } from '../core/models/project.model';
import { ProjectsStoreActions, ProjectsStoreSelectors } from '../root-store/features/projects';
import { AppState } from '../root-store/state';

@Component({
  selector: 'app-projects-board',
  templateUrl: './projects-board.component.html',
  styleUrls: ['./projects-board.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectsBoardComponent implements OnInit {
  projects$: Observable<Project[]>;

  // TODO: add track by id

  constructor(private _store$: Store<AppState>) {}

  ngOnInit() {
    this._store$.dispatch(ProjectsStoreActions.getProjects());

    this.projects$ = this._store$.pipe(select(ProjectsStoreSelectors.selectProjects));
  }
}
