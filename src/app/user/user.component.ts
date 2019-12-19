import { Component, OnInit } from '@angular/core';
import {UserService} from '../service/user.service';
import swal from 'sweetalert2';
import {FormControl, FormGroup, PatternValidator, Validators} from '@angular/forms';
import * as firebase from 'firebase/app';
import {forEach} from '@angular/router/src/utils/collection';
import {ActivatedRoute, Router} from '@angular/router';
import {environment} from '../../environments/environment';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  user: any = {};
  registerForm: FormGroup;
  minLengthPass = 6;
  listo = false;
  usuario = null;
  id: any = {};
  docUpdate = null;
  bloquear = true; //Atributo para saber cuando bloqueo el email y pass
  msgError = 'Hubo un error al obtener los datos';
  idAdmin = null;
  lug = null;
  menu = false;
  constructor(private userService: UserService, private routerUrl: ActivatedRoute, private router: Router) {
      this.lug = this.routerUrl.snapshot.params['lug'];
      this.idAdmin = localStorage.getItem('idAdmin');
      this.id = this.routerUrl.snapshot.params['id'];
      if (this.lug == 1) {
          this.menu = false;
      } else if (this.lug == 2) {
          this.menu = true;
      }
  }
  ngOnInit() {
      if (this.id !== 'new') {
          this.bloquear = true;
          this.userService.getUser(this.id).valueChanges()
              .subscribe(cliente => {
                  this.user = cliente;
                  this.docUpdate = this.user.documento;
              }, error2 => {
                  console.log(error2);
              });
      } else {
          this.bloquear = false;
      }
      this.registerForm = new FormGroup({
       'nombre': new FormControl(this.user.nombre, [
           Validators.required
       ]),
        'tipo': new FormControl(this.user.tipo, [
            Validators.required
        ]),
        'documento': new FormControl(this.user.documento, [
            Validators.required,
            Validators.pattern('[0-9]*')
        ]),
        'telResidencia': new FormControl(this.user.telResidencia, [
            Validators.required,
            Validators.pattern('[0-9]*')
        ]),
        'telCelular': new FormControl(this.user.telCelular, [
            Validators.pattern('[0-9]*')
        ]),
        'direccion': new FormControl(this.user.direccion, [
            Validators.required
        ]),
        'ciudad': new FormControl(this.user.ciudad, [
            Validators.required,
            Validators.pattern('[a-zA-Z]*')
        ]),
        'departamento': new FormControl(this.user.departamento, [
            Validators.required,
            Validators.pattern('[a-zA-Z]*')
        ]),
        'pais': new FormControl(this.user.pais, [
            Validators.required,
            Validators.pattern('[a-zA-Z]*')
        ]),
        'profesion': new FormControl(this.user.profesion, [
            Validators.pattern('[a-zA-Z]*')
        ]),
        'correo': new FormControl(this.user.correo, [
            Validators.required,
            Validators.email
        ]),
        'contrasena': new FormControl(this.user.contrasena, [
            Validators.required,
            Validators.minLength(this.minLengthPass)
        ]),
        'persona': new FormControl(this.user.persona, [
            Validators.required
        ]),
        'nit': new FormControl(this.user.nit, [
            Validators.required,
            Validators.pattern('[0-9]*')
        ]),
          'rol': new FormControl(this.user.rol, [])
    });
  }
  aceptar() {
      let reinicio = 0;
      if (typeof this.user.telCelular == 'undefined') {
          this.user.telCelular = '';
      }
      if (typeof this.user.profesion == 'undefined') {
          this.user.profesion = '';
      }
      if (typeof this.user.nit == 'undefined') {
          this.user.nit = '';
      }
      if (typeof this.user.rol == 'undefined') {
          this.user.rol = '';
      }
      this.userService.getUsers().valueChanges()
          .subscribe(usuarios => {
                  this.usuario = usuarios;
                  if (reinicio < 2) {
                      this.usuario.forEach( elem => {
                          if (this.id === 'new') {
                              if (elem.documento === this.user.documento ) {
                                  swal('ERROR', 'El documento ingresado ya se encuentra registrado', 'error');
                                  reinicio = 1;
                              }
                              if (elem.correo === this.user.correo) {
                                  swal('ERROR', 'El correo ingresado ya se encuentra registrado', 'error');
                                  reinicio = 1;
                              }
                          } else {
                              if (elem.documento === this.user.documento && elem.documento !== this.docUpdate) {
                                  swal('ERROR', 'El documento ingresado ya se encuentra registrado', 'error');
                                  reinicio = 1;
                              }
                          }
                      });
                  }
                  if (reinicio === 0) {
                      if (this.id === 'new') {
                          this.crearUser();
                          reinicio = 2;
                      } else {
                          this.actualizarUser();
                          reinicio = 2;
                      }
                  }
          }, error => {
              this.msgError = error;
              console.log(this.msgError);
          });
  }
  crearUser() {
      this.user.id = Date.now();
      this.userService.crearUsuarioLogin(this.user.correo, this.user.contrasena)
          .then(result => {
              this.userService.guardarUser(this.user)
                  .then(response => {
                      swal('¡Bienvenido!', 'El usuario fue creado exitosamente', 'success');
                      this.router.navigateByUrl('principalUser');
                  })
                  .catch(error => {
                      console.log('Error al crear el usuario');
                  });
          })
          .catch(err => {
              console.log(err.code);
              if (err.code === 'auth/invalid-email') {
                  swal( 'ERROR' , 'El formato del correo no es valido,' +
                      ' debe ser como se muestra en el campo de texto', 'error');
              }
              if (err.code === 'auth/email-already-in-use') {
                  swal('ERROR', 'El correo ingresado ya se encuentra registrado', 'error');
              }
              console.log('Ocurrio un error al intentar guardar el usuario');
          });
  }
  actualizarUser() {
      this.userService.guardarUser(this.user)
          .then(result => {
              swal( '¡Hecho!', 'Tus datos se actualizaron con exito', 'success');
              this.router.navigateByUrl('principalUser');
          })
          .catch(er => {
              console.log('Error al actualizar el usuario');
          });
  }
  volver() {
      if (this.id === 'new') {
          this.router.navigateByUrl('login');
      } else {
          this.bloquear = true;
          const vol = localStorage.getItem('volver');
          if (vol === 'true') {
              this.router.navigateByUrl('principalAdmin');
          } else {
              this.router.navigateByUrl('principalUser');
          }
      }
  }
    habilitarNit() {
        if (this.user.persona === 'Juridica') {
            this.listo = true;
        } else {
            this.listo = false;
        }
    }

  get nombre() {
    return this.registerForm.get('nombre');
  }
  get tipo() {
    return this.registerForm.get('tipo');
  }
  get documento() {
    return this.registerForm.get('documento');
  }
  get telResidencia() {
    return this.registerForm.get('telResidencia');
  }
  get telCelular() {
    return this.registerForm.get('telCelular');
  }
  get direccion() {
    return this.registerForm.get('direccion');
  }
  get departamento() {
    return this.registerForm.get('departamento');
  }
  get ciudad() {
    return this.registerForm.get('ciudad');
  }
  get pais() {
    return this.registerForm.get('pais');
  }
  get profesion() {
    return this.registerForm.get('profesion');
  }
  get correo() {
    return this.registerForm.get('correo');
  }
  get contrasena() {
    return this.registerForm.get('contrasena');
  }
  get persona() {
    return this.registerForm.get('persona');
  }
  get nit() {
    return this.registerForm.get('nit');
  }
}
