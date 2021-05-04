import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';

import { Project } from '@app/core/models/project.model';
import { Issue, issueStatuses, issueStatusesSet } from '@app/core/models/task.model';
import { preventKeyValueOrder, trackById } from '@app/core/utils';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectComponent {
  @Input() project: Project;
  @Input() projectIssuesMap: any;
  @Output() onCreateIssue = new EventEmitter<string>();
  @Output() onEditProject = new EventEmitter<Project>();
  @Output() onDeleteProject = new EventEmitter<string>();
  @Output() onNavigateToBoard = new EventEmitter<void>();

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

  createIssue(): void {
    this.onCreateIssue.emit(this.project.id);
  }

  editProject(): void {
    this.onEditProject.emit(this.project);
  }

  deleteProject(): void {
    this.onDeleteProject.emit(this.project.id);
  }

  navigateToBoard(): void {
    this.onNavigateToBoard.emit();
  }
}
