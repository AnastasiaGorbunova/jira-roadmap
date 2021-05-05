import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';

import { Project } from '@app/core/models/project.model';
import { Issue, IssuesMap, issueStatuses, issueStatusesSet } from '@app/core/models/issue.model';
import { preventKeyValueOrder, trackById } from '@app/core/utils';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectComponent {
  @Input() project: Project;
  @Input() projectIssuesMap: IssuesMap;
  @Input() isUserAdmin: boolean;
  @Input() isUserLeader: boolean;
  @Output() onCreateIssue = new EventEmitter<string>();
  @Output() onEditProject = new EventEmitter<Project>();
  @Output() onDeleteProject = new EventEmitter<Project>();
  @Output() onNavigateToBoard = new EventEmitter<void>();
  @Output() onNavigateToIssue = new EventEmitter<string>();

  trackById = trackById;
  preventKeyValueOrder = preventKeyValueOrder;
  issueStatuses = issueStatuses;
  issueStatusesSet = issueStatusesSet;

  constructor() { }

  getSubtasks(issueId: string, status: string): Issue[] {
    const subtasksStatusMap = this.projectIssuesMap?.subtasksGroupedByStatusMap;
    return subtasksStatusMap[issueId] && subtasksStatusMap[issueId][status];
  }

  getOtherIssues(status: string): Issue[] {
    const otherIssues = this.projectIssuesMap?.otherIssuesGroupedByStatus;
    return otherIssues && otherIssues[status];
  }

  get hasOtherIssues(): boolean {
    const otherIssuesMap = this.projectIssuesMap?.otherIssuesGroupedByStatus;
    
    return !!Object.keys(otherIssuesMap || {}).length;
  }

  get isIssuesTableVisible(): boolean {
    const tasksMap = this.projectIssuesMap?.issuesWithSubtasks;
    const hasTasks = !!Object.keys(tasksMap || {}).length;
    return this.hasOtherIssues || hasTasks;
  }

  createIssue(): void {
    this.onCreateIssue.emit(this.project.id);
  }

  editProject(): void {
    this.onEditProject.emit(this.project);
  }

  deleteProject(): void {
    this.onDeleteProject.emit(this.project);
  }

  navigateToBoard(): void {
    this.onNavigateToBoard.emit();
  }

  navigateToIssue(issueId: string): void {
    this.onNavigateToIssue.emit(issueId);
  }
}
