import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { server } from './global.service';
import { Vehiculo } from '../models/vehiculo';
@Injectable({
  providedIn: 'root'
})
export class VehiculoService {
  private urlAPI: string;

  constructor(private _http: HttpClient) {
    this.urlAPI = server.url;
  }

  // Obtener todos los vehículos
  getAllVehiculo(): Observable<Vehiculo[]> {
    const bearerToken = sessionStorage.getItem('token');
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    if (bearerToken) {
      headers = headers.set('bearertoken', `${bearerToken}`);
    }
    let options = { headers };
    return this._http.get<Vehiculo[]>(`${this.urlAPI}Vehiculo`, options);
  }

  // Crear un nuevo vehículo
  create(vehiculo: Vehiculo): Observable<any> {
    const bearerToken = sessionStorage.getItem('token');
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    if (bearerToken) {
      headers = headers.set('bearertoken', `${bearerToken}`);
    }
    const userJson = JSON.stringify(vehiculo);
    const params = 'data=' + userJson;
    const options = { headers };
    return this._http.post(`${this.urlAPI}Vehiculo`, params, options);
  }

  // Eliminar un vehículo por ID
  deleteVehiculo(id: number): Observable<any> {
    const bearerToken = sessionStorage.getItem('token');
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    if (bearerToken) {
      headers = headers.set('bearertoken', `${bearerToken}`);
    }
    let options = { headers };
    return this._http.delete(`${this.urlAPI}Vehiculo/${id}`, options);
  }

  // Actualizar un vehículo
  updateVehiculo(vehiculo: Vehiculo): Observable<any> {
    const userJson = JSON.stringify(vehiculo);
    const params = 'data=' + userJson;
    const bearerToken = sessionStorage.getItem('token');
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    if (bearerToken) {
      headers = headers.set('bearertoken', `${bearerToken}`);
    }
    let options = { headers };
    return this._http.put(`${this.urlAPI}Vehiculo/${vehiculo.placaVehiculo}`, params, options);
  }

}