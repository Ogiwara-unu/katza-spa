import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DetalleManVehiculo } from '../models/detalleManVehiculo'; 
import { server } from './global.service';

@Injectable({
  providedIn: 'root'
})
export class DetalleMantenimientoService {
  private urlAPI: string;

  constructor(private _http: HttpClient) {
    this.urlAPI = server.url;
  }

  getAllDetalleMantenimientos(): Observable<DetalleManVehiculo[]> {
    const bearerToken = sessionStorage.getItem('token');
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    if (bearerToken) {
      headers = headers.set('bearertoken', `${bearerToken}`);
    }
    const options = { headers };
    return this._http.get<DetalleManVehiculo[]>(`${this.urlAPI}DetalleManVehiculo`, options);
  }

  create(detalleMantenimiento: DetalleManVehiculo): Observable<any> {
    const bearerToken = sessionStorage.getItem('token');
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    if (bearerToken) {
      headers = headers.set('bearertoken', `${bearerToken}`);
    }
    const detalleJson = JSON.stringify(detalleMantenimiento);
    const params = 'data=' + detalleJson;
    const options = { headers };
    return this._http.post(`${this.urlAPI}DetalleManVehiculo`, params, options);
  }

  deleteDetalleMantenimiento(id: number): Observable<any> {
    const bearerToken = sessionStorage.getItem('token');
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    if (bearerToken) {
      headers = headers.set('bearertoken', `${bearerToken}`);
    }
    const options = { headers };
    return this._http.delete(`${this.urlAPI}DetalleManVehiculo/${id}`, options);
  }

  updateDetalleMantenimiento(detalleMantenimiento: DetalleManVehiculo): Observable<any> {
    const bearerToken = sessionStorage.getItem('token');
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    if (bearerToken) {
      headers = headers.set('bearertoken', `${bearerToken}`);
    }
    const detalleJson = JSON.stringify(detalleMantenimiento);
    const params = 'data=' + detalleJson;
    const options = { headers };
    return this._http.put(`${this.urlAPI}DetalleManVehiculo/${detalleMantenimiento.idDetalleMantenimiento}`, params, options);
  }
}
