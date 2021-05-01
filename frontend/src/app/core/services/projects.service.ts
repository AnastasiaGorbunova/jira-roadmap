import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Project } from '@app/core/models/project.model';
import { FirestoreService } from '@app/core/services/firestore.service';
import { DialogService } from '@app/core/services/dialog.service';
import { deleteConfirmBtnText, deleteItemText, deleteItemTitle } from '@app/shared/dialogs/dialogs.constants';
import * as ProjectsActions from '@app/root-store/features/projects/actions';
import { Store } from '@ngrx/store';
import { AppState } from '@app/root-store/state';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {

  constructor(
    private _firestoreService: FirestoreService,
    private _dialogService: DialogService,
    private _store$: Store<AppState>
    ) {}
 
  getProjects(): Observable<Project[]> {
    return this._firestoreService.getCollection<Project>('/projects', 'date_created', 'desc');
  }

  getProject(projectId: string): Observable<Project> {
    return this._firestoreService.getDocument<Project>(`/projects/${projectId}`);
  }

  deleteProject(projectId: string): Promise<void> {
    return this._firestoreService.deleteDocument('/projects', projectId);
  }

  openDeleteProjectDialog(projectId: string): void {
    this._dialogService.open('ConfirmActionDialogComponent', {
      title: deleteItemTitle('project'),
      text: deleteItemText('project'),
      confirmBtnText: deleteConfirmBtnText,
      handleConfirm: () => {
        this._store$.dispatch(ProjectsActions.deleteProject({ projectId }));
    }
    });
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
