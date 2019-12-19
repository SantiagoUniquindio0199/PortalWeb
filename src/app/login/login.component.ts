import { Component, OnInit } from '@angular/core';
import {AuthService} from '../service/auth.service';
import swal from 'sweetalert2';
import {Router} from '@angular/router';
import {environment} from '../../environments/environment';
import {UserService} from '../service/user.service';
import {forEach} from '@angular/router/src/utils/collection';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  model: any = {};
  misUsers = null;
  constructor(private authService: AuthService, private userService: UserService, private router: Router) { }

  ngOnInit() {
  }
  login() {
      if (typeof this.model.pass == 'undefined' || typeof this.model.email == 'undefined'
          || this.model.email == '' || this.model.pass == '') {
          swal( 'ERROR', 'El correo o contraseña no fue ingresado', 'error');
      } else {
          this.authService.login(this.model.email, this.model.pass)
              .then(response => {
                  this.userService.getUsers().valueChanges().subscribe( usuarios => {
                      this.misUsers = usuarios;
                      let denegarAcceso = true;
                      this.misUsers.forEach( elem => {
                          if (elem.correo === this.model.email) {
                              denegarAcceso = false;
                              if ( elem.rol !== '' ) {
                                  localStorage.setItem('idAdmin', elem.id);
                                  localStorage.setItem('volver', 'true');
                                  this.router.navigateByUrl('principalAdmin');
                              } else {
                                  localStorage.setItem('id', elem.id);
                                  localStorage.setItem('volver', 'false');
                                  this.router.navigateByUrl('principalUser');
                              }
                          }
                      });
                      if (denegarAcceso === true) {
                          this.userService.removeAuthUser().then( res => {
                              swal('ERROR' , 'El usuario no existe', 'error');
                          });
                      }
                  });
              })
              .catch(error => {
                  console.log(error);
                  if ( error.code === 'auth/invalid-email' ) {
                      swal( 'ERROR' , 'El formato del email no es valido', 'warning');
                  }
                  if ( error.code === 'auth/user-not-found' ) {
                      swal( 'ERROR' ,  'El usuario no existe' ,  'error' );
                  }
                  if ( error.code === 'auth/wrong-password' ) {
                      swal( 'ERROR' , 'La contraseña no es válida', 'error');
                  }
              });
      }
  }
  cambiarPass() {
      if (typeof this.model.email == 'undefined' || this.model.email == '') {
          swal( 'ERROR', 'Debes ingresar el correo', 'error');
          this.router.navigateByUrl('../login');
      } else {
          if (typeof this.model.pass == 'undefined') {
              this.model.pass = '';
          }
          this.authService.login(this.model.email, this.model.pass)
              .then(response => {
                  this.authService.edtitPass(this.model.email)
                      .then(result => {
                          swal('Hecho', 'Enviamos un correo para que puedas hacer la modificacion de tu contraseña', 'info');
                      });
              })
              .catch(error => {
                  if ( error.code === 'auth/invalid-email' ) {
                      swal( 'ERROR' , 'El formato del email no es valido', 'warning');
                  }
                  if ( error.code === 'auth/wrong-password' || error.code === 'auth/user-not-found') {
                      this.authService.edtitPass(this.model.email)
                          .then(result => {
                              swal('Hecho', 'Enviamos un correo para que puedas hacer la modificacion de tu contraseña', 'info');
                          });
                  }
              });
      }
  }
}
