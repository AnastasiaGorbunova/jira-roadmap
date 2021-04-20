import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { FirestoreService } from './firestore.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

constructor(
  private afAuth: AngularFireAuth,
  private firestoreService: FirestoreService
) { }

  async singUp(loginData: User): Promise<any> {
    try {
      const { email, password, first_name, last_name } = loginData;
      const userCredential = await this.afAuth.createUserWithEmailAndPassword(email, password);
      const userId = userCredential.user.uid;
      const newUser = { email, first_name, last_name, id: userId };
      console.log('userId', userId);
      console.log('newUser', newUser);
      
      await this.firestoreService.addDocumentWithId('/users', userId, newUser);

      // TODO: set currentUser data on logIn/signUp success
      return newUser;
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
  firebaseUser(): Observable<any> {
      return this.afAuth.user;
    }
  }

