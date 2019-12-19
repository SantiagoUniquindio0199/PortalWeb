import { Component, OnInit } from '@angular/core';
import {ProdService} from '../service/prod.service';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {CliProdService} from '../service/cli-prod.service';

@Component({
  selector: 'app-info-producto',
  templateUrl: './info-producto.component.html',
  styleUrls: ['./info-producto.component.css']
})
export class InfoProductoComponent implements OnInit {
  id = null;
  idUser = null;
  prod = null;
  miFoto = null;
  lug = null;
  menu = false;
  prodCarrito = null;
  constructor(private prodService: ProdService, private routerUrl: ActivatedRoute, private router: Router, private car: CliProdService) {
      this.idUser = localStorage.getItem('id');
      this.id = this.routerUrl.snapshot.params['id'];
      this.lug = this.routerUrl.snapshot.params['lug'];
  }

  ngOnInit() {
      if (this.lug == 1) {
          this.menu = false;
      } else {
        this.menu = true;
      }
      this.cargarDatos();
  }
  cargarDatos() {
      this.prodService.getProd(this.id).valueChanges()
          .subscribe(producto => {
              this.prod = producto;
              document.getElementById('nombre').innerText = this.prod.nombre;
              document.getElementById('referencia').innerText = this.prod.referencia;
              document.getElementById('tipo').innerText = this.prod.tipo;
              document.getElementById('descripcion').innerText = this.prod.descripcion;
              document.getElementById('material').innerText = this.prod.material;
              document.getElementById('color').innerText = this.prod.color;
              document.getElementById('peso').innerText = this.prod.peso;
              document.getElementById('alto').innerText = this.prod.alto;
              document.getElementById('ancho').innerText = this.prod.ancho;
              document.getElementById('profundidad').innerText = this.prod.profundidad;
              this.miFoto = this.prod.foto;
          }, error2 => {
              console.log(error2);
          });
  }
  agg() {
      if (this.lug == 1) {
          this.router.navigateByUrl('login');
      } else {
          this.prodCarrito = this.prod
          this.car.aggProd(this.prodCarrito).then( result => {
              this.router.navigateByUrl('carritoProd');
            }).catch( err => {
                console.log(err);
            });
      }
  }
}
