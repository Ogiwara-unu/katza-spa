import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Detalleprestamodispositivo } from '../models/detalleprestamodispositivo';
import { server } from './global.service';

@Injectable({
  providedIn: 'root'
})
export class DetallePrestamoDispositivoService {
  private urlAPI: string;

  constructor(private _http: HttpClient) {
    this.urlAPI = server.url;
  }


  getAllDetallePrestDispositivo(): Observable<Detalleprestamodispositivo[]> {
    const bearerToken = sessionStorage.getItem('token');
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    if (bearerToken) {
      headers = headers.set('bearertoken', `${bearerToken}`);
    }
    const options = { headers };
    return this._http.get<Detalleprestamodispositivo[]>(`${this.urlAPI}DetallePresDispositivo`, options);
  }

  create(detallePrestDispositivo: Detalleprestamodispositivo): Observable<any> {
    const params = 'data=' + JSON.stringify(detallePrestDispositivo);
    const bearerToken = sessionStorage.getItem('token');
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    if (bearerToken) {
      headers = headers.set('bearertoken', `${bearerToken}`);
    }
    const options = { headers };
    return this._http.post(`${this.urlAPI}DetallePresDispositivo`, params, options);
  }

  deleteDetallePresrDispositivo(id: number): Observable<any> {
    const bearerToken = sessionStorage.getItem('token');
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    if (bearerToken) {
      headers = headers.set('bearertoken', `${bearerToken}`);
    }
    const options = { headers };
    return this._http.delete(`${this.urlAPI}DetallePresDispositivo/${id}`, options);
  }

  updateDetallePrestDispositivo(detallePrestDispositivo: Detalleprestamodispositivo): Observable<any> {
    const params = 'data=' + JSON.stringify(detallePrestDispositivo);
    const bearerToken = sessionStorage.getItem('token');
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    if (bearerToken) {
      headers = headers.set('bearertoken', `${bearerToken}`);
    }
    const options = { headers };
    return this._http.put(`${this.urlAPI}DetallePresDispositivo/${detallePrestDispositivo.idDetallePrestamoDispositivo}`, params, options);
  }

}