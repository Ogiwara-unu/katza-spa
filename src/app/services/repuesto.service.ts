import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { server } from './global.service';
import { Repuesto } from '../models/repuesto'; 

@Injectable({
  providedIn: 'root'
})

export class RepuestoService {
  private urlAPI: string;

  constructor(private _http: HttpClient) {
    this.urlAPI = server.url;
  }

  
  getAllRepuesto(): Observable<Repuesto[]> {
    return this._http.get<Repuesto[]>(`${this.urlAPI}Repuesto`);
  }

  deleteRepuesto(id:number){
    return this._http.delete(this.urlAPI+'Repuesto/'+id);
  }


  updateRepuesto(repuesto: Repuesto): Observable<any> {
    const userJson = JSON.stringify(repuesto);
    const bearerToken = sessionStorage.getItem('token');
    let params = 'data=' + userJson;
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    if (bearerToken) {
      headers = headers.set('bearertoken', `${bearerToken}`);
    }
    let options = {
      headers
    }
    return this._http.put(this.urlAPI + 'Repuesto/' + repuesto.idRepuesto, params, options);
  }


  create(repuesto:Repuesto):Observable<any>{
    let userJson=JSON.stringify(repuesto);
    let params='data='+userJson;
    let headers=new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded');
    let options={
        headers
    }
    return this._http.post(this.urlAPI+'Repuesto',params,options);
  }

}




