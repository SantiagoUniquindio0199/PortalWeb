import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reporte-venta',
  templateUrl: './reporte-venta.component.html',
  styleUrls: ['./reporte-venta.component.css']
})
export class ReporteVentaComponent implements OnInit {

  idAdmin = null;
  constructor() {
    this.idAdmin = localStorage.getItem('idAdmin');
  }

  ngOnInit() {
  }

}
