import { Component, ChangeDetectionStrategy, Input, OnChanges, SimpleChanges } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { RouterStoreActions } from '@app/root-store/features/router';
import { AppState } from '@app/root-store/state';
import { Issue } from '@app/core/models/issue.model';
import { IssuesStoreSelectors } from '@app/root-store/features/issues';

@Component({
  selector: 'app-issue-card-container',
  templateUrl: './issue-card-container.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IssueCardContainerComponent implements OnChanges {
  @Input() issue: Issue;
  @Input() projectId: string;

  issueAssignee$: Observable<string>;

  constructor(
    private _store$: Store<AppState>
  ) { }

  navigateToIssue(issueId: string): void {
    this._store$.dispatch(RouterStoreActions.navigateIssue({ issueId }));
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.issue && this.issue && this.issue.assignee_id) {
      this.issueAssignee$ = this._store$.pipe(select(IssuesStoreSelectors.issueAssigneeSelector, { assigneeId: this.issue.assignee_id }));
    }
  }
}
