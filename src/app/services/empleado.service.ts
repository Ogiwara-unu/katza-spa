import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { server } from './global.service';
import { Empleado } from '../models/empleado';

@Injectable({
  providedIn: 'root'
})


export class EmpleadoService {
  private urlAPI: string;


constructor(private _http: HttpClient) {
    this.urlAPI = server.url;
  }


  create(empleado:Empleado):Observable<any>{
    let userJson=JSON.stringify(empleado);
    let params='data='+userJson;
    let headers=new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded');
    let options={
        headers
    }
    return this._http.post(this.urlAPI+'Empleado',params,options);
  }

  
  getAllEmpleados(): Observable<Empleado[]> {
    return this._http.get<Empleado[]>(`${this.urlAPI}Empleado`);
  }
  
  deleteEmpleado(id:number){
    return this._http.delete(this.urlAPI+'Empleado/'+id);
  }

  
  updateEmpleado(empleado: Empleado): Observable<any> {
    const userJson = JSON.stringify(empleado);
    const bearerToken = sessionStorage.getItem('token');
    let params = 'data=' + userJson;
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    let options = {
      headers
    }
    return this._http.put(this.urlAPI + 'Empleado/' + empleado.idEmpleado, params, options);
  }




}