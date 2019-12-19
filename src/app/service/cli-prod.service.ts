import { Injectable } from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database';

@Injectable()
export class CliProdService {

  constructor(private db: AngularFireDatabase) { }
    public comprarProducto(prodCli) {
        return this.db.database.ref('prodCli/' + prodCli.id).set(prodCli);
    }
    public getProds() {
        return this.db.list('prodCli/');
    }
    public aggProd(prod) {
        return this.db.database.ref('carrito/' + prod.id).set(prod);
    }
    public getProdsAgg() {
        return this.db.list('carrito/');
    }
    public removeCarrito() {
        return this.db.database.ref('carrito/').remove();
    }
}
