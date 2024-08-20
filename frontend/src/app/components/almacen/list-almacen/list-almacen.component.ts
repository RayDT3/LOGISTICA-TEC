import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { Ingrediente } from 'src/app/interfaces/ingrediente';
import { IngredienteService } from 'src/app/services/ingrediente.service';
import { ImpresionService } from 'src/app/shared/services/impresion.service';

@Component({
  selector: 'app-list-almacenes',
  templateUrl: './list-almacen.component.html',
  styleUrls: ['./list-almacen.component.css']
})
export class ListAlmacenComponent implements OnInit {

  listAlmacenes: Ingrediente[] = []
  loading: boolean = false;

  constructor(
    private ingredienteService: IngredienteService,
    private toastr: ToastrService,
    private srvImpresion: ImpresionService
  ) { }

  buscaralmacen = '';
  pageActual: number = 1;

  ngOnInit(): void {
    this.getListAlmacenes();
  }

  getListAlmacenes() {
    this.loading = true;
    this.ingredienteService.getListIngredientes().subscribe((data: Ingrediente[]) => {
      this.listAlmacenes = data;
      this.checkExpiringProducts();
      this.loading = false;
    }, error => {
      this.toastr.error('Error al cargar los almacenes', 'Error');
      this.loading = false;
    });
  }

  deleteAlmacenes(id: number) {
    this.loading = true;
    this.ingredienteService.deleteIngrediente(id).subscribe(() => {
      this.getListAlmacenes();
      this.toastr.warning('El almacén fue eliminado con éxito', 'Almacén eliminado');
    }, error => {
      this.toastr.error('Error al eliminar el almacén', 'Error');
      this.loading = false;
    });
  }

  checkExpiringProducts() {
    const today = new Date();
    let expiringProducts = this.listAlmacenes.filter(product => {
      if (product) {
        const expirationDate = new Date(product.fecha_de_vencimiento);

        if (isNaN(expirationDate.getTime())) {
          console.warn(`Invalid date format for product: ${product.nombre} (fecha_de_vencimiento: ${product.fecha_de_vencimiento})`);
          return false;
        }

        const expirationDateStr = new String(product.fecha_de_vencimiento);

        if (expirationDateStr.length == 0 || expirationDateStr == "null") {
          return false;
        }

        const timeDiff = expirationDate.getTime() - today.getTime();
        const daysLeft = Math.ceil(timeDiff / (1000 * 3600 * 24));

        return daysLeft <= 7;
      } else {
        return false;
      }
    });

    let expiredProductsCount = 0;
    let expiringSoonCount = 0;
    let expiringSoonProducts: string[] = [];
    let expiredProducts: string[] = [];

    this.listAlmacenes.forEach(product => {
      if (product) {
        const expirationDate = new Date(product.fecha_de_vencimiento);
        if (isNaN(expirationDate.getTime())) {
          return;
        }

        const expirationDateStr = new String(product.fecha_de_vencimiento);

        if(expirationDateStr.length == 0 || expirationDateStr == "null"){
          return;
        }

        const timeDiff = expirationDate.getTime() - today.getTime();
        const daysLeft = Math.ceil(timeDiff / (1000 * 3600 * 24));

        if (daysLeft < 0) {
          expiredProductsCount++;
          expiredProducts.push(product.nombre);
        } else if (daysLeft <= 7) {
          expiringSoonCount++;
          expiringSoonProducts.push(product.nombre);
        }
      }
    });

    if (expiredProductsCount > 0) {
      this.toastr.error(`Los siguientes productos están vencidos: ${expiredProducts.join(', ')}. Por favor, revísalos.`, 'Alerta de Vencimiento');
    } else if (expiringSoonCount > 0) {
      if (expiringSoonCount === 1) {

        const daysExpiring = Math.ceil((new Date(this.listAlmacenes.find(p => p.nombre === expiringSoonProducts[0])!.fecha_de_vencimiento).getTime() 
        - today.getTime()) / (1000 * 3600 * 24));
    
        // Mensaje personalizado dependiendo de los días restantes
        const message = daysExpiring >= 2
            ? `El producto ${expiringSoonProducts[0]} está por vencer en ${daysExpiring} días. Por favor, revísalo.`
            : `El producto ${expiringSoonProducts[0]} está por vencer en un día. Por favor, revísalo.`;
        
        // Mostrar el mensaje de advertencia
        this.toastr.warning(message, 'Alerta de Vencimiento');
    
      } else if (expiringSoonCount === 2) {
        this.toastr.warning(`Los productos ${expiringSoonProducts[0]} y ${expiringSoonProducts[1]} están por vencer. Por favor, revísalos.`, 'Alerta de Vencimiento');
      } else if (expiringSoonCount > 2) {
        this.toastr.warning('Algunos productos están por vencer. Checarlos urgentemente.', 'Alerta de Vencimiento');
      }
    }
  }


  obtenerAlmacen(): Observable<Ingrediente[]> {
    return this.ingredienteService.getListIngredientes();
  }

  onImprimir() {
    const encabezado = ['Producto', 'Cantidad Disponible', 'Unidad de Medida'];

    this.obtenerAlmacen().subscribe((almacen: Ingrediente[]) => {
      const cuerpo = almacen.map(item => [
        item.nombre,
        item.cantidadDisponible,
        item.unidadMedida
      ]);

      this.srvImpresion.imprimir("almacen", encabezado, cuerpo, "Listado de Almacenes", true);
    });
  }
}
