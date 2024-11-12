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


  create(detallePresVehiculo:Detalleprestamovehiculo):Observable<any>{
    let userJson=JSON.stringify(detallePresVehiculo);
    let params='data='+userJson;
    let headers=new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded');
    let options={
        headers
    }
    return this._http.post(this.urlAPI+'DetallePresVehiculo',params,options);
  }

  
  getAllDetallePresVehiculo(): Observable<Detalleprestamovehiculo[]> {
    return this._http.get<Detalleprestamovehiculo[]>(`${this.urlAPI}DetallePresVehiculo`);
  }
  
  deleteDetallePresVehiculo(id:number){
    return this._http.delete(this.urlAPI+'DetallePresVehiculo/'+id);
  }

  
  updateDetallePresVehiculo(detallePresVehiculo: Detalleprestamovehiculo): Observable<any> {
    const userJson = JSON.stringify(detallePresVehiculo);
    const bearerToken = sessionStorage.getItem('token');
    let params = 'data=' + userJson;
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    let options = {
      headers
    }
    return this._http.put(this.urlAPI + 'DetallePresVehiculo/' + detallePresVehiculo.idDetallePrestamo, params, options);
  }

}