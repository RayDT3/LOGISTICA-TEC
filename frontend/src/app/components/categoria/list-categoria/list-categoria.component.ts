import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { Categoria } from 'src/app/interfaces/categoria';
import { CategoriaService } from 'src/app/services/categoria.service';
import { ImpresionService } from 'src/app/shared/services/impresion.service';

@Component({
  selector: 'app-list-categoria',
  templateUrl: './list-categoria.component.html',
  styleUrls: ['./list-categoria.component.css']
})
export class ListCategoriaComponent implements OnInit {

  listCategorias: Categoria[] = []
  loading: boolean = false;

  constructor(
    private _categoriaService: CategoriaService,
    private toastr: ToastrService,
    private srvImpresion : ImpresionService,
    private http: HttpClient
  ) { }

  buscarCategoria = '';
  pageActual: number=1;

  ngOnInit(): void {
    this.getListCategorias();
  }

  getListCategorias() {
    this.loading = true;

    this._categoriaService.getListCategorias().subscribe((data: Categoria[]) => {
      this.listCategorias = data;
      this.loading = false;
    })
  }

  deleteCategoria(id: number) {
    this.loading = true;
    this._categoriaService.deleteCategoria(id).subscribe(() => {
      this.getListCategorias();
      this.toastr.warning('El docente fue eliminado con exito', 'Docente eliminado');
    })
  }

  //obtengo los datos del API
  obtenerCategorias(): Observable<any[]>{
    return this.http.get<any[]>
    ('http://localhost:3000/api/categoria');
  }

  onImprimir() {


    const encabezado = ['id', 'categoria'];

    // Realizar la solicitud HTTP para obtener los productos
    this.obtenerCategorias().subscribe((categorias: any[]) => {
      // Ajustar la estructura de los datos para la tabla
      const cuerpo = categorias.map(categoria => [
        categoria.id,
        categoria.categoria
        // product.price !== undefined ? product.price.toString() : '', // Verificar si precio es undefined
        // product.stock !== undefined ? product.stock.toString() : '' // Verificar si stock es undefined
      ]);

      // Llamar a la función imprimir del servicio ImpresionService
      this.srvImpresion.imprimir("categorias", encabezado, cuerpo, "Listado de categoria", true);
    });
  }

}
