import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Departamento } from '../models/departamento'; 
import { server } from './global.service';

@Injectable({
  providedIn: 'root'
})
export class DepartamentoService {
  private urlAPI: string;

  constructor(private _http: HttpClient) {
    this.urlAPI = server.url;
  }


  getAllDepartamentos(): Observable<Departamento[]> {
    return this._http.get<Departamento[]>(`${this.urlAPI}Departamento`);
  }


  create(departamento: Departamento): Observable<any> {
    let userJson = JSON.stringify(departamento);
    let params = 'data=' + userJson;
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    let options = { headers };
    return this._http.post(this.urlAPI + 'Departamento', params, options);
  }

  deleteDepartamento(id:number){
    return this._http.delete(this.urlAPI+'Departamento/'+id);
  }

  
  updateDepartamento(departamento: Departamento): Observable<any> {
    const userJson = JSON.stringify(departamento);
    const bearerToken = sessionStorage.getItem('token');
    let params = 'data=' + userJson;
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    if (bearerToken) {
      headers = headers.set('bearertoken', `${bearerToken}`);
    }
    let options = {
      headers
    }
    return this._http.put(this.urlAPI + 'Departamento/' + departamento.idDepartamento, params, options);
  }



  

}