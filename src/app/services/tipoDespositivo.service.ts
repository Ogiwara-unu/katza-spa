import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { server } from './global.service';
import { Tipodispositivo } from '../models/tipodispositivo';

@Injectable({
  providedIn: 'root'
})


export class TipoDispositivoService {
  private urlAPI: string;


constructor(private _http: HttpClient) {
    this.urlAPI = server.url;
  }

  create(tipoDispositivo: Tipodispositivo): Observable<any> {
    const bearerToken = sessionStorage.getItem('token');
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    if (bearerToken) {
      headers = headers.set('bearertoken', `${bearerToken}`);
    }
    const userJson = JSON.stringify(tipoDispositivo);
    const params = 'data=' + userJson;
    const options = { headers };
    return this._http.post(`${this.urlAPI}TipoDispositivo`, params, options);
  }

  getAllTipoDispositivo(): Observable<Tipodispositivo[]> {
    const bearerToken = sessionStorage.getItem('token');
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    if (bearerToken) {
      headers = headers.set('bearertoken', `${bearerToken}`);
    }
    const options = { headers };
    return this._http.get<Tipodispositivo[]>(`${this.urlAPI}TipoDispositivo`, options);
  }

  deleteTipoDispositivo(id: number): Observable<any> {
    const bearerToken = sessionStorage.getItem('token');
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    if (bearerToken) {
      headers = headers.set('bearertoken', `${bearerToken}`);
    }
    const options = { headers };
    return this._http.delete(`${this.urlAPI}TipoDispositivo/${id}`, options);
  }

  updateTipoDispositivo(tipoDispositivo: Tipodispositivo): Observable<any> {
    const userJson = JSON.stringify(tipoDispositivo);
    const params = 'data=' + userJson;
    const bearerToken = sessionStorage.getItem('token');
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    if (bearerToken) {
      headers = headers.set('bearertoken', `${bearerToken}`);
    }
    const options = { headers };
    return this._http.put(`${this.urlAPI}TipoDispositivo/${tipoDispositivo.idTipoDispositivo}`, params, options);
  }

}