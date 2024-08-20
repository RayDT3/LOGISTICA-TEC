import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Almacen } from 'src/app/interfaces/almacen';
import { DetalleReceta } from 'src/app/interfaces/detalleReceta';
import { Receta } from 'src/app/interfaces/receta';
import { Ingrediente } from 'src/app/interfaces/ingrediente';
import { AlmacenService } from 'src/app/services/almacen.service';
import { DetalleRecetaService } from 'src/app/services/detalle-receta.service';
import { IngredienteService } from 'src/app/services/ingrediente.service';
import { RecetaService } from 'src/app/services/receta.service';
import { ImpresionService } from 'src/app/shared/services/impresion.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-list-receta',
  templateUrl: './list-receta.component.html',
  styleUrls: ['./list-receta.component.css']
})
export class ListRecetaComponent implements OnInit {

  listRecetas: Receta[] = [];
  listAlmacen: Almacen[] = [];
  listDetalleRecetas: DetalleReceta[] = [];
  ingredientesCache: { [key: number]: string } = {}; // Cache for ingredient names
  loading: boolean = false;

  selectedReceta: number | null = null;
  selectedRecetaNombre: string = '';
  selectedDetalleRecetas: DetalleReceta[] = [];

  constructor(
    private _recetaService: RecetaService,
    private _detalleRecetaService: DetalleRecetaService,
    private _ingredienteService: IngredienteService,
    private _almacenService: AlmacenService,
    private toastr: ToastrService,
    private srvImpresion: ImpresionService,
    private http: HttpClient) { }

  buscarCategoria = '';
  pageActual: number = 1;

  ngOnInit(): void {
    this.getListRecetas();
    this.getListDetalleRecetas();
  }

  getListRecetas() {
    this.loading = true;
    this._recetaService.getListRecetas().subscribe((data: Receta[]) => {
      this.listRecetas = data;
      this.loading = false;
    }, error => {
      this.loading = false;
      this.toastr.error('Error al cargar las recetas', 'Error');
    });
  }

  getListDetalleRecetas(): void {
    this._detalleRecetaService.getListDetalleRecetas().subscribe((data: DetalleReceta[]) => {
      this.listDetalleRecetas = data;
    }, error => {
      this.toastr.error('Error al cargar los detalles de recetas', 'Error');
    });
  }

  deleteReceta(id: number) {
    this.loading = true;
    const detallesRecetaToDelete = this.listDetalleRecetas.filter(detalle => detalle.idReceta === id);

    const deleteDetalles = detallesRecetaToDelete.map(detalle =>
      this._detalleRecetaService.deleteDetalleReceta(detalle.idDetalleReceta!).toPromise()
    );

    Promise.all(deleteDetalles).then(() => {
      this._recetaService.deleteReceta(id).subscribe(() => {
        this.getListRecetas();
        this.toastr.warning('El registro fue eliminado con éxito', 'Receta eliminada');
        this.loading = false;
      }, error => {
        this.loading = false;
        this.toastr.error('Error al eliminar la receta', 'Error');
      });
    }).catch(error => {
      this.loading = false;
      this.toastr.error('Error al eliminar los detalles de la receta', 'Error');
    });
  }

  getDetalleByReceta(idReceta: number): any[] {
    return this.listDetalleRecetas.filter(detalle => detalle.idReceta === idReceta).map(detalle => {
      return {
        nombreIngrediente: this.getIngredienteName(detalle.idIngrediente),
        cantidadNecesaria: detalle.cantidadNecesaria,
        unidadMedida: detalle.unidadMedida
      };
    });
  }

  getIngredienteName(idIngrediente: number): string {
    if (this.ingredientesCache[idIngrediente]) {
      return this.ingredientesCache[idIngrediente];
    }

    this._ingredienteService.getIngrediente(idIngrediente).subscribe((ingrediente: Ingrediente) => {
      this.ingredientesCache[idIngrediente] = ingrediente.nombre;
    });

    return 'Cargando...';
  }

  // Obtengo los datos del API
obtenerRecetaCompleta(): Observable<any[]> {
  return this.http.get<any[]>('http://localhost:3000/api/detalleRecetaCompleta');
}

onImprimir() {
  const encabezado = ['Nombre de la Receta', 'Ingrediente', 'Cantidad', 'Unidad de Medida'];

  // Realizar la solicitud HTTP para obtener los productos
  this.obtenerRecetaCompleta().subscribe((detalles: any[]) => {
    if (detalles.length > 0) {
      // Ajustar la estructura de los datos para la tabla
      const cuerpo = detalles.map(detalle => [
        detalle.nombreReceta,
        detalle.nombreIngrediente,
        detalle.cantidadNecesaria,
        detalle.unidadMedida
      ]);

      // Llamar a la función imprimir del servicio ImpresionService
      this.srvImpresion.imprimir("ingredientes", encabezado, cuerpo, "Listado de ingredientes", true);
    } else {
      console.log("No hay detalles de recetas disponibles para imprimir");
    }
  });
  }
}
