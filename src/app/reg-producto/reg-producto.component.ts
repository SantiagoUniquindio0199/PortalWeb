import {ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import swal from 'sweetalert2';
import {ProdService} from '../service/prod.service';
import {ChangeDetectionPerfRecord} from '@angular/platform-browser/src/browser/tools/common_tools';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-reg-producto',
  templateUrl: './reg-producto.component.html',
  styleUrls: ['./reg-producto.component.css']
})
export class RegProductoComponent implements OnInit {
  prod: any = {};
  regForm: FormGroup;
  producto = null;
  id = null;
  docUpdate = null;
  idAdmin = null;
  url = '../../assets/default.jpg';
  constructor(private router: Router, private routerUrl: ActivatedRoute, private prodService: ProdService) {
      this.idAdmin = localStorage.getItem('idAdmin');
      this.id = this.routerUrl.snapshot.params['id'];
  }

  ngOnInit() {
      if (this.id !== 'new') {
          this.prodService.getProd(this.id).valueChanges()
              .subscribe(producto => {
                  this.prod = producto;
                  this.url = this.prod.foto;
                  this.docUpdate = this.prod.referencia;
              }, error2 => {
                  console.log(error2);
              });
      }
    this.regForm = new FormGroup({
        'nombre': new FormControl(this.prod.nombre, [
            Validators.required
        ]),
        'referencia': new FormControl(this.prod.referencia, [
            Validators.required
        ]),
        'tipo': new FormControl(this.prod.tipo, [
            Validators.required
        ]),
        'descripcion': new FormControl(this.prod.descripcion, [
            Validators.required
        ]),
        'material': new FormControl(this.prod.material, [
            Validators.required
        ]),
        'color': new FormControl(this.prod.color, [
            Validators.required
        ]),
        'alto': new FormControl(this.prod.alto, [
            Validators.required,
            Validators.pattern('[0-9]*')
        ]),
        'ancho': new FormControl(this.prod.ancho, [
            Validators.required,
            Validators.pattern('[0-9]*')
        ]),
        'profundidad': new FormControl(this.prod.profundidad, [
            Validators.required,
            Validators.pattern('[0-9]*')
        ]),
        'peso': new FormControl(this.prod.peso, [
            Validators.required,
            Validators.pattern('[0-9]*')
        ]),
        'foto': new FormControl(this.prod.foto, []),
        'precio': new FormControl(this.prod.precio, []),
        'cantidad': new FormControl(this.prod.cantidad, [])
    });
  }

    acep() {
        let reinicio = 0;
        if (typeof this.prod.descripcion == 'undefined') {
            this.prod.descripcion = '';
        }
        if (typeof this.prod.material == 'undefined') {
            this.prod.material = '';
        }
        if (typeof this.prod.color == 'undefined') {
            this.prod.color = '';
        }
        if (typeof this.prod.precio == 'undefined') {
            this.prod.precio = '';
        }
        if (typeof this.prod.cantidad == 'undefined') {
            this.prod.cantidad = '';
        }
        this.prodService.getProds().valueChanges()
            .subscribe(productos => {
                this.producto = productos;
                if (reinicio < 2) {
                    this.producto.forEach( elem => {
                        if (this.id === 'new') {
                            if (elem.referencia === this.prod.referencia ) {
                                swal('ERROR', 'La referencia ingresada ya se encuentra registrada', 'error');
                                reinicio = 1;
                            }
                        } else {
                            if (elem.referencia === this.prod.referencia && elem.referencia !== this.docUpdate) {
                                swal('ERROR', 'La referencia ingresada ya se encuentra registrada', 'error');
                                reinicio = 1;
                            }
                        }
                    });
                }
                if (reinicio === 0) {
                    if (this.id === 'new') {
                        this.crearProd();
                        reinicio = 2;
                    } else {
                        this.actualizarProd();
                        reinicio = 2;
                    }
                }
            }, error => {
                console.log(error);
            });
    }
    crearProd() {
        this.prod.id = Date.now();
        this.prod.precio = 0;
        this.prod.cantidad = 0;
        if (typeof this.prod.foto == 'undefined') {
           this.prod.foto = '../../assets/default.jpg';
        }
        this.prodService.guardarProd(this.prod)
            .then(response => {
                swal('Hecho', 'El producto fue registrado', 'success');
                this.router.navigateByUrl('principalAdmin');
                // this.nombre.setValue('');
                // this.referencia.setValue('');
                // this.tipo.setValue('');
                // this.descripcion.setValue('');
                // this.material.setValue('');
                // this.color.setValue('');
                // this.peso.setValue('');
                // this.alto.setValue('');
                // this.ancho.setValue('');
                // this.profundidad.setValue('');
                // this.url = '../../assets/default.jpg';
                // this.foto.setValue('');
            })
            .catch(error => {
                console.log('Error al crear el producto');
            });
    }
    actualizarProd() {
        this.prodService.guardarProd(this.prod)
            .then(result => {
                swal( '¡Hecho!', 'EL producto se actualizo', 'success');
                this.router.navigateByUrl('principalAdmin');
            })
            .catch(er => {
                console.log('Error al actualizar el producto');
            });
    }
    readUrl(event: any) {
        if (event.target.files && event.target.files[0]) {
            const reader = new FileReader();
            reader.onload = (ev: any) => {
                this.url = ev.target.result;
                this.prod.foto = ev.target.result;
            };
            reader.readAsDataURL(event.target.files[0]);
        }
    }
  get nombre() {
    return this.regForm.get('nombre');
  }
  get referencia() {
    return this.regForm.get('referencia');
  }
  get tipo() {
    return this.regForm.get('tipo');
  }
  get material() {
    return this.regForm.get('material');
  }
  get color() {
    return this.regForm.get('color');
  }
  get descripcion() {
    return this.regForm.get('descripcion');
  }
  get alto() {
    return this.regForm.get('alto');
  }
  get ancho() {
    return this.regForm.get('ancho');
  }
  get profundidad() {
    return this.regForm.get('profundidad');
  }
  get peso() {
    return this.regForm.get('peso');
  }
  get foto() {
      return this.regForm.get('foto');
  }
}
