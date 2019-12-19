import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {CliProdService} from '../service/cli-prod.service';
import swal from 'sweetalert2';
import {Router} from '@angular/router';
import {ProdService} from '../service/prod.service';
import {UserService} from '../service/user.service';

@Component({
  selector: 'app-pago-compra',
  templateUrl: './pago-compra.component.html',
  styleUrls: ['./pago-compra.component.css']
})
export class PagoCompraComponent implements OnInit {

  idUser = null;
  form: FormGroup;
  compra: any = {};
  prods = [];
  user = null;
  valor = 0;
  ite = -1;
  refe = 0;
  idProd = null;
  constructor(private cliProdService: CliProdService, private router: Router, private userService: UserService) {
    this.idUser = localStorage.getItem('id');
  }

  ngOnInit() {
      this.userService.getUser(this.idUser).valueChanges().subscribe( miUser => {
        this.user = miUser;
      });
      this.cliProdService.getProdsAgg().valueChanges().subscribe(res => {
          res.forEach(elem => {
              this.prods.push(elem);
              this.ite++;
              this.valor = this.valor + parseInt(this.prods[this.ite].precio, 10);
          });
      });
      this.refe = Math.floor(Math.random() * (99999999 - 10000000)) + 10000000;
      this.form = new FormGroup({
          'nombre': new FormControl(this.compra.nombre, [
              Validators.required
          ]),
          'numero': new FormControl(this.compra.numero, [
              Validators.required
          ]),
          'codigo': new FormControl(this.compra.codigo, [
              Validators.required
          ]),
          'fecha': new FormControl(this.compra.fecha, [
              Validators.required
          ]),
          'cuotas': new FormControl(this.compra.cuotas, [
              Validators.required
          ]),
          'cli': new FormControl(this.compra.cli, []),
          'pro': new FormControl(this.compra.pro, []),
          'pre': new FormControl(this.compra.pre, []),
          'numOrden': new FormControl(this.compra.numOrden, [])
      });
  }
  realizarPago() {
    for (let i = 0; i < this.prods.length; i++) {
        this.compra.id = Date.now();
        this.compra.pre = this.valor;
        this.compra.cli = this.user.documento;
        this.compra.pro = this.prods[i].referencia;
        this.compra.numOrden = this.refe;
        this.idProd = this.prods[i].id;
        this.cliProdService.comprarProducto(this.compra)
            .then( result => {
                swal('HECHO!' , 'Tu pago se ha realizado con exito', 'success');
                this.cliProdService.removeCarrito().then( r => {
                    this.router.navigateByUrl('principalUser');
                }).catch( err => {
                    swal('Oops!' , 'Ocurrio un error en el pago', 'error');
                });
            }).catch( err => {
              console.log(err);
                swal('Oops!' , 'Ocurrio un error en el pago', 'error');
        });
    }
  }
}
