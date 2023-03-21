import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { catchError, throwError } from 'rxjs';
import { ComunaResponse } from 'src/app/models/ComunaResponse';
import { Usuario } from 'src/app/models/Usuario';
import { ServicioService } from 'src/app/services/servicio.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {



  listComunas: ComunaResponse[] = [];
 

  form: FormGroup;
 
  
  constructor( private router: Router,
               private fb: FormBuilder,
               private _service: ServicioService,
               private toastr: ToastrService) { 
                this.form = this.fb.group({
                  nombre: ['', Validators.required],
                  apellido: ['', [Validators.required]],
                  telefono: ['', [Validators.required]],
                  comuna: ['', [Validators.required]]
                  
                })
              }

  ngOnInit(): void {

    this.loadComunas();
  }

  saveUser(){
    const USER: Usuario = {
      nombre: this.form.value.nombre,
      apellido: this.form.value.apellido,
      telefono: this.form.value.telefono,
      comuna: this.form.value.comuna
    }
    this._service.createUser(USER)
    .pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 400) {
          console.log(error.error);
        } else {
          this.toastr.error('Error al crear Usuario')
          console.error('Unknown error occurred!');
        }
        return throwError(() => error);
      })
    )
    .subscribe( (res: any) =>{
      //console.log(res);
      this.toastr.success(res, '¡Exito!');
      this.router.navigate(['list-users']);
    });
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


}