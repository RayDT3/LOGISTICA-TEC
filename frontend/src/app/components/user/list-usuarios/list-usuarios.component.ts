import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { Users } from 'src/app/interfaces/users';
import { UsersService } from 'src/app/services/users.service';
import { ImpresionService } from 'src/app/shared/services/impresion.service';

@Component({
  selector: 'app-list-usuarios',
  templateUrl: './list-usuarios.component.html',
  styleUrls: ['./list-usuarios.component.css']
})
export class ListUsuariosComponent implements OnInit {

  listUsers: Users[] = []
  loading: boolean = false;

  constructor(
    private _usersService: UsersService,
    private toastr: ToastrService,
    private srvImpresion : ImpresionService,
    private http: HttpClient
  ) { }

  buscarUser = '';
  pageActual: number=1;

  ngOnInit(): void {
    this.getListUsers();
  }

  getListUsers() {
    this.loading = true;

    this._usersService.getListUsers().subscribe((data: Users[]) => {
      this.listUsers = data;
      this.loading = false;
    })
  }

  deleteUser(id: number) {
    this.loading = true;
    this._usersService.deleteUser(id).subscribe(() => {
      this.getListUsers();
      this.toastr.warning('El registro fue eliminado con exito', 'Registro eliminado');
    });
  }

  //obtengo los datos del API
  obtenerUsers(): Observable<any[]>{
    return this.http.get<any[]>
    ('http://localhost:3000/api/users');
  }

  onImprimir() {


    const encabezado = ['id', 'username'];

    // Realizar la solicitud HTTP para obtener los productos
    this.obtenerUsers().subscribe((users: any[]) => {
      // Ajustar la estructura de los datos para la tabla
      const cuerpo = users.map(user => [
        user.id,
        user.username,
        // product.price !== undefined ? product.price.toString() : '', // Verificar si precio es undefined
        // product.stock !== undefined ? product.stock.toString() : '' // Verificar si stock es undefined
      ]);

      // Llamar a la función imprimir del servicio ImpresionService
      this.srvImpresion.imprimir("users", encabezado, cuerpo, "Listado de usuarios", true);
    });
  }

}
