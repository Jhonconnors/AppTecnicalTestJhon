import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { catchError, throwError } from 'rxjs';
import { ComunaResponse } from 'src/app/models/ComunaResponse';
import { Usuario } from 'src/app/models/Usuario';
import { ServicioService } from 'src/app/services/servicio.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {


  id: string | null;

  listComunas: ComunaResponse[] = [];

  form: FormGroup;
 
  
  constructor( private router: Router,
               private fb: FormBuilder,
               private _service: ServicioService,
               private toastr: ToastrService,
               private aRoute: ActivatedRoute) { 
                this.form = this.fb.group({
                  nombre: ['', Validators.required],
                  apellido: ['', [Validators.required]],
                  telefono: ['', [Validators.required]],
                  comuna: ['', [Validators.required]]
                  
                })
                this.id = this.aRoute.snapshot.paramMap.get('id');
              }

  ngOnInit(): void {

    this.loadComunas();
    this.loadUser();
  }


  returnList(){
    this.router.navigate(['list-users']);
  }

  loadComunas(){
    this._service.getComunas()
    .pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 400) {
          console.log(error.error);
        } else {
          console.error('Unknown error occurred!');
        }
        return throwError(() => error);
      })
    )
    .subscribe( (res: ComunaResponse[]) =>{
      this.listComunas = res;
        
    });
  }

  loadUser(){
    if (this.id !== null) {
      this._service.getUserById(this.id)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === 400) {
            console.log(error.error);
          } else {
            console.error('Unknown error occurred!');
          }
          return throwError(() => error);
        })
      )
      .subscribe(data => {
        this.form.setValue({
          nombre: data.nombre,
          apellido: data.apellido,
          telefono: data.telefono,
          comuna: data.comuna,
        })
      })
    }
  }

  editUser(){
    const USER: Usuario = {
      id: this.id,
      nombre: this.form.value.nombre,
      apellido: this.form.value.apellido,
      telefono: this.form.value.telefono,
      comuna: this.form.value.comuna
    }
    this._service.updateUser(USER)
    .pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 400) {
          console.log(error.error);
        } else {
          this.toastr.error('Error al Actualizar Usuario')
          console.error('Unknown error occurred!');
        }
        return throwError(() => error);
      })
    )
    .subscribe( (res: any) =>{
      this.toastr.info(res.nombre, '¡Actualizado con Exito!');
      this.router.navigate(['list-users']);
    });
  }

}
