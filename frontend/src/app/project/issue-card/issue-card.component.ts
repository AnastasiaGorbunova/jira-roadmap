import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';

import { Issue, issueTypesSet } from '@app/core/models/task.model';

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
  
  issueTypesSet = issueTypesSet;

  constructor() { }

  get issueType(): string {
    return issueTypesSet[this.issue?.type];
  }

  navigateToIssue(): void {
    this.onNavigateToIssue.emit(this.issue.id);
  }
}
