import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UsuarioService } from './usuario.service';
import { Global } from './global';

@Injectable({
  providedIn: 'root'
})
export class PublicacionService {
  public url:string
 

  constructor(private _http: HttpClient) { 
    this.url = Global.url; 
  }

  addPublication(token:any, publication:any): Observable<any>{
    let params = JSON.stringify(publication);
    let headers = new HttpHeaders().set("Content-type", "application/json").set("Authorization", token);
    return this._http.post(this.url + 'guardarPublicacion', params, {headers: headers} );
  }

  deletePublication(token:any, id:any):Observable<any>{
    let headers = new HttpHeaders().set("Content-type", "application/json").set("Authorization", token);
    return this._http.delete(this.url + 'eliminarPublication/' + id, {headers:headers})
  }

  getPublications(token:any, page:any = 1, ):Observable<any>{
    let headers = new HttpHeaders().set("Content-type", "application/json").set("Authorization", token);
    return this._http.get(this.url + 'obtenerPublications/' + page, {headers:headers})
  }

  getPublicationsUser(token:any, iduser:any, page:any=1): Observable<any>{
    let headers = new HttpHeaders().set("Content-type", "json/application").set("Authorization", token);
    if(page!= 1){
      return this._http.get(this.url + 'obtenerPublicacionUser/'  + iduser + "/" + page, {headers: headers})

    }else{
      return this._http.get(this.url + 'obtenerPublicacionUser/' + iduser, {headers: headers})
    }
  }
}
