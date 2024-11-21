import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { server } from './global.service';
import { Marcarepuesto } from '../models/marcarepuesto';

@Injectable({
  providedIn: 'root'
})

export class MarcaRepuestoService {
  private urlAPI: string;

  constructor(private _http: HttpClient) {
    this.urlAPI = server.url;
  }

  
  getAllTipoMarcaRepuesto(): Observable<Marcarepuesto[]> {
    const bearerToken = sessionStorage.getItem('token');
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    if (bearerToken) {
      headers = headers.set('bearertoken', `${bearerToken}`);
    }
    const options = { headers };
    return this._http.get<Marcarepuesto[]>(`${this.urlAPI}MarcaRepuesto`, options);
  }

  deleteMarcaRepuesto(id: number): Observable<any> {
    const bearerToken = sessionStorage.getItem('token');
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    if (bearerToken) {
      headers = headers.set('bearertoken', `${bearerToken}`);
    }
    const options = { headers };
    return this._http.delete(`${this.urlAPI}MarcaRepuesto/${id}`, options);
  }

  updateMarcaRepuesto(marcarepuesto: Marcarepuesto): Observable<any> {
    const bearerToken = sessionStorage.getItem('token');
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    if (bearerToken) {
      headers = headers.set('bearertoken', `${bearerToken}`);
    }
    const userJson = JSON.stringify(marcarepuesto);
    const params = 'data=' + userJson;
    const options = { headers };
    return this._http.put(`${this.urlAPI}MarcaRepuesto/${marcarepuesto.idMarcaRepuesto}`, params, options);
  }

  create(marcarepuesto: Marcarepuesto): Observable<any> {
    const bearerToken = sessionStorage.getItem('token');
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    if (bearerToken) {
      headers = headers.set('bearertoken', `${bearerToken}`);
    }
    const userJson = JSON.stringify(marcarepuesto);
    const params = 'data=' + userJson;
    const options = { headers };
    return this._http.post(`${this.urlAPI}MarcaRepuesto`, params, options);
  }

}




