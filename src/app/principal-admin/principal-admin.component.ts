import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {ClientesAdmComponent} from '../clientes-adm/clientes-adm.component';
import {ProductosAdmComponent} from '../productos-adm/productos-adm.component';
import {RegProductoComponent} from '../reg-producto/reg-producto.component';
import {Router} from '@angular/router';
import {ProdService} from '../service/prod.service';

@Component({
  selector: 'app-principal-admin',
  templateUrl: './principal-admin.component.html',
  styleUrls: ['./principal-admin.component.css']
})
export class PrincipalAdminComponent implements OnInit {
  idAdmin = null;
    productos = []
  constructor(private prodService: ProdService ) {
    this.idAdmin = localStorage.getItem('idAdmin');
  }

  ngOnInit() {
      this.cargarProductos();
  }
    cargarProductos() {
        this.prodService.getProds().valueChanges().subscribe(elem => {
            this.productos = elem;
        });
    }
}
