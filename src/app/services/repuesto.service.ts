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
    const bearerToken = sessionStorage.getItem('token');
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    if (bearerToken) {
      headers = headers.set('bearertoken', `${bearerToken}`);
    }
    const options = { headers };
    return this._http.get<Repuesto[]>(`${this.urlAPI}Repuesto`, options);
  }

  deleteRepuesto(id: number): Observable<any> {
    const bearerToken = sessionStorage.getItem('token');
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    if (bearerToken) {
      headers = headers.set('bearertoken', `${bearerToken}`);
    }
    const options = { headers };
    return this._http.delete(`${this.urlAPI}Repuesto/${id}`, options);
  }

  updateRepuesto(repuesto: Repuesto): Observable<any> {
    const userJson = JSON.stringify(repuesto);
    const bearerToken = sessionStorage.getItem('token');
    const params = 'data=' + userJson;
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    if (bearerToken) {
      headers = headers.set('bearertoken', `${bearerToken}`);
    }
    const options = { headers };
    return this._http.put(`${this.urlAPI}Repuesto/${repuesto.idRepuesto}`, params, options);
  }

  create(repuesto: Repuesto): Observable<any> {
    const bearerToken = sessionStorage.getItem('token');
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    if (bearerToken) {
      headers = headers.set('bearertoken', `${bearerToken}`);
    }
    const userJson = JSON.stringify(repuesto);
    const params = 'data=' + userJson;
    const options = { headers };
    return this._http.post(`${this.urlAPI}Repuesto`, params, options);
  }

}




