import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { server } from './global.service';
import { Prestamo } from '../models/prestamo';

@Injectable({
  providedIn: 'root'
})

export class PrestamoService {
  private urlAPI: string;

  constructor(private _http: HttpClient) {
    this.urlAPI = server.url;
  }

  
  getAllPrestamo(): Observable<Prestamo[]> {
    const bearerToken = sessionStorage.getItem('token');
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    if (bearerToken) {
      headers = headers.set('bearertoken', `${bearerToken}`);
    }
    const options = { headers };
    return this._http.get<Prestamo[]>(`${this.urlAPI}Prestamo`, options);
  }

  deletePrestamo(id: number): Observable<any> {
    const bearerToken = sessionStorage.getItem('token');
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    if (bearerToken) {
      headers = headers.set('bearertoken', `${bearerToken}`);
    }
    const options = { headers };
    return this._http.delete(`${this.urlAPI}Prestamo/${id}`, options);
  }

  updatePrestamo(prestamo: Prestamo): Observable<any> {
    const userJson = JSON.stringify(prestamo);
    const bearerToken = sessionStorage.getItem('token');
    const params = 'data=' + userJson;
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    if (bearerToken) {
      headers = headers.set('bearertoken', `${bearerToken}`);
    }
    const options = { headers };
    return this._http.put(`${this.urlAPI}Prestamo/${prestamo.idPrestamo}`, params, options);
  }

  create(prestamo: Prestamo): Observable<any> {
    const bearerToken = sessionStorage.getItem('token');
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    if (bearerToken) {
      headers = headers.set('bearertoken', `${bearerToken}`);
    }
    const userJson = JSON.stringify(prestamo);
    const params = 'data=' + userJson;
    const options = { headers };
    return this._http.post(`${this.urlAPI}Prestamo`, params, options);
  }

}




