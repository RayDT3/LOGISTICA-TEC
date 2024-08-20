import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Componentes

import { ListChefComponent } from './components/chef/list-chef/list-chef.component';
import { AddEditChefComponent } from './components/chef/add-edit-chef/add-edit-chef.component';
import { LoginComponent } from './components/user/login/login.component';
import { SingInComponent } from './components/user/sing-in/sing-in.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AuthGuard } from './utils/auth.guard';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ListDetalleComponent } from './components/detalleCompra/list-detalle/list-detalle.component';
import { AddEditDetalleComponent } from './components/detalleCompra/add-edit-detalle/add-edit-detalle.component';
import { ListUsuariosComponent } from './components/user/list-usuarios/list-usuarios.component';
import { ListCategoriaComponent } from './components/categoria/list-categoria/list-categoria.component';
import { AddEditCategoriaComponent } from './components/categoria/add-edit-categoria/add-edit-categoria.component';
import { ListAlmacenComponent } from './components/almacen/list-almacen/list-almacen.component';
import { AddEditAlmacenComponent } from './components/almacen/add-edit-almacen/add-edit-almacen.component';
import { ListRecetaComponent } from './components/receta/list-receta/list-receta.component';
import { DetalleRecetaComponent } from './components/receta/detalle-receta/detalle-receta.component';
import { ListPedidosComponent } from './components/pedidos/list-pedidos/list-pedidos.component';
import { AddEditPedidosComponent } from './components/pedidos/add-edit-pedidos/add-edit-pedidos.component';
import { AddEditRecetaComponent } from './components/receta/add-edit-receta/add-edit-receta.component';

const routes: Routes = [

  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },


  { path: '', component: DashboardComponent,canActivate: [AuthGuard], children:[

    { path: 'users', component: ListUsuariosComponent},
    { path: 'users/singIn', component: SingInComponent},

    { path: 'recetas', component: ListRecetaComponent },
    { path: 'receta/add', component: AddEditRecetaComponent },
    { path: 'receta/edit/:id', component: AddEditRecetaComponent },

    { path: 'elaborarPedido', component: ListPedidosComponent},
    { path: 'elaborarPedido/add', component: AddEditPedidosComponent},
    { path: 'elaborarPedido/edit/:id', component: AddEditPedidosComponent},

    { path: 'chefs', component: ListChefComponent},
    { path: 'chef/add', component: AddEditChefComponent},
    { path: 'chef/edit/:id', component: AddEditChefComponent},

    { path: 'detalleCompras', component: ListDetalleComponent},
    { path: 'detalleCompras/add', component: AddEditDetalleComponent},
    { path: 'detalleCompras/edit/:id', component: AddEditDetalleComponent},

    { path: 'categoria', component: ListCategoriaComponent},
    { path: 'categoria/add', component: AddEditCategoriaComponent},
    { path: 'categoria/edit/:id', component: AddEditCategoriaComponent},

    { path: 'almacenes', component: ListAlmacenComponent },
    { path: 'almacenes/add', component: AddEditAlmacenComponent },
    { path: 'almacenes/edit/:id', component: AddEditAlmacenComponent },

    { path: 'receta', component: ListRecetaComponent },
    { path: 'almacenes/add', component: AddEditAlmacenComponent },
    { path: 'almacenes/edit/:id', component: AddEditAlmacenComponent },

    { path: 'detalleReceta', component: DetalleRecetaComponent },
    { path: 'almacenes/add', component: AddEditAlmacenComponent },
    { path: 'almacenes/edit/:id', component: AddEditAlmacenComponent },

    { path: '**', component: NavbarComponent},

  ]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
