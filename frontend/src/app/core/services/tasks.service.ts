import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Task } from '@app/core/models/task.model';
import { FirestoreService } from '@app/core/services/firestore.service';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  constructor(private _firestoreService: FirestoreService) {}

  getTasks(projectId: string): Observable<Task[]> {
    return this._firestoreService.getCollection<Task>(`/projects/${projectId}/tasks`, 'date_created');
  }

  getTask(projectId: string, taskId: string): Observable<Task> {
    return this._firestoreService.getDocument(`/projects/${projectId}/tasks/${taskId}`);
  }

  async createTask(projectId: string, task: Task): Promise<void> {
    const timestamp = this._firestoreService.timestamp;
    const newTask = {
      ...task,
      date_created: timestamp,
      project_id: projectId
    };

    await this._firestoreService.addDocument(`/projects/${projectId}/tasks`, newTask);
  }

  async updateTask(task: Task): Promise<void> {
    const timestamp = this._firestoreService.timestamp;
    const updatedTask = {
      ...task,
      date_updated: timestamp
    };
    
    await this._firestoreService.update(`/projects/${task.project_id}/tasks/${task.id}`, updatedTask);
  }

  deleteTask(projectId: string, taskId: string): Promise<void> {
    return this._firestoreService.deleteDocument(`/projects/${projectId}/tasks`, taskId);
  }
}
