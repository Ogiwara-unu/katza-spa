import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { server } from './global.service';
import { DetalleManVehiculo } from '../models/detalleManVehiculo';
import { Detalleprestamovehiculo } from '../models/detalleprestamovehiculo';

@Injectable({
  providedIn: 'root'
})


export class detalleprestamovehiculoService {
  private urlAPI: string;


constructor(private _http: HttpClient) {
    this.urlAPI = server.url;
  }


  create(detallePresVehiculo: Detalleprestamovehiculo): Observable<any> {
    const params = 'data=' + JSON.stringify(detallePresVehiculo);
    const bearerToken = sessionStorage.getItem('token');
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    if (bearerToken) {
      headers = headers.set('bearertoken', `${bearerToken}`);
    }
    const options = { headers };
    return this._http.post(`${this.urlAPI}DetallePresVehiculo`, params, options);
  }

  getAllDetallePresVehiculo(): Observable<Detalleprestamovehiculo[]> {
    const bearerToken = sessionStorage.getItem('token');
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    if (bearerToken) {
      headers = headers.set('bearertoken', `${bearerToken}`);
    }
    const options = { headers };
    return this._http.get<Detalleprestamovehiculo[]>(`${this.urlAPI}DetallePresVehiculo`, options);
  }

  deleteDetallePresVehiculo(id: number): Observable<any> {
    const bearerToken = sessionStorage.getItem('token');
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    if (bearerToken) {
      headers = headers.set('bearertoken', `${bearerToken}`);
    }
    const options = { headers };
    return this._http.delete(`${this.urlAPI}DetallePresVehiculo/${id}`, options);
  }

  updateDetallePresVehiculo(detallePresVehiculo: Detalleprestamovehiculo): Observable<any> {
    const params = 'data=' + JSON.stringify(detallePresVehiculo);
    const bearerToken = sessionStorage.getItem('token');
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    if (bearerToken) {
      headers = headers.set('bearertoken', `${bearerToken}`);
    }
    const options = { headers };
    return this._http.put(`${this.urlAPI}DetallePresVehiculo/${detallePresVehiculo.idDetallePrestamo}`, params, options);
  }

}