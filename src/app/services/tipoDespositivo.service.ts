import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { server } from './global.service';
import { Tipodispositivo } from '../models/tipodispositivo';

@Injectable({
  providedIn: 'root'
})


export class TipoDispositivoService {
  private urlAPI: string;


constructor(private _http: HttpClient) {
    this.urlAPI = server.url;
  }


  create(tipoDispositivo:Tipodispositivo):Observable<any>{
    let userJson=JSON.stringify(tipoDispositivo);
    let params='data='+userJson;
    let headers=new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded');
    let options={
        headers
    }
    return this._http.post(this.urlAPI+'TipoDispositivo',params,options);
  }

  
  getAllTipoDispositivo(): Observable<Tipodispositivo[]> {
    return this._http.get<Tipodispositivo[]>(`${this.urlAPI}TipoDispositivo`);
  }
  
  deleteTipoDispositivo(id:number){
    return this._http.delete(this.urlAPI+'TipoDispositivo/'+id);
  }

  
  updateTipoDispositivo(tipoDispositivo: Tipodispositivo): Observable<any> {
    const userJson = JSON.stringify(tipoDispositivo);
    const bearerToken = sessionStorage.getItem('token');
    let params = 'data=' + userJson;
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    let options = {
      headers
    }
    return this._http.put(this.urlAPI + 'TipoDispositivo/' + tipoDispositivo.idTipoDispositivo, params, options);
  }




}