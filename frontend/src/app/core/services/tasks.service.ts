import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Issue } from '@app/core/models/task.model';
import { FirestoreService } from '@app/core/services/firestore.service';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  constructor(private _firestoreService: FirestoreService) {}

  getIssuesByProjectId(projectId: string): Observable<Issue[]> {
    return this._firestoreService.getDocumentsByProperty<Issue>(`/issues`, 'project_id', projectId);
  }

  deleteIssue(issueId: string): Promise<void> {
    return this._firestoreService.deleteDocument(`/issues`, issueId);
  }

  async createIssue(newIssue: Issue): Promise<void> {
    const timestamp = this._firestoreService.timestamp;
    const issue = {
      ...newIssue,
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

    await this._firestoreService.update(`issues/${issueId}`, updatedIssue);
  }

  getIssue(issueId: string): Observable<Issue> {
    return this._firestoreService.getDocument(`/issues/${issueId}`);
  }

  // getSubTasksByProjectId(projectId: string): Observable<SubTask[]> {
  //   return this._firestoreService.getDocumentsByProperty<SubTask>(`/subtasks`, 'project_id', projectId);
  // }

  // async createTask(task: Task): Promise<void> {
  //   const timestamp = this._firestoreService.timestamp;
  //   const newTask = {
  //     ...task,
  //     date_created: timestamp,
  //   };

  //   await this._firestoreService.addDocument('/tasks', newTask);
  // }

  // async createSubTask(newSubtask: SubTask): Promise<void> {
  //   const timestamp = this._firestoreService.timestamp;
  //   const subtask = {
  //     ...newSubtask,
  //     date_created: timestamp,
  //   };

  //   await this._firestoreService.addDocument('/subtasks', subtask);
  // }
}
