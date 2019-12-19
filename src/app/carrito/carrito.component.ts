import { Component, OnInit } from '@angular/core';
import {CliProdService} from '../service/cli-prod.service';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {
    idUser = null;
    products = null;
    productosCarrito = [];
    mensaje = true;
    constructor(private carService: CliProdService) {
        this.idUser = localStorage.getItem('id');
    }

    ngOnInit() {
        this.carService.getProdsAgg().valueChanges().subscribe(prods => {
            this.products = prods;
            this.products.forEach(el => {
                console.log(el);
                this.mensaje = false;
                this.productosCarrito.push(el);
            });
        });
    }
}
