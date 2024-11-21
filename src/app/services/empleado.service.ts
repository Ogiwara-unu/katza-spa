import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { server } from './global.service';
import { Empleado } from '../models/empleado';

@Injectable({
  providedIn: 'root'
})


export class EmpleadoService {
  private urlAPI: string;


constructor(private _http: HttpClient) {
    this.urlAPI = server.url;
  }

  create(empleado: Empleado): Observable<any> {
    const bearerToken = sessionStorage.getItem('token');
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    if (bearerToken) {
      headers = headers.set('bearertoken', `${bearerToken}`);
    }
    const userJson = JSON.stringify(empleado);
    const params = 'data=' + userJson;
    const options = { headers };
    return this._http.post(`${this.urlAPI}Empleado`, params, options);
  }

  getAllEmpleados(): Observable<Empleado[]> {
    const bearerToken = sessionStorage.getItem('token');
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    if (bearerToken) {
      headers = headers.set('bearertoken', `${bearerToken}`);
    }
    const options = { headers };
    return this._http.get<Empleado[]>(`${this.urlAPI}Empleado`, options);
  }

  deleteEmpleado(id: number): Observable<any> {
    const bearerToken = sessionStorage.getItem('token');
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    if (bearerToken) {
      headers = headers.set('bearertoken', `${bearerToken}`);
    }
    const options = { headers };
    return this._http.delete(`${this.urlAPI}Empleado/${id}`, options);
  }

  updateEmpleado(empleado: Empleado): Observable<any> {
    const userJson = JSON.stringify(empleado);
    const bearerToken = sessionStorage.getItem('token');
    const params = 'data=' + userJson;
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    if (bearerToken) {
      headers = headers.set('bearertoken', `${bearerToken}`);
    }
    const options = { headers };
    return this._http.put(`${this.urlAPI}Empleado/${empleado.idEmpleado}`, params, options);
  }
}