import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Chef } from 'src/app/interfaces/chef';
import { ChefService } from 'src/app/services/chef.service';

@Component({
  selector: 'app-add-edit-chef',
  templateUrl: './add-edit-chef.component.html',
  styleUrls: ['./add-edit-chef.component.css']
})
export class AddEditChefComponent implements OnInit {

  form: FormGroup;
  loading: boolean = false;
  id: number;
  operacion: string = 'Agregar';
  errorMessage: string ='';

  constructor(private fb: FormBuilder,
    private _chefService: ChefService,
    private router: Router,
    private toastr: ToastrService,
    private aRouter: ActivatedRoute) {
    this.form = this.fb.group({
      'nombre': ['', Validators.required],
      'apellido': ['', Validators.required],
      'telefono': ['', [Validators.required, Validators.pattern('[0-9]{9}')]],
      'dni': ['', [Validators.required, Validators.pattern('[0-9]{8}')]],
      'email': ['', [Validators.required, Validators.email]],
    })
    this.id = Number(aRouter.snapshot.paramMap.get('id'));
  }

  ngOnInit(): void {

    if (this.id != 0) {
      // Es editar
      this.operacion = 'Editar ';
      this.getChef(this.id);
    }
  }

  getChef(id: number) {
    this.loading = true;
    this._chefService.getChef(id).subscribe((data: Chef) => {
      this.loading = false;
      this.form.setValue({
        nombre: data.nombre,
        apellido: data.apellido,
        telefono: data.telefono,
        dni: data.dni,
        email: data.email
      })
    })
  }

  addChef() {
    /*  console.log(this.form.value.name);
     console.log(this.form.get('name')?.value); */

    const chef: Chef = {
      nombre: this.form.value.nombre,
      apellido: this.form.value.apellido,
      telefono: this.form.value.telefono,
      dni: this.form.value.dni,
      email: this.form.value.email
    }
    this.loading = true;

    if (this.id !== 0) {
      // Es editar
      chef.id = this.id;
      this._chefService.updateChef(this.id, chef).subscribe(() => {
        this.toastr.info(`El campo ${chef.nombre} fue actualizado con exito`, 'chef actualizado');
        this.loading = false;
        this.router.navigate(['/chefs']);
      })

    } else {
      // Es agregagar

      this._chefService.saveChef(chef).subscribe(() => {
        this.toastr.success(`El docente ${chef.nombre} fue registrado con exito`, 'Docente registrado');
        this.router.navigate(['/chefs']);
      },
      (error: HttpErrorResponse) =>{
        if(error.status === 400 && error.error.error === 'email existe'){
          this.errorMessage = 'email ya existe';
          this.toastr.error('El email ya existe','Error');
        }
      }
    )
    }
  }

  validarTelefono(event: any) {
    const input = event.target;
    const valor = input.value;
    input.value = valor.replace(/\D/g, '').substring(0, 9);
  }

  validarDNI(event: any) {
    const input = event.target;
    const valor = input.value;
    input.value = valor.replace(/\D/g, '').substring(0, 8);
  }
}
