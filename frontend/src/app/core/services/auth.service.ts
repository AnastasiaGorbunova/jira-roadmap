import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { User } from '@app/core/models/user.model';
import { FirestoreService } from '@app/core/services/firestore.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

constructor(
  private afAuth: AngularFireAuth,
  private firestoreService: FirestoreService
) { }

  // TODO: need to return user id
  async singUp(loginData: User): Promise<void> {
    console.log('singUp');

    try {
      const { email, password, first_name, last_name } = loginData;
      const userCredential = await this.afAuth.createUserWithEmailAndPassword(email, password);
      const userId = userCredential.user.uid;
      const newUser = { email, first_name, last_name, id: userId };
      console.log('userId', userId);
      console.log('newUser', newUser);
      await this.createUser(userId, newUser);
    } catch (error) {
      console.error(error);
      throw error;
    }
  } 

  // TODO: need to return user id
  async signIn(loginData: User): Promise<void> {
    console.log('signIn');
    
    try {
      const { email, password } = loginData;
      const userCredential = await this.afAuth.signInWithEmailAndPassword(email, password);
      console.log('SIGN IN userCredential: ', userCredential);
      const userId = userCredential.user.uid;
      console.log('SIGN IN userId: ', userId);
    } catch (error) {
      console.error(error);
      throw error;
    }
  } 


  async signOut(): Promise<void> {
    try {
      await this.afAuth.signOut();
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  // TODO: add type
  getFirebaseUser(): Observable<any> {
    return this.afAuth.user;
  }

  // TODO: move it to users service
  async createUser(userId: string, user: User): Promise<void> {
    await this.firestoreService.addDocumentWithId('/users', userId, user);
  }

  getCurrentUser(): Observable<User> {
    return this.getFirebaseUser().pipe(
      mergeMap((user) => {
        return this.firestoreService.getDocumentById('/users', user.uid) as Observable<User>;
      })
    )
  }
}
