import { HttpClient } from '@angular/common/http';
import { Component, OnInit} from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { Chef } from 'src/app/interfaces/chef';
import { ChefService } from 'src/app/services/chef.service';
import { ImpresionService } from 'src/app/shared/services/impresion.service';

@Component({
  selector: 'app-list-chef',
  templateUrl: './list-chef.component.html',
  styleUrls: ['./list-chef.component.css']
})
export class ListChefComponent implements OnInit{


  listChefs: Chef[] = []
  loading: boolean = false;

  constructor(
    private _chefService: ChefService,
    private toastr: ToastrService,
    private srvImpresion : ImpresionService,
    private http: HttpClient
    ) { }

  buscar = '';
  pageActual: number=1;

  ngOnInit(): void {
    this.getListChefs();
  }

  getListChefs() {
    this.loading = true;

    this._chefService.getListChefs().subscribe((data: Chef[]) => {
      this.listChefs = data;
      this.loading = false;
    })
  }

  deleteChef(id: number) {
    this.loading = true;
    this._chefService.deleteChef(id).subscribe(() => {
      this.getListChefs();
      this.toastr.warning('El docente fue eliminado con exito', 'Docente eliminado');
    })
  }

  //obtengo los datos del API
  obtenerChefs(): Observable<any[]>{
    return this.http.get<any[]>
    ('http://localhost:3000/api/chef');
  }

  onImprimir() {


    const encabezado = ['Nombre' , 'Apellido' , 'Telefono', 'DNI', 'Email'];

    // Realizar la solicitud HTTP para obtener los productos
    this.obtenerChefs().subscribe((chefs: any[]) => {
      // Ajustar la estructura de los datos para la tabla
      const cuerpo = chefs.map(chef => [
        chef.nombre,
        chef.apellido,
        chef.telefono,
        chef.dni,
        chef.email

        // product.price !== undefined ? product.price.toString() : '', // Verificar si precio es undefined
        // product.stock !== undefined ? product.stock.toString() : '' // Verificar si stock es undefined
      ]);

      // Llamar a la función imprimir del servicio ImpresionService
      this.srvImpresion.imprimir("chefs", encabezado, cuerpo, "Listado de chefs", true);
    });
  }


}
