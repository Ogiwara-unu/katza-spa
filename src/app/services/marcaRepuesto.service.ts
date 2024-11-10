import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { server } from './global.service';
import { Marcarepuesto } from '../models/marcarepuesto';

@Injectable({
  providedIn: 'root'
})

export class MarcaRepuestoService {
  private urlAPI: string;

  constructor(private _http: HttpClient) {
    this.urlAPI = server.url;
  }

  
  getAllTipoMarcaRepuesto(): Observable<Marcarepuesto[]> {
    return this._http.get<Marcarepuesto[]>(`${this.urlAPI}MarcaRepuesto`);
  }

  deleteMarcaRepuesto(id:number){
    return this._http.delete(this.urlAPI+'MarcaRepuesto/'+id);
  }


  updateMarcaRepuesto(marcarepuesto: Marcarepuesto): Observable<any> {
    const userJson = JSON.stringify(marcarepuesto);
    const bearerToken = sessionStorage.getItem('token');
    let params = 'data=' + userJson;
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    if (bearerToken) {
      headers = headers.set('bearertoken', `${bearerToken}`);
    }
    let options = {
      headers
    }
    return this._http.put(this.urlAPI + 'MarcaRepuesto/' + marcarepuesto.idMarcaRepuesto, params, options);
  }


  create(marcarepuesto:Marcarepuesto):Observable<any>{
    let userJson=JSON.stringify(marcarepuesto);
    let params='data='+userJson;
    let headers=new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded');
    let options={
        headers
    }
    return this._http.post(this.urlAPI+'MarcaRepuesto',params,options);
  }

}




