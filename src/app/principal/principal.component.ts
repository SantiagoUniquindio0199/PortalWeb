import { Component, OnInit } from '@angular/core';
import {ProdService} from '../service/prod.service';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent implements OnInit {
  productos = []
  constructor(private prodService: ProdService) { }

  ngOnInit() {
      this.cargarProductos();
  }
  cargarProductos() {
    this.prodService.getProds().valueChanges().subscribe(elem => {
      this.productos = elem;
    });
  }
  ver(index) {

  }
}
