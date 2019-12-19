import { Injectable } from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database';

@Injectable()
export class ProdService {

  constructor(private db: AngularFireDatabase) { }

    public guardarProd(prod) {
        return this.db.database.ref('productos/' + prod.id).set(prod);
    }
    public getProds() {
        return this.db.list('productos/');
    }
    public getProd(id) {
        return this.db.object('productos/' + id);
    }
    public removeProd(id) {
        return this.db.object('productos/' + id).remove();
    }

}
