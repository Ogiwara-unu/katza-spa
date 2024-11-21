import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { server } from './global.service';
import { Modelorepuesto } from '../models/modelorepuesto';

@Injectable({
  providedIn: 'root'
})

export class ModeloRepuestoService {
  private urlAPI: string;

  constructor(private _http: HttpClient) {
    this.urlAPI = server.url;
  }

  getAllTipoModeloRepuesto(): Observable<Modelorepuesto[]> {
    const bearerToken = sessionStorage.getItem('token');
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    if (bearerToken) {
      headers = headers.set('bearertoken', `${bearerToken}`);
    }
    const options = { headers };
    return this._http.get<Modelorepuesto[]>(`${this.urlAPI}ModeloRepuesto`, options);
  }

  deleteModeloRepuesto(id: number): Observable<any> {
    const bearerToken = sessionStorage.getItem('token');
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    if (bearerToken) {
      headers = headers.set('bearertoken', `${bearerToken}`);
    }
    const options = { headers };
    return this._http.delete(`${this.urlAPI}ModeloRepuesto/${id}`, options);
  }

  updateModeloRepuesto(modelorepuesto: Modelorepuesto): Observable<any> {
    const userJson = JSON.stringify(modelorepuesto);
    const bearerToken = sessionStorage.getItem('token');
    const params = 'data=' + userJson;
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    if (bearerToken) {
      headers = headers.set('bearertoken', `${bearerToken}`);
    }
    const options = { headers };
    return this._http.put(`${this.urlAPI}ModeloRepuesto/${modelorepuesto.idModeloRepuesto}`, params, options);
  }

  create(modelorepuesto: Modelorepuesto): Observable<any> {
    const bearerToken = sessionStorage.getItem('token');
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    if (bearerToken) {
      headers = headers.set('bearertoken', `${bearerToken}`);
    }
    const userJson = JSON.stringify(modelorepuesto);
    const params = 'data=' + userJson;
    const options = { headers };
    return this._http.post(`${this.urlAPI}ModeloRepuesto`, params, options);
  }
}




