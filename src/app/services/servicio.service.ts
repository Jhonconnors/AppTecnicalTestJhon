import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ComunaResponse } from '../models/ComunaResponse';

import { Usuario } from '../models/Usuario';

@Injectable({
  providedIn: 'root'
})
export class ServicioService {
  
  constructor(private http: HttpClient) { }

  Url='http://localhost:8080/v1'

  getComunas(){
    return this.http.get<ComunaResponse[]>(this.Url+'/comunas');
  }

  getUsers(){
    return this.http.get<Usuario[]>(this.Url+'/all');
  }

  createUser(user: Usuario){
    return this.http.post(this.Url+'/create', user, { responseType: 'text' });
  }

  updateUser(user: Usuario){
    return this.http.put(this.Url+'/update', user);
  }

  deleteUser(id: string){
    return this.http.delete(this.Url+'/delete/'+id, { responseType: 'text' });
  }

  getUserById(id: string):Observable<any>{
    return this.http.get(this.Url+'/'+id);
  }
}
