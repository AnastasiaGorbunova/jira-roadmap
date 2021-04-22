import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Project } from '../models/project.model';
import { FirestoreService } from './firestore.service';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {

  constructor(private _firestoreService: FirestoreService) {}
 
  getProjects(): Observable<Project[]> {
    console.log('SERVICE GET PROJECTS');
    return this._firestoreService.getCollection<Project>('/projects');
  }

  deleteProject(projectId: string): Promise<void> {
    console.log('DELETE PR', projectId);
    
    return this._firestoreService.deleteDocument('/projects', projectId);
  }
}
