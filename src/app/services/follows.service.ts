import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Global } from './global';
import { seguimiento } from '../models/seguimiento';


@Injectable({
  providedIn: 'root'
})
export class FollowsService {
  public url:string;
  constructor(private _http: HttpClient) {
    this.url = Global.url;
   }

   addFollow(token:any, follow:any): Observable<any>{
    let params = JSON.stringify(follow);
    let headers = new HttpHeaders().set("Content-type", "application/json").set("Authorization", token)

    return this._http.post(this.url + 'registroFollow', params, {headers: headers} )
   }

   deleteFollow(token:any, id_user:any): Observable<any>{
    let headers = new HttpHeaders().set("Content-type", "application/json").set("Authorization", token)
    return this._http.delete(this.url + 'eliminarFollow/' + id_user, {headers: headers} )
   }

   getFollowing(token:any, userId=null, page=1):Observable<any>{
    let headers = new HttpHeaders().set("Content-type", "json").set("Authorization", token);
    
    let url = this.url + 'obtenerFollow/';
    if(userId != null){
      url = this.url + 'obtenerFollow/' + userId + "/"+ page; 
    }
    return this._http.get(url, {headers:headers});
   }

   getFollowed(token:any, userid = null, page:any=1):Observable<any>{
    let headers = new HttpHeaders().set("Content-type", "application/json").set("Authorization", token);
    return this._http.get(this.url + 'obtenerFollowers/' + userid + "/" + page, {headers:headers} )
   }

   getMyFollows(token:any, ):Observable<any>{
    let headers = new HttpHeaders().set("Content-type", "application/json").set("Authorization", token)
    return this._http.get(this.url + 'obteneMisFollows/true', {headers:headers});
  }
}
