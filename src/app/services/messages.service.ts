import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Global } from './global';
import { mensaje } from '../models/mensaje';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {
  public url:string;
  constructor(private _http: HttpClient) {
    this.url = Global.url
   }

   addMessage(token:any, message:any): Observable <any>{
      let params = JSON.stringify(message);
      let headers = new HttpHeaders().set("Content-type","application/json").set("Authorization", token);
      return this._http.post(this.url + 'crearMensaje', params, {headers:headers});
   }

   getMessagesReceiver(token:any, page=1):Observable<any>{
    let headers = new HttpHeaders().set("Content-type","application/json").set("Authorization", token);
    return this._http.get(this.url + 'mensajesRecibidos/' + page, {headers:headers});
   }

   getEmittMessages(token:any, page=1):Observable<any>{
    let headers = new HttpHeaders().set("Content-type","application/json").set("Authorization", token);
    return this._http.get(this.url + 'mensajesEnviados/' + page, {headers:headers});
   }
} 
