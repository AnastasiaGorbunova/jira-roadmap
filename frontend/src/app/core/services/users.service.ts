import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';

import { User } from '@app/core/models/user.model';
import { FirestoreService } from './firestore.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(
    private _firestoreService: FirestoreService,
    private _afAuth: AngularFireAuth
  ) { }

  getUsers(): Observable<User[]> {
    return this._firestoreService.getCollection<User>('/users');
  }

  async createUser(userId: string, user: User): Promise<void> {
    await this._firestoreService.addDocumentWithId('/users', userId, user);
  }

  getCurrentUser(): Observable<User> {
    return this.getFirebaseUser().pipe(
      mergeMap((user) => {
        const userId = user?.uid;
        return this._firestoreService.getDocumentById('/users', userId) as Observable<User>;
      })
    )
  }

  getFirebaseUser(): Observable<any> {
    return this._afAuth.user;
  }
}
