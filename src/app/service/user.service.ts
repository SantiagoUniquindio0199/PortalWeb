import { Injectable } from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database';
import {AngularFireAuth} from 'angularfire2/auth';

@Injectable()
export class UserService {

  constructor(private db: AngularFireDatabase, private afAuth: AngularFireAuth) {}

  public crearUsuarioLogin(email, pass) {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, pass);
  }
  public guardarUser(user) {
     return this.db.database.ref('users/' + user.id).set(user);
  }
  public getUsers() {
    return this.db.list('users/');
  }
  public getUser(id) {
    return this.db.object('users/' + id);
  }
  public removeUser(id) {
    return this.db.object('users/' + id).remove();
  }
  public removeAuthUser() {
      return this.afAuth.auth.currentUser.delete();
  }
}
