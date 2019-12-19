import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../service/user.service';
import swal, {} from 'sweetalert2';
import {CliProdService} from '../service/cli-prod.service';

@Component({
  selector: 'app-clientes-adm',
  templateUrl: './clientes-adm.component.html',
  styleUrls: ['./clientes-adm.component.css']
})
export class ClientesAdmComponent implements OnInit {
    user: any = {};
    allUsers = null;
    resultadoBusqueda = [];
    registerForm: FormGroup;
    listo = false;
    idAdmin = null;
    userElim: any = {};
    usersComp: any = {};
    usuarios = null;
    constructor(private userService: UserService, private cliProdService: CliProdService ) {
        this.idAdmin = localStorage.getItem('idAdmin');
        this.userService.getUsers().valueChanges()
            .subscribe( res => {
                this.allUsers = res;
                this.allUsers.forEach( el => {
                    if (el.rol === '') {
                        this.resultadoBusqueda.push(el);
                    }
                });
            });
    }

  ngOnInit() {
      this.registerForm = new FormGroup({
          'nombre': new FormControl(this.user.nombre, []),
          'tipo': new FormControl(this.user.tipo, []),
          'documento': new FormControl(this.user.documento, []),
          'telResidencia': new FormControl(this.user.telResidencia, []),
          'telCelular': new FormControl(this.user.telCelular, []),
          'direccion': new FormControl(this.user.direccion, []),
          'ciudad': new FormControl(this.user.ciudad, []),
          'departamento': new FormControl(this.user.departamento, []),
          'pais': new FormControl(this.user.pais, []),
          'profesion': new FormControl(this.user.profesion, []),
          'correo': new FormControl(this.user.correo, []),
          'contrasena': new FormControl(this.user.contrasena, []),
          'persona': new FormControl(this.user.persona, []),
          'nit': new FormControl(this.user.nit, [])
      });
  }
    buscar() {
        this.resultadoBusqueda = [];
        this.userService.getUsers().valueChanges()
            .subscribe(users => {
                this.allUsers.forEach( elem => {
                    if ( (elem.nombre === this.user.nombre || elem.tipo === this.user.tipo ||
                        elem.documento === this.user.documento || elem.telResidencia === this.user.telResidencia ||
                        elem.telCelular === this.user.telCelular || elem.direccion === this.user.direccion ||
                        elem.ciudad === this.user.ciudad || elem.departamento === this.user.departamento ||
                        elem.pais === this.user.pais || elem.profesion === this.user.profesion || elem.nit === this.user.nit ||
                        elem.correo === this.user.correo || elem.persona === this.user.persona) && elem.rol === '') {
                            this.resultadoBusqueda.push(elem);
                    }
                });
        });
    }
    eliminar(index) {
        this.userService.getUser(this.resultadoBusqueda[index].id).valueChanges().subscribe( produc => {
            this.userElim = produc;
            this.cliProdService.getProds().valueChanges().subscribe( comp => {
                this.usersComp = comp;
                this.usersComp.forEach( el => {
                    if (this.userElim.documento == el.cli) {
                        swal('ERROR', 'El cliente que intenta eliminar ya ha realizado compras', 'error');
                    } else {
                        swal({
                            title: '¿Seguro?',
                            text: '¿Deseas eliminar el contacto seleccionado?',
                            type: 'warning',
                            cancelButtonText: 'No',
                            confirmButtonText: 'Si',
                            confirmButtonColor: '#0072af',
                            showCancelButton: true,
                            showConfirmButton: true
                        }).then(isConfirm => {
                            if (isConfirm.value === true) {
                                this.userService.removeUser(this.resultadoBusqueda[index].id).then(res => {
                                    this.resultadoBusqueda.splice(index, 1);
                                    this.resultadoBusqueda = [];
                                    this.cargarTabla();
                                    swal('Hecho', 'El usuario fue eliminado correctamente', 'success');
                                }).catch(err => {
                                    console.log(err);
                                });
                            }
                        });
                    }
                });
            });
        });
    }
    cargarTabla() {
        this.userService.getUsers().valueChanges()
            .subscribe( res => {
                this.usuarios = res;
                this.usuarios.forEach( el => {
                    this.resultadoBusqueda.push(el);
                });
            });
    }
    habilitarNit() {
        if (this.user.persona === 'Juridica') {
            this.listo = true;
        } else {
            this.listo = false;
        }
    }
}
