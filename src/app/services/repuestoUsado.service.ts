import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { server } from './global.service';
import { Repuestousados } from '../models/repuestousados';

@Injectable({
  providedIn: 'root'
})

export class RepuestoUsadosService {
  private urlAPI: string;

  constructor(private _http: HttpClient) {
    this.urlAPI = server.url;
  }

  
  getAllRepuestoUsado(): Observable<Repuestousados[]> {
    return this._http.get<Repuestousados[]>(`${this.urlAPI}RepuestoUsado`);
  }

  deleteRepuestoUsado(id:number){
    return this._http.delete(this.urlAPI+'RepuestoUsado/'+id);
  }


  updateRepuestoUsado(repuestoUsado: Repuestousados): Observable<any> {
    const userJson = JSON.stringify(repuestoUsado);
    const bearerToken = sessionStorage.getItem('token');
    let params = 'data=' + userJson;
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    if (bearerToken) {
      headers = headers.set('bearertoken', `${bearerToken}`);
    }
    let options = {
      headers
    }
    return this._http.put(this.urlAPI + 'RepuestoUsado/' + repuestoUsado.idRepuestosUsados, params, options);
  }


  create(repuestoUsado:Repuestousados):Observable<any>{
    let userJson=JSON.stringify(repuestoUsado);
    let params='data='+userJson;
    let headers=new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded');
    let options={
        headers
    }
    return this._http.post(this.urlAPI+'RepuestoUsado',params,options);
  }

}




