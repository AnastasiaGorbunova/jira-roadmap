import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Project } from '@app/core/models/project.model';
import { FirestoreService } from '@app/core/services/firestore.service';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {

  constructor(private _firestoreService: FirestoreService) {}
 
  getProjects(): Observable<Project[]> {
    return this._firestoreService.getCollection<Project>('/projects', 'date_created', 'desc');
  }

  getProject(projectId: string): Observable<Project> {
    return this._firestoreService.getDocument<Project>(`/projects/${projectId}`);
  }

  deleteProject(projectId: string): Promise<void> {
    return this._firestoreService.deleteDocument('/projects', projectId);
  }

  async createProject(project: Project): Promise<void> {
    const timestamp = this._firestoreService.timestamp;
    const newProject = {
      ...project,
      date_created: timestamp
    };

    await this._firestoreService.addDocument('/projects', newProject);
  }

  async updateProject(projectId: string, project: Project): Promise<void> {
    const timestamp = this._firestoreService.timestamp;
    const updatedProject = {
      ...project,
      date_updated: timestamp
    };
    
    await this._firestoreService.updateDocument(`/projects/${projectId}`, updatedProject);
  }
}
