import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Pedido } from 'src/app/interfaces/pedidos';
import { PedidoService } from 'src/app/services/pedidos.service';
import { RecetaService } from 'src/app/services/receta.service';
import { Receta } from 'src/app/interfaces/receta';

@Component({
  selector: 'app-add-edit-pedido',
  templateUrl: './add-edit-pedidos.component.html',
  styleUrls: ['./add-edit-pedidos.component.css']
})
export class AddEditPedidosComponent implements OnInit {
  form: FormGroup;
  operacion: string = 'Añadir';
  id: number | null = null;
  loading: boolean = false;
  listRecetas: Receta[] = [];
  pedidoActual: Pedido | undefined;


  constructor(
    private fb: FormBuilder,
    private pedidoService: PedidoService,
    private recetaService: RecetaService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.form = this.fb.group({
      id_receta: ['', Validators.required],
      descripcion: ['', Validators.required],
      fecha_pedido: ['', Validators.required],
      estado: ['pendiente', Validators.required]
    });
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.getRecetas();

    if (this.id) {
      this.operacion = 'Editar';
      this.getPedido(this.id);
    }
  }

  getRecetas(): void {
    this.recetaService.getListRecetas().subscribe({
      next: (data) => {
        this.listRecetas = data;
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  getPedido(id: number): void {
    this.loading = true;
    this.pedidoService.getPedido(id).subscribe({
      next: (data) => {
        this.form.setValue({
          id_receta: data.id_receta,
          descripcion: data.descripcion,
          fecha_pedido: data.fecha_pedido,
          estado: data.estado
        });
        this.pedidoActual = data;
        this.loading = false;
      },
      error: (error) => {
        console.error(error);
        this.loading = false;
      }
    });
  }

  onSubmit(): void {
    if (this.form.invalid) {
      return;
    }

    const pedido: Pedido = this.form.value;

    if (this.id) {
      // Editar pedido
      this.pedidoService.updatePedido(this.id, pedido).subscribe({
        next: () => this.router.navigate(['/elaborarPedido']),
        error: (error) => console.error(error)
      });
    } else {
      // Añadir pedido
      this.pedidoService.savePedido(pedido).subscribe({
        next: () => this.router.navigate(['/elaborarPedido']),
        error: (error) => console.error(error)
      });
    }
  }

  canChangeToPendiente(): boolean {
    const currentEstado = this.form.get('estado')?.value;
    return (currentEstado === 'preparando' || currentEstado === 'pendiente') && this.pedidoActual?.estado === 'pendiente';
  }

  canChangeToPreparando(): boolean {
    const currentEstado = this.form.get('estado')?.value;
    return (currentEstado === 'pendiente' || currentEstado === 'hecho') && (this.pedidoActual?.estado === 'preparando' || this.pedidoActual?.estado === 'pendiente') ;
  }

  canChangeToHecho(): boolean {
    const currentEstado = this.form.get('estado')?.value;
    return currentEstado === 'preparando' && this.pedidoActual?.estado === 'preparando';
  }
}
