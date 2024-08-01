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
    return this._http.get<DetalleManVehiculo[]>(`${this.urlAPI}DetalleManVehiculo`);
  }

  create(detalleMantenimiento: DetalleManVehiculo): Observable<any> {
    let detalleJson = JSON.stringify(detalleMantenimiento);
    let params = 'data=' + detalleJson;
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    let options = { headers };
    return this._http.post(this.urlAPI + 'DetalleManVehiculo', params, options);
  }

  deleteDetalleMantenimiento(id: number): Observable<any> {
    return this._http.delete(`${this.urlAPI}DetalleManVehiculo/${id}`);
  }

  updateDetalleMantenimiento(detalleMantenimiento: DetalleManVehiculo): Observable<any> {
    const detalleJson = JSON.stringify(detalleMantenimiento);
    const bearerToken = sessionStorage.getItem('token');
    let params = 'data=' + detalleJson;
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    if (bearerToken) {
      headers = headers.set('bearertoken', `${bearerToken}`);
    }
    let options = { headers };
    return this._http.put(`${this.urlAPI}DetalleManVehiculo/${detalleMantenimiento.idDetalleMantenimiento}`, params, options);
  }
}
