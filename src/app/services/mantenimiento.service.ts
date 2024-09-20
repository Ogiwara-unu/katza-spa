import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { server } from './global.service';
import { Mantenimiento } from '../models/mantenimiento';

@Injectable({
  providedIn: 'root'
})
export class MantenimientoService {
  private urlAPI: string;

  constructor(private _http: HttpClient) {
    this.urlAPI = server.url;
  }

  getAllMantenimientos(): Observable<Mantenimiento[]> {
    return this._http.get<Mantenimiento[]>(`${this.urlAPI}Mantenimiento`);
  }

  create(mantenimeinto:Mantenimiento):Observable<any>{
    let userJson=JSON.stringify(mantenimeinto);
    let params='data='+userJson;
    let headers=new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded');
    let options={
        headers
    }
    return this._http.post(this.urlAPI+'Mantenimiento',params,options);
  }

  deleteMantenimiento(id:number){
    return this._http.delete(this.urlAPI+'Mantenimiento/'+id);
  }

  updateMantenimiento(mantenimeinto: Mantenimiento): Observable<any> {
    const userJson = JSON.stringify(mantenimeinto);
    const bearerToken = sessionStorage.getItem('token');
    let params = 'data=' + userJson;
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    if (bearerToken) {
      headers = headers.set('bearertoken', `${bearerToken}`);
    }
    let options = {
      headers
    }
    return this._http.put(this.urlAPI + 'Mantenimiento/' + mantenimeinto.idMantenimiento, params, options);
  }

}