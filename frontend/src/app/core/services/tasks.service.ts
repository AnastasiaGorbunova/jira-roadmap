import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { SubTask, Task } from '@app/core/models/task.model';
import { FirestoreService } from '@app/core/services/firestore.service';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  constructor(private _firestoreService: FirestoreService) {}

  getTasksByProjectId(projectId: string): Observable<Task[]> {
    return this._firestoreService.getDocumentsByProperty<Task>(`/tasks`, 'project_id', projectId);
  }

  getSubTasksByProjectId(projectId: string): Observable<SubTask[]> {
    console.log('getSubTasksByProjectId');
    
    return this._firestoreService.getDocumentsByProperty<SubTask>(`/subtasks`, 'project_id', projectId);
  }

  getTask(projectId: string, taskId: string): Observable<Task> {
    return this._firestoreService.getDocument(`/tasks/${taskId}`);
  }

  async createTask(task: Task): Promise<void> {
    const timestamp = this._firestoreService.timestamp;
    const newTask = {
      ...task,
      date_created: timestamp,
    };

    await this._firestoreService.addDocument('/tasks', newTask);
  }

  async createSubTask(newSubtask: SubTask): Promise<void> {
    const timestamp = this._firestoreService.timestamp;
    const subtask = {
      ...newSubtask,
      date_created: timestamp,
    };

    await this._firestoreService.addDocument('/subtasks', subtask);
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
