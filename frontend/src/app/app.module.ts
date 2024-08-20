import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// Modulos
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { NgxPaginationModule } from 'ngx-pagination';

// Componentes
import { NavbarComponent } from './components/navbar/navbar.component';
import { ProgressBarComponent } from './shared/progress-bar/progress-bar.component';
import { ListChefComponent } from './components/chef/list-chef/list-chef.component';
import { AddEditChefComponent } from './components/chef/add-edit-chef/add-edit-chef.component';
import { LoginComponent } from './components/user/login/login.component';
import { SingInComponent } from './components/user/sing-in/sing-in.component';
import { BusquedaPipe } from './pipes/busqueda.pipe';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ListDetalleComponent } from './components/detalleCompra/list-detalle/list-detalle.component';
import { AddEditDetalleComponent } from './components/detalleCompra/add-edit-detalle/add-edit-detalle.component';
import { ListUsuariosComponent } from './components/user/list-usuarios/list-usuarios.component';
import { ListCategoriaComponent } from './components/categoria/list-categoria/list-categoria.component';
import { AddEditCategoriaComponent } from './components/categoria/add-edit-categoria/add-edit-categoria.component';
import { ListAlmacenComponent } from './components/almacen/list-almacen/list-almacen.component';
import { AddEditAlmacenComponent } from './components/almacen/add-edit-almacen/add-edit-almacen.component';
import { BusquedausersPipe } from './pipes/busquedausers.pipe';
import { BusquedadetcomprasPipe } from './pipes/busquedadetcompras.pipe';
import { BusquedacategoriaPipe } from './pipes/busquedacategoria.pipe';
import { BusquedaproductosPipe } from './pipes/busquedaproductos.pipe';
import { ListRecetaComponent } from './components/receta/list-receta/list-receta.component';
import { DetalleRecetaComponent } from './components/receta/detalle-receta/detalle-receta.component';
import { ListPedidosComponent } from './components/pedidos/list-pedidos/list-pedidos.component';
import { AddEditPedidosComponent } from './components/pedidos/add-edit-pedidos/add-edit-pedidos.component';
import { AddEditRecetaComponent } from './components/receta/add-edit-receta/add-edit-receta.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ProgressBarComponent,
    ListChefComponent,
    AddEditChefComponent,
    LoginComponent,
    SingInComponent,
    BusquedaPipe,
    DashboardComponent,
    ListDetalleComponent,
    AddEditDetalleComponent,
    ListUsuariosComponent,
    ListCategoriaComponent,
    AddEditCategoriaComponent,
    ListAlmacenComponent,
    AddEditAlmacenComponent,
    BusquedausersPipe,
    BusquedadetcomprasPipe,
    BusquedacategoriaPipe,
    BusquedaproductosPipe,
    ListRecetaComponent,
    DetalleRecetaComponent,
    ListPedidosComponent,
    AddEditPedidosComponent,
    AddEditRecetaComponent
    ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxPaginationModule,
    FormsModule, // para nuestro login
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot({
      timeOut: 10000,
      positionClass: 'toast-bottom-right'
    }), // ToastrModule added
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
