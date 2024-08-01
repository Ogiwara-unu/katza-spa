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


  
  getAllVehiculo(): Observable<Vehiculo[]> {
    return this._http.get<Vehiculo[]>(`${this.urlAPI}Vehiculo`);
  }


  create(vehiculo: Vehiculo): Observable<any> {
    let userJson = JSON.stringify(vehiculo);
    let params = 'data=' + userJson;
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    let options = { headers };
    return this._http.post(this.urlAPI + 'Vehiculo', params, options);
  }

  deleteVehiculo(id:number){
    return this._http.delete(this.urlAPI+'Vehiculo/'+id);
  }

  
  updateVehiculo(vehiculo: Vehiculo): Observable<any> {
    const userJson = JSON.stringify(vehiculo);
    const bearerToken = sessionStorage.getItem('token');
    let params = 'data=' + userJson;
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    if (bearerToken) {
      headers = headers.set('bearertoken', `${bearerToken}`);
    }
    let options = {
      headers
    }
    return this._http.put(this.urlAPI + 'Vehiculo/' + vehiculo.placaVehiculo, params, options);
  }



}