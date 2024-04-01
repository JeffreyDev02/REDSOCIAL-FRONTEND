import { Component,DoCheck, OnInit } from '@angular/core';
import { UsuarioService } from './services/usuario.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Global } from './services/global';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers : [UsuarioService]
})
export class AppComponent implements OnInit, DoCheck {
  public title:string;
  public identidad:any;
  public toke:any;
  public stast:any
  public url:string;


  constructor(private _userService: UsuarioService, private _route:ActivatedRoute, private _router:Router){
    this.title = 'NGSOCIAL';
    this.url = Global.url;
  }
  ngOnInit(){
    this.identidad = this._userService.getIdentity();
    this.toke = this._userService.getToken();
  }

  ngDoCheck(){
    this.identidad = this._userService.getIdentity();
   
  }

  loguot(){
    setTimeout(()=>{
      this.identidad = localStorage.clear();
      this._router.navigate(['/login']);
   
    }, 2000)
  }
}
