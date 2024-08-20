import { Component, OnInit } from '@angular/core';
import { Pedido } from 'src/app/interfaces/pedidos';
import { PedidoService } from 'src/app/services/pedidos.service';
import { DetalleReceta } from 'src/app/interfaces/detalleReceta';
import { DetalleRecetaService } from 'src/app/services/detalle-receta.service';
import { ToastrService } from 'ngx-toastr';
import { IngredienteService } from 'src/app/services/ingrediente.service';
import { Ingrediente } from 'src/app/interfaces/ingrediente';
import { Receta } from 'src/app/interfaces/receta';
import { RecetaService } from 'src/app/services/receta.service';

@Component({
  selector: 'app-list-pedidos',
  templateUrl: './list-pedidos.component.html',
  styleUrls: ['./list-pedidos.component.css']
})
export class ListPedidosComponent implements OnInit {

  listPedidos: Pedido[] = [];
  filteredPedidos: Pedido[] = [];
  loading = true;
  buscarPedido = '';
  pageActual = 1;
  listDetalleRecetas: DetalleReceta[] = [];
  listRecetas: Receta[] = [];

  constructor(private pedidoService: PedidoService,
    private _detalleRecetaService: DetalleRecetaService,
    private toastr: ToastrService,
    private _recetaService: RecetaService,
    private _ingredienteService: IngredienteService
  ) {}

  ngOnInit(): void {
    this.getPedidos();
    this.getRecetas();
    this.getListDetalleRecetas();
  }

  getPedidos(): void {
    this.loading = true;
    this.pedidoService.getListPedidos().subscribe({
      next: (data) => {
        this.listPedidos = data;
        this.filterPedidos();
        this.loading = false;
      },
      error: (error) => {
        console.error(error);
        this.loading = false;
      }
    });
  }

  getRecetas(): void {
    this._recetaService.getListRecetas().subscribe((data: Receta[]) => {
      this.listRecetas = data;
    }, error => {
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

  deletePedido(id: number): void {
    if (confirm('¿Está seguro de que desea eliminar este pedido?')) {
      this.pedidoService.deletePedido(id).subscribe({
        next: () => {
          this.getPedidos();
        },
        error: (error) => {
          console.error(error);
        }
      });
    }
  }

  showIngredientes(idPedido: number): void {
    const pedido = this.getPedidoByID(idPedido);
    if (pedido && pedido.id_receta !== undefined) {
      let detalleText = 'Detalles de Ingredientes:\n\n';
      this.getDetalleByReceta(pedido.id_receta).then((detalles) => {
        detalles.forEach((detalle: any) => {
          detalleText += `${detalle.nombreIngrediente}: ${detalle.cantidadNecesaria} ${detalle.unidadMedida}\n`;
        });
        alert(detalleText);
      });
    }
  }

  async getDetalleByReceta(idReceta: number): Promise<any[]> {
    const detalles = this.listDetalleRecetas.filter(detalle => detalle.idReceta === idReceta);
    const detallePromises = detalles.map(async (detalle) => {
      const nombreIngrediente = await this.getIngredienteName(detalle.idIngrediente);
      return {
        nombreIngrediente,
        cantidadNecesaria: detalle.cantidadNecesaria,
        unidadMedida: detalle.unidadMedida
      };
    });
    return Promise.all(detallePromises);
  }

  getIngredienteName(idIngrediente: number): Promise<string> {
    return new Promise((resolve) => {
      this._ingredienteService.getIngrediente(idIngrediente).subscribe((ingrediente: Ingrediente) => {
        resolve(ingrediente.nombre);
      });
    });
  }

  getRecetaByID(id: number): Receta | undefined {
    return this.listRecetas.find(receta => receta.idReceta === id);
  }

  getPedidoByID(id: number): Pedido | undefined {
    return this.listPedidos.find(pedido => pedido.id_pedido === id);
  }

  filterPedidos(): void {
    this.filteredPedidos = this.listPedidos.filter(pedido =>
      pedido.descripcion.toLowerCase().includes(this.buscarPedido.toLowerCase())
    );
  }

  onImprimir(): void {
  }

}
