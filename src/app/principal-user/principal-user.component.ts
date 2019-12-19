import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {UserService} from '../service/user.service';
import {environment} from '../../environments/environment';
import {ProdService} from '../service/prod.service';

@Component({
  selector: 'app-principal-user',
  templateUrl: './principal-user.component.html',
  styleUrls: ['./principal-user.component.css']
})

export class PrincipalUserComponent implements OnInit {
  id = null;
  productos = []
  constructor(private prodService: ProdService ) {
    this.id = localStorage.getItem('id');
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
