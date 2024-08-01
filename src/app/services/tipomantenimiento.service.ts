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
    return this._http.get<TipoMantenimiento[]>(`${this.urlAPI}TipoMantenimiento`);
  }

  deleteTipoMantenimiento(id:number){
    return this._http.delete(this.urlAPI+'TipoMantenimiento/'+id);
  }


  updateTipoMantenimiento(tipoMantenimeinto: TipoMantenimiento): Observable<any> {
    const userJson = JSON.stringify(tipoMantenimeinto);
    const bearerToken = sessionStorage.getItem('token');
    let params = 'data=' + userJson;
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    if (bearerToken) {
      headers = headers.set('bearertoken', `${bearerToken}`);
    }
    let options = {
      headers
    }
    return this._http.put(this.urlAPI + 'TipoMantenimiento/' + tipoMantenimeinto.idTipoMantenimiento, params, options);
  }


  create(tipoMantenimiento:TipoMantenimiento):Observable<any>{
    let userJson=JSON.stringify(tipoMantenimiento);
    let params='data='+userJson;
    let headers=new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded');
    let options={
        headers
    }
    return this._http.post(this.urlAPI+'TipoMantenimiento',params,options);
  }

}




