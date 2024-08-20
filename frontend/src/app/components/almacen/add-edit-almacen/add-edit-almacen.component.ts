import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Ingrediente } from 'src/app/interfaces/ingrediente';
import { IngredienteService } from 'src/app/services/ingrediente.service';

@Component({
  selector: 'app-add-edit-ingrediente',
  templateUrl: './add-edit-almacen.component.html',
  styleUrls: ['./add-edit-almacen.component.css']
})
export class AddEditAlmacenComponent implements OnInit {

  form: FormGroup;
  loading: boolean = false;
  id: number;
  unidadesMedida: string[] = ['Unidad', 'Kilo', 'Litro', 'Metro'];
  operacion: string = 'Agregar';
  nuevaUnidad: boolean = false;

  constructor(
    private fb: FormBuilder,
    private ingredienteService: IngredienteService,
    private router: Router,
    private toastr: ToastrService,
    private aRouter: ActivatedRoute
  ) {
    this.form = this.fb.group({
      'nombre': ['', Validators.required],
      'cantidadDisponible': ['', Validators.required],
      'unidadMedida': ['', Validators.required],
      'nueva_unidad_de_medida': [''],
      'fecha_de_vencimiento': ['', Validators.required],
    });
    this.id = Number(aRouter.snapshot.paramMap.get('id'));
  }

  ngOnInit(): void {
    if (this.id !== 0) {
      this.operacion = 'Editar ';
      this.getIngrediente(this.id);
    }

    this.getListIngredientes();
  }

  getListIngredientes() {
    this.loading = true;
    this.ingredienteService.getListIngredientes().subscribe((data: Ingrediente[]) => {
      this.loading = false;
  
      const unidadesSet = new Set<string>(this.unidadesMedida);
      data.forEach(ingrediente => {
        unidadesSet.add(ingrediente.unidadMedida);
      });
  
      this.unidadesMedida = Array.from(unidadesSet);
    }, error => {
      this.toastr.error('Error al cargar el ingrediente', 'Error');
      this.loading = false;
    });
  }

  getIngrediente(id: number) {
    this.loading = true;
    this.ingredienteService.getIngrediente(id).subscribe((data: Ingrediente) => {
      this.loading = false;
      this.form.setValue({
        nombre: data.nombre,
        cantidadDisponible: data.cantidadDisponible,
        unidadMedida: data.unidadMedida,
        nueva_unidad_de_medida: '',
        fecha_de_vencimiento: data.fecha_de_vencimiento
      });
    }, error => {
      this.toastr.error('Error al cargar el ingrediente', 'Error');
      this.loading = false;
    });
  }

  addIngrediente() {
    const ingrediente: Ingrediente = {
      nombre: this.form.value.nombre,
      cantidadDisponible: this.form.value.cantidadDisponible,
      unidadMedida: this.form.value.unidadMedida,
      fecha_de_vencimiento: this.form.value.fecha_de_vencimiento
    };
    this.loading = true;

    if (this.id !== 0) {
      // Es editar
      ingrediente.idIngrediente = this.id;
      this.ingredienteService.updateIngrediente(this.id, ingrediente).subscribe(() => {
        this.toastr.info(`El ingrediente ${ingrediente.nombre} fue actualizado con éxito`, 'Ingrediente actualizado');
        this.loading = false;
        this.router.navigate(['/almacenes']);
      }, error => {
        this.toastr.error('Error al actualizar el ingrediente', 'Error');
        this.loading = false;
      });
    } else {
      // Es agregar
      this.ingredienteService.saveIngrediente(ingrediente).subscribe(() => {
        this.toastr.success(`El ingrediente ${ingrediente.nombre} fue registrado con éxito`, 'Ingrediente registrado');
        this.loading = false;
        this.router.navigate(['/almacenes']);
      }, error => {
        this.toastr.error('Error al registrar el ingrediente', 'Error');
        this.loading = false;
      });
    }
  }

  checkNuevaUnidad(event: any) {
    if (event.target.value === 'nueva') {
      this.nuevaUnidad = true;
      this.form.get('unidadMedida')?.setValidators([]);
      this.form.get('nueva_unidad_de_medida')?.setValidators([Validators.required]);
    } else {
      this.nuevaUnidad = false;
      this.form.get('unidadMedida')?.setValidators([Validators.required]);
      this.form.get('nueva_unidad_de_medida')?.setValidators([]);
    }
    this.form.get('unidadMedida')?.updateValueAndValidity();
    this.form.get('nueva_unidad_de_medida')?.updateValueAndValidity();
  }
}
