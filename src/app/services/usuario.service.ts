import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { usuario } from '../models/usuario';
import { Global } from './global';


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  public url: string;
  public identidad: any;
  public token: any;
  public stast:any;
  constructor(public _http: HttpClient) {
    this.url = Global.url;
    this.identidad;
    this.token;
  }

  register(user: usuario): Observable<any> {
    let params = JSON.stringify(user);
    let header = new HttpHeaders().set("Content-type", "application/json");
    return this._http.post(this.url + "registro", params, { headers: header });
  }

  login(usuario: any, getToken: string): Observable<any> {
    usuario.getToken = getToken;

    let params = JSON.stringify(usuario);
    let headers = new HttpHeaders().set("Content-Type", "application/json");

    return this._http.post(this.url + "login", params, { headers: headers });
  }

  editUser(usuario:usuario): Observable<any>{
    let params = JSON.stringify(usuario);
    let headers = new HttpHeaders().set("Content-type", "application/json").set("Authorization", this.getToken());

    return this._http.put(this.url + "editarUsuario/" + usuario._id, params, {headers:headers});
  }

  getUsers(page:any = null):Observable<any>{
    let headers = new HttpHeaders().set("Content-type", "application/json").set("Authorization", this.getToken());

    return this._http.get(this.url + 'usuarios/'+ page , {headers:headers} );
  }

  getUser(iduser:any, token:any):Observable<any>{
    let header = new HttpHeaders().set("Content-type", "application/json").set("Authorization", token);
    return this._http.get(this.url + 'usuario/' + iduser, {headers:header});
  }

  getCouter(userId:any = null): Observable<any> {
    let headers = new HttpHeaders().set("Content-Type", "application/json").set("Authorization", this.getToken());

    if (userId != null) {
      return this._http.get(this.url + "getCounters/" + userId, { headers: headers })
    } else {
      return this._http.get(this.url + "getCounters", { headers: headers })
    }

  }

  getIdentity() {
    let usuarioString = localStorage.getItem("usuario");

    if (usuarioString != null) {
      this.identidad = JSON.parse(usuarioString);
    } else {
      this.identidad = null;
    }

    return this.identidad

  }

  getStast() {
    let stast =   localStorage.getItem("stats");
    if(stast != null){
      this.stast = JSON.parse(stast);
    }else{
      this.stast = null;
    }

    return this.stast;
  }

  getToken() {
    let token = localStorage.getItem("token");

    if (token != null) {
      this.token = token
    } else {
      this.token = null;
    }
    return this.token;
  }




}
