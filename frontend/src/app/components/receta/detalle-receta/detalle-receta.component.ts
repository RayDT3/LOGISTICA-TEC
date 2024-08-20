import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { Almacen } from 'src/app/interfaces/almacen';
import { DetalleReceta } from 'src/app/interfaces/detalleReceta';
import { Receta } from 'src/app/interfaces/receta';
import { AlmacenService } from 'src/app/services/almacen.service';
import { DetalleRecetaService } from 'src/app/services/detalle-receta.service';
import { RecetaService } from 'src/app/services/receta.service';
import { ImpresionService } from 'src/app/shared/services/impresion.service';

@Component({
  selector: 'app-detalle-receta',
  templateUrl: './detalle-receta.component.html',
  styleUrls: ['./detalle-receta.component.css']
})
export class DetalleRecetaComponent implements OnInit {

  listRecetas: Receta[] = [];
  listDetalleRecetas: DetalleReceta[] = [];
  listAlmacen: Almacen[] = [];
  loading: boolean = false;
  autoTitulo: string = '';
  uniqueRecetas: Receta[] = [];

  constructor(
    private _detalleRecetaService: DetalleRecetaService,
    private _recetaService: RecetaService,
    private _almacenService: AlmacenService,
    private toastr: ToastrService,
    private srvImpresion : ImpresionService,
    private http: HttpClient)
  { }

  pageActual: number=1;

  ngOnInit(): void {
    this.loading = true;
    this.getListDetalleRecetas();
    this.getListRecetas();
    this.loading = false;
  }

  getRecetaByID(id: number): Receta | undefined {
    return this.listRecetas.find((receta) => receta.idReceta === id);
  }

  getListRecetas() {
    this._recetaService.getListRecetas().subscribe(
      (data: Receta[]) => {
        this.listRecetas = data;
        this.filterUniqueRecetas();
        this.setAutoTitulo();
      },
      (error) => {}
    );
  }
  getListDetalleRecetas() {

    this._detalleRecetaService.getListDetalleRecetas().subscribe((data: DetalleReceta[]) => {
      this.listDetalleRecetas = data;

    })
  }

  deleteDetalleReceta(id: number) {
    this.loading = true;
    this._detalleRecetaService.deleteDetalleReceta(id).subscribe(() => {
      this.getListDetalleRecetas();
      this.toastr.warning('El registro fue eliminado con exito', 'Docente eliminado');
    })
  }

  filterUniqueRecetas(): void {
    const seenTitles = new Set();
    this.uniqueRecetas = this.listRecetas.filter((receta) => {
      const recetaName = receta.idReceta; // Asegúrate de que 'nombre' es el campo correcto
      if (seenTitles.has(recetaName)) {
        return false;
      } else {
        seenTitles.add(recetaName);
        return true;
      }
    });
  }

  setAutoTitulo(): void {
    if (this.uniqueRecetas.length > 0) {
      this.autoTitulo = this.uniqueRecetas[0].receta; // Establece el título usando el primer elemento único
    }
  }

  //obtengo los datos del API
  obtenerRecetas(): Observable<any[]>{
    return this.http.get<any[]>
    ('http://localhost:3000/api/detalleReceta');
  }

}
