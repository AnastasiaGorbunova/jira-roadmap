import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { mergeMap, take } from 'rxjs/operators';

import { User, UserAccess } from '@app/core/models/user.model';
import { FirestoreService } from '@app/core/services/firestore.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

constructor(
  private afAuth: AngularFireAuth,
  private firestoreService: FirestoreService
) { }

  async singUp(loginData: User): Promise<void> {

    try {
      const { email, password, first_name, last_name } = loginData;
      const userCredential = await this.afAuth.createUserWithEmailAndPassword(email, password);
      
      const userId = userCredential.user.uid;
      const newUser = { 
        email, 
        first_name, 
        last_name, 
        role: UserAccess.Basic
      };

      await this.createUser(userId, newUser);
    } catch (error) {
      console.error(error);
      throw error;
    }
  } 

  async signIn(loginData: User): Promise<void> {
    try {
      const { email, password } = loginData;
      await this.afAuth.signInWithEmailAndPassword(email, password);
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
        const userId = user?.uid;
        return this.firestoreService.getDocumentById('/users', user?.uid) as Observable<User>;
      })
    )
  }
}
