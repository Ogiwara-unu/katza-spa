import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { server } from './global.service';
import { Dispositivos } from '../models/dispositivos';

@Injectable({
  providedIn: 'root'
})

export class DispositivoService {
  private urlAPI: string;

  constructor(private _http: HttpClient) {
    this.urlAPI = server.url;
  }

  
  getAllDispositivos(): Observable<Dispositivos[]> {
    return this._http.get<Dispositivos[]>(`${this.urlAPI}Dispositivo`);
  }

  deleteDispositivos(id:number){
    return this._http.delete(this.urlAPI+'Dispositivo/'+id);
  }


  updateDispositivos(dispositivos: Dispositivos): Observable<any> {
    const userJson = JSON.stringify(dispositivos);
    const bearerToken = sessionStorage.getItem('token');
    let params = 'data=' + userJson;
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    if (bearerToken) {
      headers = headers.set('bearertoken', `${bearerToken}`);
    }
    let options = {
      headers
    }
    return this._http.put(this.urlAPI + 'Dispositivo/' + dispositivos.idDispositivos, params, options);
  }


  create(dispositivos:Dispositivos):Observable<any>{
    let userJson=JSON.stringify(dispositivos);
    let params='data='+userJson;
    let headers=new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded');
    let options={
        headers
    }
    return this._http.post(this.urlAPI+'Dispositivo',params,options);
  }

}




