import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { User } from '@app/core/models/user.model';
import { FirestoreService } from './firestore.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(
    private _firestoreService: FirestoreService
  ) { }

  getUsers(): Observable<User[]> {
    return this._firestoreService.getCollection<User>('/users');
  }
}
