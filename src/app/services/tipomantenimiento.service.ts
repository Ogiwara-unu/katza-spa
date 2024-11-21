import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { server } from './global.service';
import { TipoMantenimiento } from '../models/tipoMantenimiento';

@Injectable({
  providedIn: 'root'
})

export class TipomantenimientoService {
  private urlAPI: string;

  constructor(private _http: HttpClient) {
    this.urlAPI = server.url;
  }

  
  getAllTipoMantenimientos(): Observable<TipoMantenimiento[]> {
    const bearerToken = sessionStorage.getItem('token');
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    if (bearerToken) {
      headers = headers.set('bearertoken', `${bearerToken}`);
    }
    const options = { headers };
    return this._http.get<TipoMantenimiento[]>(`${this.urlAPI}TipoMantenimiento`, options);
  }

  deleteTipoMantenimiento(id: number): Observable<any> {
    const bearerToken = sessionStorage.getItem('token');
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    if (bearerToken) {
      headers = headers.set('bearertoken', `${bearerToken}`);
    }
    const options = { headers };
    return this._http.delete(`${this.urlAPI}TipoMantenimiento/${id}`, options);
  }

  updateTipoMantenimiento(tipoMantenimiento: TipoMantenimiento): Observable<any> {
    const bearerToken = sessionStorage.getItem('token');
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    if (bearerToken) {
      headers = headers.set('bearertoken', `${bearerToken}`);
    }
    const userJson = JSON.stringify(tipoMantenimiento);
    const params = 'data=' + userJson;
    const options = { headers };
    return this._http.put(`${this.urlAPI}TipoMantenimiento/${tipoMantenimiento.idTipoMantenimiento}`, params, options);
  }

  create(tipoMantenimiento: TipoMantenimiento): Observable<any> {
    const bearerToken = sessionStorage.getItem('token');
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    if (bearerToken) {
      headers = headers.set('bearertoken', `${bearerToken}`);
    }
    const userJson = JSON.stringify(tipoMantenimiento);
    const params = 'data=' + userJson;
    const options = { headers };
    return this._http.post(`${this.urlAPI}TipoMantenimiento`, params, options);
  }

}




