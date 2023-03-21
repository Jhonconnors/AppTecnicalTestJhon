import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { catchError, throwError } from 'rxjs';
import { Usuario } from 'src/app/models/Usuario';
import { ServicioService } from 'src/app/services/servicio.service';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.css']
})
export class ListUsersComponent implements OnInit {

  constructor(private router: Router,
    private _service: ServicioService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.loadUsers();
  }

  listUsuarios: Usuario[] = [];

  goCreateUser() {
    this.router.navigate(['create']);
  }

  loadUsers() {
    this._service.getUsers()
      .pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === 400) {
            console.log(error.error);
          } else {
            console.error('Unknown error occurred!');
            console.error(error);
          }
          return throwError(() => error);
        })
      )
      .subscribe((res: any) => {
        this.listUsuarios = res;
      });
  }

  delete(id: any) {
    //console.log('este es el id: ' + id);
    this._service.deleteUser(id)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === 400) {
            console.log(error.error);
          } else {
            console.error('Unknown error occurred!');
            console.error(error);
          }
          return throwError(() => error);
        })
      )
      .subscribe((res: any) => {
        this.toastr.warning('Usuario: ' + id + ' Eliminado')
        this.loadUsers();
      });
  }

  editUser(id: any) {
    this.router.navigate(['edit/' + id])
  }

}
