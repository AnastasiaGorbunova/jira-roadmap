import { Injectable } from '@angular/core';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import { Project } from '@app/core/models/project.model';
import { FirestoreService } from '@app/core/services/firestore.service';
import { DialogService } from '@app/core/services/dialog.service';
import { deleteConfirmBtnText, deleteItemText, deleteItemTitle } from '@app/shared/dialogs/dialogs.constants';
import * as ProjectsActions from '@app/root-store/features/projects/actions';
import { AppState } from '@app/root-store/state';
import { User, UserAccess } from '@app/core/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {

  constructor(
    private _firestoreService: FirestoreService,
    private _dialogService: DialogService,
    private _store$: Store<AppState>
  ) { }

  getProjects(currentUser: User): Observable<Project[]> {

    if (currentUser.role === UserAccess.Admin) {
      return this._firestoreService.getCollection<Project>('/projects');
    }

    return combineLatest([
      this._firestoreService.getDocumentsByProperty<Project>('/projects', `participants.${currentUser.id}`, true),
      this._firestoreService.getDocumentsByProperty<Project>('/projects', 'leader_id', currentUser.id)
    ]).pipe(map(([projects1, projects2]) => [...projects1, ...projects2]));
  }

  getProject(projectId: string): Observable<Project> {
    return this._firestoreService.getDocument<Project>(`/projects/${projectId}`);
  }

  async deleteProject(project: Project): Promise<void> {
    const { leader_id, participants, id } = project || {};

    await this._firestoreService.deleteDocument('/projects', id);

    // it's necessary to remove all project nodes for user 
    if (leader_id) {
      await this.deleteLeaderProject(leader_id, project.id);
    }

    const participantsIds = Object.keys(participants || []);
    if (participantsIds.length) {
      await this.deleteParticipantsProjects(participantsIds, id);
    }
  }

  openDeleteProjectDialog(project: Project): void {
    this._dialogService.open('ConfirmActionDialogComponent', {
      title: deleteItemTitle('project'),
      text: deleteItemText('project'),
      confirmBtnText: deleteConfirmBtnText,
      handleConfirm: () => {
        this._store$.dispatch(ProjectsActions.deleteProject({ project }));
      }
    });
  }

  async createProject(project: Project): Promise<void> {
    const timestamp = this._firestoreService.timestamp;
    const newProject = {
      ...project,
      date_created: timestamp
    };

    const projectId = await this._firestoreService.addDocument('/projects', newProject);

    const { leader_id, participants } = project || {};
    const participantsIds = Object.keys(participants || []);

    if (participantsIds.length) {
      for (const participantId of participantsIds) {
        await this._firestoreService.update(`users/${participantId}`, { projects: { [projectId]: 'participant' } });
      }
    }

    if (leader_id) {
      this._firestoreService.update(`users/${project.leader_id}`, { projects: { [projectId]: 'leader' } })
    }
  }

  async updateProject(previousProject: Project, project: Project): Promise<void> {
    const projectId = previousProject.id;
    const timestamp = this._firestoreService.timestamp;
    const updatedProject = {
      ...project,
      date_updated: timestamp
    };

    // it's necessary to remove all project nodes for user 
    if (previousProject.leader_id) {
      await this.deleteLeaderProject(previousProject.leader_id, projectId);
    }

    const participantsIds = Object.keys(previousProject.participants || []);
    if (participantsIds.length) {
      await this.deleteParticipantsProjects(participantsIds, projectId);
    }

    if (participantsIds.length) {
      for (const participantId of participantsIds) {
        await this._firestoreService.update(`users/${participantId}`, { projects: { [projectId]: 'participant' } });
      }
    }

    if (project.leader_id) {
      this._firestoreService.update(`users/${project.leader_id}`, { projects: { [projectId]: 'leader' } })
    }

    await this._firestoreService.updateDocument(`/projects/${projectId}`, updatedProject);
  }

  verifyProjectExists(projectId: string): Observable<boolean> {
    return this._firestoreService.getDocumentById('/projects', projectId)
      .pipe(map(project => !!project));
  }

  private async deleteLeaderProject(leader_id: string, projectId: string): Promise<void> {
    await this._firestoreService.update(`/users/${leader_id}`, {
      projects: {
        [projectId]: this._firestoreService.deleteField
      }
    });
  }

  private async deleteParticipantsProjects(
    participantsIds: string[],
    projectId: string
  ): Promise<void> {
    for (const participantId of participantsIds) {
      await this._firestoreService.update(`users/${participantId}`, {
        projects: {
          [projectId]: this._firestoreService.deleteField
        }
      });
    }
  }
}
