import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

import { UserAccess, UserAuthData } from '@app/core/models/user.model';
import { UsersService } from './users.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

constructor(
  private _afAuth: AngularFireAuth,
  private _usersService: UsersService
) { }

  async singUp(loginData: UserAuthData): Promise<void> {

    try {
      const { email, password, first_name, last_name } = loginData;
      const userCredential = await this._afAuth.createUserWithEmailAndPassword(email, password);
      
      const userId = userCredential.user.uid;
      const newUser = { 
        email, 
        first_name, 
        last_name, 
        role: UserAccess.Basic
      };

      await this._usersService.createUser(userId, newUser);
    } catch (error) {
      console.error(error);
      throw error;
    }
  } 

  async signIn(loginData: UserAuthData): Promise<void> {
    try {
      const { email, password } = loginData;
      await this._afAuth.signInWithEmailAndPassword(email, password);
    } catch (error) {
      console.error(error);
      throw error;
    }
  } 

  async signOut(): Promise<void> {
    try {
      await this._afAuth.signOut();
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
