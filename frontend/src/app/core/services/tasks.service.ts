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

  async createTask(projectId: string, task: Task): Promise<void> {
    console.log('create task service');
    
    const timestamp = this._firestoreService.timestamp;
    const newTask = {
      ...task,
      date_created: timestamp
    };

    await this._firestoreService.addDocument(`/projects/${projectId}/tasks`, newTask);
  }
}
