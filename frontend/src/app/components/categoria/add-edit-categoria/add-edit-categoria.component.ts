import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Categoria } from 'src/app/interfaces/categoria';
import { CategoriaService } from 'src/app/services/categoria.service';

@Component({
  selector: 'app-add-edit-categoria',
  templateUrl: './add-edit-categoria.component.html',
  styleUrls: ['./add-edit-categoria.component.css']
})
export class AddEditCategoriaComponent implements OnInit {

  form: FormGroup;
  loading: boolean = false;
  id: number;
  operacion: string = 'Agregar';

  constructor(private fb: FormBuilder,
    private _categoriaService: CategoriaService,
    private router: Router,
    private toastr: ToastrService,
    private aRouter: ActivatedRoute) {
      this.form = this.fb.group({
        'categoria': ['', Validators.required],
      })
      this.id = Number(aRouter.snapshot.paramMap.get('id'));
    }

    ngOnInit(): void {

      if (this.id != 0) {
        // Es editar
        this.operacion = 'Editar ';
        this.getCategoria(this.id);
      }
    }

    getCategoria(id: number) {
      this.loading = true;
      this._categoriaService.getCategoria(id).subscribe((data: Categoria) => {
        this.loading = false;
        this.form.setValue({
          categoria: data.categoria,
        })
      })
    }

    addCategoria() {
      /*  console.log(this.form.value.name);
       console.log(this.form.get('name')?.value); */

      const categoria: Categoria = {
        categoria: this.form.value.categoria
      }
      this.loading = true;

      if (this.id !== 0) {
        // Es editar
        categoria.id = this.id;
        this._categoriaService.updateCategoria(this.id, categoria).subscribe(() => {
          this.toastr.info(`El campo ${categoria.categoria} fue actualizado con exito`, 'registro actualizado');
          this.loading = false;
          this.router.navigate(['/categoria']);
        })

      } else {
        // Es agregagar
        this._categoriaService.saveCategoria(categoria).subscribe(() => {
          this.toastr.success(`El campo ${categoria.categoria} fue registrado con exito`, 'Campo registrado');
          this.loading = false;
          this.router.navigate(['/categoria']);
        })
      }
    }

}

