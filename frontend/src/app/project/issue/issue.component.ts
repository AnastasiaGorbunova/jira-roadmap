import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { Form, FormControl } from '@angular/forms';

import { Project } from '@app/core/models/project.model';
import { Issue, issueStatuses, issueStatusesSet } from '@app/core/models/task.model';
import { User } from '@app/core/models/user.model';

@Component({
  selector: 'app-issue',
  templateUrl: './issue.component.html',
  styleUrls: ['./issue.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IssueComponent implements OnChanges {
  @Input() issue: Issue;
  @Input() project: Project;
  @Input() users: User[];
  @Output() onNavigateToBoard = new EventEmitter<void>();
  @Output() onNavigateToProject = new EventEmitter<string>();
  @Output() onCreateSubTask = new EventEmitter<{ projectId: string, issueId: string }>();
  @Output() onEditIssue = new EventEmitter<any>();
  @Output() onDeleteIssue = new EventEmitter<{ projectId: string, issueId: string }>();
  @Output() onUpdateIssueFields = new EventEmitter<any>();

  issueStatus: FormControl;
  issueAssignee: FormControl;
  issueStatuses = issueStatuses;
  issueStatusesSet = issueStatusesSet;

  constructor() {
    this.issueStatus = new FormControl('');
    this.issueAssignee = new FormControl();
  }

  navigateToBoard(): void {
    this.onNavigateToBoard.emit();
  }

  navigateToProject(): void {
    this.onNavigateToProject.emit(this.project.id);
  }

  createSubTask(): void {
    const data = {
      projectId: this.project.id,
      issueId: this.issue.id
    }
    this.onCreateSubTask.emit(data);
  }

  editIssue(): void {
    this.onEditIssue.emit(this.issue);
  }

  deleteIssue(): void {
    const data = {
      projectId: this.project.id,
      issueId: this.issue.id
    };

    this.onDeleteIssue.emit(data);
  }

  updateIssueField(fieldName: string, value: string): void {

    const newValue = fieldName === 'assignee_id' && value === 'unassigned' ? null : value;

    const updatedIssue = {
      ...this.issue,
      [fieldName]: newValue
    } as any;
    
    this.onUpdateIssueFields.emit(updatedIssue);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.issue && this.issue) {
      this.issueStatus.setValue(this.issue.status);
      this.issueAssignee.setValue(this.issue.assignee_id || 'unassigned');
    }
  }
}
