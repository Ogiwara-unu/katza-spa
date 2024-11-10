import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { server } from './global.service';
import { Tiporepuesto } from '../models/tiporepuesto';

@Injectable({
  providedIn: 'root'
})

export class TipoRepuestoService {
  private urlAPI: string;

  constructor(private _http: HttpClient) {
    this.urlAPI = server.url;
  }

  
  getAllTipoRepuesto(): Observable<Tiporepuesto[]> {
    return this._http.get<Tiporepuesto[]>(`${this.urlAPI}TipoRepuesto`);
  }

  deleteTipoRepuesto(id:number){
    return this._http.delete(this.urlAPI+'TipoRepuesto/'+id);
  }


  updateTipoRepuesto(tiporepuesto: Tiporepuesto): Observable<any> {
    const userJson = JSON.stringify(tiporepuesto);
    const bearerToken = sessionStorage.getItem('token');
    let params = 'data=' + userJson;
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    if (bearerToken) {
      headers = headers.set('bearertoken', `${bearerToken}`);
    }
    let options = {
      headers
    }
    return this._http.put(this.urlAPI + 'TipoRepuesto/' + tiporepuesto.idTipoRepuesto, params, options);
  }


  create(tiporepuesto:Tiporepuesto):Observable<any>{
    let userJson=JSON.stringify(tiporepuesto);
    let params='data='+userJson;
    let headers=new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded');
    let options={
        headers
    }
    return this._http.post(this.urlAPI+'TipoRepuesto',params,options);
  }

}




