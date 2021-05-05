import {
  Component,
  ChangeDetectionStrategy,
  Input,
  Output, 
  EventEmitter, 
  OnChanges, 
  SimpleChanges
} from '@angular/core';
import { FormControl } from '@angular/forms';

import { Project } from '@app/core/models/project.model';
import { Issue, issueStatuses, issueStatusesSet, IssueType, issueTypesSet } from '@app/core/models/issue.model';
import { unassigned, User } from '@app/core/models/user.model';
import { trackById } from '@app/core/utils';

@Component({
  selector: 'app-issue',
  templateUrl: './issue.component.html',
  styleUrls: ['./issue.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IssueComponent implements OnChanges {
  @Input() issue: Issue;
  @Input() issueSubtasks: Issue[];
  @Input() project: Project;
  @Input() issueAssignee: string;
  @Input() issueReporter: string;
  @Input() users: User[];
  @Output() onNavigateToBoard = new EventEmitter<void>();
  @Output() onNavigateToProject = new EventEmitter<string>();
  @Output() onNavigateToSubtask = new EventEmitter<string>();
  @Output() onCreateSubTask = new EventEmitter<{ projectId: string, issueId: string }>();
  @Output() onEditIssue = new EventEmitter<Issue>();
  @Output() onDeleteIssue = new EventEmitter<{ projectId: string, issueId: string }>();
  @Output() onUpdateIssueFields = new EventEmitter<{ updatedData: { [fieldName: string]: string }, issueId: string }>();

  issueStatus: FormControl;
  issueStatuses = issueStatuses;
  issueStatusesSet = issueStatusesSet;
  unassigned = unassigned;
  trackById = trackById;

  constructor() {
    this.issueStatus = new FormControl('');
  }

  get issueType(): string {
    return issueTypesSet[this.issue?.type];
  }

  get canCreateSubtask(): boolean {
    return this.issue?.type !== IssueType.SubTask;
  }

  getAssignee(assigneeId: string): string {
    const assignee = this.users.find(user => user.id === assigneeId);

    return assignee ? `${assignee.first_name} ${assignee.last_name}` : unassigned;
  }

  navigateToBoard(): void {
    this.onNavigateToBoard.emit();
  }

  navigateToProject(): void {
    this.onNavigateToProject.emit(this.project.id);
  }

  navigateToSubtask(subtaskId: string): void {
    this.onNavigateToSubtask.emit(subtaskId);
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
    const data = { 
      updatedData: { [fieldName]: value }, 
      issueId: this.issue.id 
    };
    
    this.onUpdateIssueFields.emit(data);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.issue && this.issue) {
      this.issueStatus.setValue(this.issue.status);
    }
  }
}
