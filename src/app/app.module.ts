import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import {RouterModule, Routes} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AuthService} from './service/auth.service';
import {AngularFireModule} from 'angularfire2';
import {environment} from '../environments/environment';
import {AngularFireAuthModule} from 'angularfire2/auth';
import { UserComponent } from './user/user.component';
import {UserService} from './service/user.service';
import {AngularFireDatabaseModule} from 'angularfire2/database';
import { DisableControlDirectiveDirective } from './directives/disable-control-directive.directive';
import { PrincipalUserComponent } from './principal-user/principal-user.component';
import { PrincipalAdminComponent } from './principal-admin/principal-admin.component';
import { ClientesAdmComponent } from './clientes-adm/clientes-adm.component';
import { ProductosAdmComponent } from './productos-adm/productos-adm.component';
import { RegProductoComponent } from './reg-producto/reg-producto.component';
import {ProdService} from './service/prod.service';
import { PrecioProductoComponent } from './precio-producto/precio-producto.component';
import { PrincipalComponent } from './principal/principal.component';
import { InfoProductoComponent } from './info-producto/info-producto.component';
import { CarritoComponent } from './carrito/carrito.component';
import {CliProdService} from './service/cli-prod.service';
import { ListaProductosComponent } from './lista-productos/lista-productos.component';
import { PagoCompraComponent } from './pago-compra/pago-compra.component';
import { ReporteVentaComponent } from './reporte-venta/reporte-venta.component';

const appRoutes: Routes = [
    {path: 'login', component: LoginComponent},
    {path: '', component: PrincipalComponent},
    {path: 'crearUsuario/:id/:lug', component: UserComponent },
    {path: 'principalUser', component: PrincipalUserComponent},
    {path: 'principalAdmin', component: PrincipalAdminComponent},
    {path: 'clientesAdm', component: ClientesAdmComponent},
    {path: 'productosAdm', component: ProductosAdmComponent},
    {path: 'registrarProducto/:id', component: RegProductoComponent},
    {path: 'preciosProducto', component: PrecioProductoComponent},
    {path: 'principal', component: PrincipalComponent},
    {path: 'infoProducto/:id/:lug', component: InfoProductoComponent},
    {path: 'carritoProd', component: CarritoComponent},
    {path: 'listaProd', component: ListaProductosComponent},
    {path: 'pago', component: PagoCompraComponent},
    {path: 'reporteVenta', component: ReporteVentaComponent}];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UserComponent,
    DisableControlDirectiveDirective,
    PrincipalUserComponent,
    PrincipalAdminComponent,
    ClientesAdmComponent,
    ProductosAdmComponent,
    RegProductoComponent,
    PrecioProductoComponent,
    PrincipalComponent,
    InfoProductoComponent,
    CarritoComponent,
    ListaProductosComponent,
    PagoCompraComponent,
    ReporteVentaComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
      ReactiveFormsModule,
    RouterModule.forRoot(appRoutes),
      AngularFireModule.initializeApp(environment.firebase),
      AngularFireAuthModule,
      AngularFireDatabaseModule
  ],
  providers: [AuthService, UserService, ProdService, CliProdService],
  bootstrap: [AppComponent]
})
export class AppModule { }
