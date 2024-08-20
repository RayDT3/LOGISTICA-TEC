import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DetalleCompras } from 'src/app/interfaces/detalleCompras';
import { DetalleComprasService } from 'src/app/services/detalle-compras.service';

@Component({
  selector: 'app-add-edit-detalle',
  templateUrl: './add-edit-detalle.component.html',
  styleUrls: ['./add-edit-detalle.component.css']
})
export class AddEditDetalleComponent implements OnInit {

  form: FormGroup;
  loading: boolean = false;
  id: number;
  operacion: string = 'Agregar';

  constructor(private fb: FormBuilder,
    private _detalleCompraService: DetalleComprasService,
    private router: Router,
    private toastr: ToastrService,
    private aRouter: ActivatedRoute) {
      this.form = this.fb.group({
        'proveedor': ['', Validators.required],
        'encargado_compra': ['', Validators.required],
        'numero_factura': ['', Validators.required],
      })
      this.id = Number(aRouter.snapshot.paramMap.get('id'));
    }

    ngOnInit(): void {

      if (this.id != 0) {
        // Es editar
        this.operacion = 'Editar ';
        this.getDetalleCompra(this.id);
      }
    }

    getDetalleCompra(id: number) {
      this.loading = true;
      this._detalleCompraService.getDetalleCompra(id).subscribe((data: DetalleCompras) => {
        this.loading = false;
        this.form.setValue({
          proveedor: data.proveedor,
          encargado_compra: data.encargado_compra,
          numero_factura: data.numero_factura
        })
      })
    }

    addDetalleCompra() {
      /*  console.log(this.form.value.name);
       console.log(this.form.get('name')?.value); */

      const detalleCompra: DetalleCompras = {
        proveedor: this.form.value.proveedor,
        encargado_compra: this.form.value.encargado_compra,
        numero_factura: this.form.value.numero_factura
      }
      this.loading = true;

      if (this.id !== 0) {
        // Es editar
        detalleCompra.id = this.id;
        this._detalleCompraService.updateDetalleCompra(this.id, detalleCompra).subscribe(() => {
          this.toastr.info(`El campo ${detalleCompra.proveedor} fue actualizado con exito`, 'registro actualizado');
          this.loading = false;
          this.router.navigate(['/detalleCompras']);
        })

      } else {
        // Es agregagar
        this._detalleCompraService.saveDetalleCompra(detalleCompra).subscribe(() => {
          this.toastr.success(`El campo ${detalleCompra.proveedor} fue registrado con exito`, 'Campo registrado');
          this.loading = false;
          this.router.navigate(['/detalleCompras']);
        })
      }
    }

}
