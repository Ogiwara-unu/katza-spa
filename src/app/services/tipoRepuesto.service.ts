import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { server } from './global.service';
import { Tiporepuesto } from '../models/tiporepuesto';

@Injectable({
  providedIn: 'root'
})

export class TipoRepuestoService {
  private urlAPI: string;

  constructor(private _http: HttpClient) {
    this.urlAPI = server.url;
  }

   // Obtener todos los tipos de repuesto
   getAllTipoRepuesto(): Observable<Tiporepuesto[]> {
    const bearerToken = sessionStorage.getItem('token');
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    if (bearerToken) {
      headers = headers.set('bearertoken', `${bearerToken}`);
    }
    let options = { headers };
    return this._http.get<Tiporepuesto[]>(`${this.urlAPI}TipoRepuesto`, options);
  }

  // Eliminar un tipo de repuesto por ID
  deleteTipoRepuesto(id: number): Observable<any> {
    const bearerToken = sessionStorage.getItem('token');
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    if (bearerToken) {
      headers = headers.set('bearertoken', `${bearerToken}`);
    }
    let options = { headers };
    return this._http.delete(`${this.urlAPI}TipoRepuesto/${id}`, options);
  }

  // Actualizar un tipo de repuesto
  updateTipoRepuesto(tiporepuesto: Tiporepuesto): Observable<any> {
    const userJson = JSON.stringify(tiporepuesto);
    const params = 'data=' + userJson;
    const bearerToken = sessionStorage.getItem('token');
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    if (bearerToken) {
      headers = headers.set('bearertoken', `${bearerToken}`);
    }
    let options = { headers };
    return this._http.put(`${this.urlAPI}TipoRepuesto/${tiporepuesto.idtipoRepuesto}`, params, options);
  }

  // Crear un nuevo tipo de repuesto
  create(tiporepuesto: Tiporepuesto): Observable<any> {
    const bearerToken = sessionStorage.getItem('token');
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    if (bearerToken) {
      headers = headers.set('bearertoken', `${bearerToken}`);
    }
    const userJson = JSON.stringify(tiporepuesto);
    const params = 'data=' + userJson;
    const options = { headers };
    return this._http.post(`${this.urlAPI}TipoRepuesto`, params, options);
  }

}




