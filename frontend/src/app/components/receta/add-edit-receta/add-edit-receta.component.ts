import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { RecetaService } from 'src/app/services/receta.service';
import { DetalleRecetaService } from 'src/app/services/detalle-receta.service';
import { IngredienteService } from 'src/app/services/ingrediente.service';
import { Receta } from 'src/app/interfaces/receta';
import { DetalleReceta } from 'src/app/interfaces/detalleReceta';
import { Ingrediente } from 'src/app/interfaces/ingrediente';
import { forkJoin } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-add-edit-receta',
  templateUrl: './add-edit-receta.component.html',
  styleUrls: ['./add-edit-receta.component.css']
})
export class AddEditRecetaComponent implements OnInit {

  recetaForm: FormGroup;
  ingredientes: Ingrediente[] = [];
  unidadesMedida: string[] = ['gramos', 'kilogramos', 'litros', 'mililitros']; // Añadir más unidades de medida si es necesario
  isEditMode = false;
  recetaId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private recetaService: RecetaService,
    private detalleRecetaService: DetalleRecetaService,
    private ingredienteService: IngredienteService,
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute
  ) { 
    this.recetaForm = this.fb.group({
      receta: ['', Validators.required],
      descripcion: ['', Validators.required],
      detallesReceta: this.fb.array([])
    });
  }

  ngOnInit(): void {
    this.recetaId = this.route.snapshot.params['id'];
    this.isEditMode = !!this.recetaId;
    this.loadIngredientes();

    if (this.isEditMode) {
      this.loadReceta();
      this.loadDetallesReceta();
    }
  }

  get detallesReceta(): FormArray {
    return this.recetaForm.get('detallesReceta') as FormArray;
  }

  loadReceta(): void {
    if (this.recetaId) {
      this.recetaService.getReceta(this.recetaId).subscribe(
        (data: Receta) => {
          this.recetaForm.patchValue({
            receta: data.receta,
            descripcion: data.descripcion
          });
        },
        error => {
          this.toastr.error('Error al cargar la receta', 'Error');
        }
      );
    }
  }

  loadDetallesReceta(): void {
    if (this.recetaId) {
      this.detalleRecetaService.getListDetalleRecetas().subscribe(
        (data: DetalleReceta[]) => {
          const detalles = data.filter(detalle => detalle.idReceta === this.recetaId);
          detalles.forEach(detalle => {
            this.detallesReceta.push(this.fb.group({
              idIngrediente: [detalle.idIngrediente, Validators.required],
              cantidadNecesaria: [detalle.cantidadNecesaria, Validators.required],
              unidadMedida: [detalle.unidadMedida, Validators.required]
            }));
          });
        },
        error => {
          this.toastr.error('Error al cargar los detalles de la receta', 'Error');
        }
      );
    }
  }

  loadIngredientes(): void {
    this.ingredienteService.getListIngredientes().subscribe(
      (data: Ingrediente[]) => {
        this.ingredientes = data;
        const unidadesSet = new Set<string>(this.unidadesMedida);
        data.forEach(ingrediente => {
          unidadesSet.add(ingrediente.unidadMedida);
        });
    
        this.unidadesMedida = Array.from(unidadesSet);
      },
      error => {
        this.toastr.error('Error al cargar los ingredientes', 'Error');
      }
    );
  }

  addDetalle(): void {
    this.detallesReceta.push(
      this.fb.group({
        idIngrediente: ['', Validators.required],
        cantidadNecesaria: ['', Validators.required],
        unidadMedida: ['', Validators.required],
      })
    );
  }

  removeDetalle(index: number): void {
    this.detallesReceta.removeAt(index);
  }

  onSubmit(): void {
    if (this.recetaForm.invalid) {
      this.toastr.error('Completa todos los campos o añade al menos un producto', 'Error');
      return;
    }

    let isValid = true;
    this.detallesReceta.controls.forEach(control => {
      if (control.invalid) {
        control.markAllAsTouched();
        isValid = false;
      }
    });

    if (!isValid) {
      this.toastr.error('Completa todos los campos de los productos', 'Error');
      return;
    }

    if (this.isEditMode) {
      this.updateReceta();
    } else {
      this.saveReceta();
    }
  }

  saveReceta(): void {
    const receta: Receta = this.recetaForm.value;
    this.recetaService.saveReceta(receta).subscribe(
      (savedReceta: any) => {
        this.saveDetallesReceta(savedReceta.idReceta!);
      },
      error => {
        this.toastr.error('Error al guardar la receta', 'Error');
      }
    );
  }

  saveDetallesReceta(recetaId: number): void {
    const detalles: DetalleReceta[] = this.recetaForm.value.detallesReceta.map((detalle: DetalleReceta) => {
      detalle.idReceta = recetaId;
      return detalle;
    });

    const requests = detalles.map(detalle => this.ingredienteService.getIngrediente(detalle.idIngrediente).pipe(
      switchMap((ingre: Ingrediente) => {
        return this.detalleRecetaService.saveDetalleReceta(detalle);
      })
    ));

    forkJoin(requests).subscribe(
      () => {
        this.toastr.success('Receta guardada con éxito', 'Éxito');
        this.router.navigate(['/recetas']);
      },
      error => {
        this.toastr.error('Error al guardar los detalles de la receta', 'Error');
      }
    );
  }

  updateReceta(): void {
    if (this.recetaId) {
      const receta: Receta = this.recetaForm.value;
      this.recetaService.updateReceta(this.recetaId, receta).subscribe(
        () => {
          this.updateDetallesReceta();
        },
        error => {
          this.toastr.error('Error al actualizar la receta', 'Error');
        }
      );
    }
  }

  updateDetallesReceta(): void {
    const detalles: DetalleReceta[] = this.recetaForm.value.detallesReceta.map((detalle: DetalleReceta) => {
      detalle.idReceta = this.recetaId!;
      return detalle;
    });

    const requests = detalles.map(detalle => 
      this.ingredienteService.getIngrediente(detalle.idIngrediente).pipe(
        switchMap((ingre: Ingrediente) => {
          detalle.unidadMedida = ingre.unidadMedida;
          return this.detalleRecetaService.updateDetalleReceta(detalle.idReceta, detalle);
        })
      )
    );

    forkJoin(requests).subscribe(
      () => {
        this.toastr.success('Receta actualizada con éxito', 'Éxito');
        this.router.navigate(['/recetas']);
      },
      error => {
        this.toastr.error('Error al actualizar los detalles de la receta', 'Error');
      }
    );
  }
}
