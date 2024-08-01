import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { server } from './global';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private urlAPI: string;

  constructor(private _http: HttpClient) {
    this.urlAPI = server.url;
  }

  login(user: User): Observable<any> {
    const params = new URLSearchParams();
    params.set('data', JSON.stringify(user));
    const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    const options = {
      headers,
    };
    return this._http.post(this.urlAPI + 'user/login', params.toString(), options);
  }

  getIdentityFromAPI():Observable<any>{
    let headers;
    let bearerToken=sessionStorage.getItem('token');
    if(bearerToken){
        headers=new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded')
                                .set('bearertoken',bearerToken);            
    }else{
        headers=new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded');            
    }
    let options={
        headers
    }
    return this._http.get(this.urlAPI+'user/getIndetity',options); 
  }



  getAllUsers(): Observable<User[]> {
    const bearerToken = sessionStorage.getItem('token');
    let headers = new HttpHeaders();
    if (bearerToken) {
      headers = headers.set('bearertoken', `${bearerToken}`);
    }

    return this._http.get<User[]>(`${this.urlAPI}user`, { headers });
  }


  create(user:User):Observable<any>{
    let userJson=JSON.stringify(user);
    let params='data='+userJson;
    let headers=new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded');
    let options={
        headers
    }
    return this._http.post(this.urlAPI+'user',params,options);
  }

  deleteUser(id:number){
    const bearerToken = sessionStorage.getItem('token');
    let headers = new HttpHeaders();
    if (bearerToken) {
      headers = headers.set('bearertoken', `${bearerToken}`);
    }

    return this._http.delete(this.urlAPI+'user/'+id,{ headers });
  }
  updateUser(user: User): Observable<any> {
    const userJson = JSON.stringify(user);
    const bearerToken = sessionStorage.getItem('token');
    let params = 'data=' + userJson;
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    if (bearerToken) {
      headers = headers.set('bearertoken', `${bearerToken}`);
    }
    let options = {
      headers
    }
    return this._http.put(this.urlAPI + 'user/' + user.id, params, options);
  }
  
  upLoadImage(image: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file0', image, image.name);

    const bearerToken = sessionStorage.getItem('token');
    let headers = new HttpHeaders();
    if (bearerToken) {
      headers = headers.set('bearertoken', `${bearerToken}`);
    }

    return this._http.post(this.urlAPI+'user/uploadImage', formData, { headers });
  }

  deleteImage(filename: string): Observable<any> {
    const bearerToken = sessionStorage.getItem('token');
    let headers = new HttpHeaders();
    if (bearerToken) {
      headers = headers.set('bearertoken', `${bearerToken}`);
    }

    return this._http.delete(`${this.urlAPI}user/deleteImage/${filename}`, { headers });
  }

}
