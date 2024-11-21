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
    const bearerToken = sessionStorage.getItem('token');
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    if (bearerToken) {
      headers = headers.set('bearertoken', `${bearerToken}`);
    }
    const options = { headers };
    return this._http.get<Repuestousados[]>(`${this.urlAPI}RepuestoUsado`, options);
  }

  deleteRepuestoUsado(id: number): Observable<any> {
    const bearerToken = sessionStorage.getItem('token');
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    if (bearerToken) {
      headers = headers.set('bearertoken', `${bearerToken}`);
    }
    const options = { headers };
    return this._http.delete(`${this.urlAPI}RepuestoUsado/${id}`, options);
  }

  updateRepuestoUsado(repuestoUsado: Repuestousados): Observable<any> {
    const userJson = JSON.stringify(repuestoUsado);
    const bearerToken = sessionStorage.getItem('token');
    const params = 'data=' + userJson;
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    if (bearerToken) {
      headers = headers.set('bearertoken', `${bearerToken}`);
    }
    const options = { headers };
    return this._http.put(`${this.urlAPI}RepuestoUsado/${repuestoUsado.idRepuestosUsados}`, params, options);
  }

  create(repuestoUsado: Repuestousados): Observable<any> {
    const bearerToken = sessionStorage.getItem('token');
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    if (bearerToken) {
      headers = headers.set('bearertoken', `${bearerToken}`);
    }
    const userJson = JSON.stringify(repuestoUsado);
    const params = 'data=' + userJson;
    const options = { headers };
    return this._http.post(`${this.urlAPI}RepuestoUsado`, params, options);
  }

}




