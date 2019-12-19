import { Component, OnInit } from '@angular/core';
import {ProdService} from '../service/prod.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-precio-producto',
  templateUrl: './precio-producto.component.html',
  styleUrls: ['./precio-producto.component.css']
})
export class PrecioProductoComponent implements OnInit {
  idAdmin = null;
  producto: any = {}
    resultadoBusqueda = [];
    allProds = null;
  constructor(private prodService: ProdService) {}

  ngOnInit() {
      this.idAdmin = localStorage.getItem('idAdmin');
      this.cargarTabla();
  }
  guardar(index) {
      const pre = document.getElementsByName('pre');
      const can = document.getElementsByName('can');
      this.prodService.getProd(this.resultadoBusqueda[index].id).valueChanges()
          .subscribe(pro => {
              this.producto = pro;
              this.producto.precio = pre[index].innerText;
              this.producto.cantidad = can[index].innerText;
              this.prodService.guardarProd(this.producto).
                then( result => {
                  swal( '¡Hecho!', 'registro exitoso', 'success');
                  this.resultadoBusqueda = [];
                  this.cargarTabla();
                }).catch(error => {
                  swal( '¡ERROR!', 'Ocurrio un error en el registro', 'error');
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
}
