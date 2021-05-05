import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Issue } from '@app/core/models/issue.model';
import { FirestoreService } from '@app/core/services/firestore.service';
import { stringify } from '@angular/compiler/src/util';

@Injectable({
  providedIn: 'root'
})
export class IssuesService {

  constructor(private _firestoreService: FirestoreService) { }

  getIssuesByProjectId(projectId: string): Observable<Issue[]> {
    return this._firestoreService.getDocumentsByProperty<Issue>(`/issues`, 'project_id', projectId);
  }

  deleteIssue(issueId: string): Promise<void> {
    return this._firestoreService.deleteDocument(`/issues`, issueId);
  }

  async createIssue(currentUserId: string, newIssue: Issue): Promise<void> {
    const timestamp = this._firestoreService.timestamp;
    const issue = {
      ...newIssue,
      creator_id: currentUserId,
      date_created: timestamp,
    };

    await this._firestoreService.addDocument('/issues', issue);
  }

  async updateIssue(issueId: string, issue: Issue): Promise<void> {
    const timestamp = this._firestoreService.timestamp;
    const updatedIssue = {
      ...issue,
      date_updated: timestamp
    };

    await this._firestoreService.update(`/issues/${issueId}`, updatedIssue);
  }

  getIssue(issueId: string): Observable<Issue> {
    return this._firestoreService.getDocument(`/issues/${issueId}`);
  }

  getIssueSubtasks(issueId: string): Observable<Issue[]> {
    return this._firestoreService.getDocumentsByProperty<Issue>('/issues', 'issue_id', issueId);
  }
}
