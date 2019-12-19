import { Component, OnInit } from '@angular/core';
import {CliProdService} from '../service/cli-prod.service';
import {el} from '@angular/platform-browser/testing/src/browser_util';

@Component({
  selector: 'app-lista-productos',
  templateUrl: './lista-productos.component.html',
  styleUrls: ['./lista-productos.component.css']
})
export class ListaProductosComponent implements OnInit {
  idUser = null;
  prods = [];
  valor = 0;
  ite = -1;
  constructor(private cliProdService: CliProdService) {
    this.idUser = localStorage.getItem('id');
  }

  ngOnInit() {
    this.cliProdService.getProdsAgg().valueChanges().subscribe( res => {
      res.forEach(elem => {
        this.prods.push(elem);
        this.ite++;
          this.valor = this.valor + parseInt(this.prods[this.ite].precio, 10);
      });
    });
  }
}
