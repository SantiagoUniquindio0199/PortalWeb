import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {ProdService} from '../service/prod.service';
import swal from 'sweetalert2';
import {CliProdService} from '../service/cli-prod.service';

@Component({
  selector: 'app-productos-adm',
  templateUrl: './productos-adm.component.html',
  styleUrls: ['./productos-adm.component.css']
})
export class ProductosAdmComponent implements OnInit {
    prod: any = {};
    regForm: FormGroup;
    resultadoBusqueda = [];
    allProds = null;
    idAdmin = null;
    productoElim: any = {};
    productosCompra: any = {};
  constructor(private prodService: ProdService, private cliProdService: CliProdService ) {
      this.idAdmin = localStorage.getItem('idAdmin');
      this.cargarTabla();
  }
  ngOnInit() {
      this.regForm = new FormGroup({
          'nombre': new FormControl(this.prod.nombre, []),
          'referencia': new FormControl(this.prod.referencia, []),
          'tipo': new FormControl(this.prod.tipo, [])
      });
  }

  buscar() {
      this.resultadoBusqueda = [];
      this.prodService.getProds().valueChanges()
          .subscribe(prods => {
              this.allProds.forEach( elem => {
                  if ( (elem.nombre === this.prod.nombre || elem.tipo === this.prod.tipo || elem.referencia === this.prod.referencia)) {
                      this.resultadoBusqueda.push(elem);
                  }
              });
          });
  }
    eliminar(index) {
        this.prodService.getProd(this.resultadoBusqueda[index].id).valueChanges().subscribe( produc => {
            this.productoElim = produc;
            this.cliProdService.getProds().valueChanges().subscribe( prods => {
                this.productosCompra = prods;
                this.productosCompra.forEach( el => {
                    if (this.productoElim.referencia == el.pro) {
                        swal('ERROR', 'El producto que intenta eliminar fue comprado por un cliente ', 'error');
                    } else {
                        swal({
                            title: '¿Seguro?',
                            text: '¿Deseas eliminar el producto seleccionado?',
                            type: 'warning',
                            cancelButtonText: 'No',
                            confirmButtonText: 'Si',
                            confirmButtonColor: '#0072af',
                            showCancelButton: true,
                            showConfirmButton: true
                        }).then(isConfirm => {
                            if (isConfirm.value === true) {
                                this.prodService.removeProd(this.resultadoBusqueda[index].id).then(res => {
                                    this.resultadoBusqueda.splice(index, 1);
                                    this.resultadoBusqueda = [];
                                    this.cargarTabla();
                                    swal('Hecho', 'El producto fue eliminado correctamente', 'success');
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
        this.prodService.getProds().valueChanges()
            .subscribe( res => {
                this.allProds = res;
                this.allProds.forEach( el => {
                    this.resultadoBusqueda.push(el);
                });
            });
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
}
