import { Injectable } from '@angular/core';
import {AngularFireAuth} from 'angularfire2/auth';

@Injectable()
export class AuthService {

  constructor(private afAuth: AngularFireAuth) { }
  public login(email, pass) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, pass);
  }
  public edtitPass(email) {
    return this.afAuth.auth.sendPasswordResetEmail(email);
  }
}
