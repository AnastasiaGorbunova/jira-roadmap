import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';

import { Issue } from '@app/core/models/task.model';

@Component({
  selector: 'app-issue-card',
  templateUrl: './issue-card.component.html',
  styleUrls: ['./issue-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IssueCardComponent {
  @Input() issue: Issue;
  @Input() issueAssignee: string;
  @Output() onNavigateToIssue = new EventEmitter<string>();
  
  constructor() { }

  navigateToIssue(): void {
    this.onNavigateToIssue.emit(this.issue.id);
  }
}
