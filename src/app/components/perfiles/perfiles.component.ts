import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { UsuarioService } from '../../services/usuario.service';
import { FollowsService } from '../../services/follows.service';
import { PublicacionService } from '../../services/publicacion.service';
import { Global } from '../../services/global';
import { usuario } from '../../models/usuario';
import { seguimiento } from '../../models/seguimiento';

@Component({
  selector: 'app-perfiles',
  templateUrl: './perfiles.component.html',
  styleUrl: './perfiles.component.css',
  providers: [UsuarioService, FollowsService, PublicacionService]
})
export class PerfilesComponent implements OnInit{
  public title:string;
  public token:any;
  public identidad:any;
  public stats:any;
  public page:any;
  public totalPage:any;
  public url:string;
  public userId:any
  public usuario: usuario;
  public seguimiento: any;
  public following:any;
  public followed:any;

  public seguidores:any;
  public seguidos:any;
  public publicacionesId:any;
 
  
  


  constructor(private _router:Router, private _route:ActivatedRoute, private _usuarioService: UsuarioService, private _followService: FollowsService, private _publicationService: PublicacionService){
    this.title = "Perfiles";
    this.page = 1;
    this.url = Global.url;
    this.usuario = 
    this.token = this._usuarioService.getToken();
    this.identidad = this._usuarioService.getIdentity();
    this.usuario = new usuario("","","","","","","","")
    this.followed = false;
    this.following = false;
    this.seguidos = [];
    this.stats = {};
    this.publicacionesId = []
  }

  ngOnInit(): void {
    this.obtenerId();
    this.ObtenerUsuariosFollow();
  }

  obtenerId() {
    this._route.params.subscribe(params => {
      let id = params['id'];
      this.userId = id;

      if(id){
        this.obtenerUsuario(this.userId) 
      }else{
        this._router.navigate(['/home']);
      }         
    })
  }


  obtenerUsuario(idUser:any) {
    this._usuarioService.getUser(idUser, this.token).subscribe(
      res=>{
        if(!res.usuario){
          this._router.navigate(['/home']);
        }else{
          this.usuario = res.usuario;
          (res.following && res.following._id) ? this.following = true : this.following = false;
          (res.followed && res.followed._id) ? this.followed = true : this.followed = false;
          this.obtenerStast();
          this.obtenerPublicacionesUSer(this.page);
        } 
      },
      error =>{
        console.log(error);
        this._router.navigate(['/home']);
      }
    )
  }

  seguirUsuario (iduser:any){
    let followed = new seguimiento("", this.identidad._id, iduser )
    this._followService.addFollow(this.token,  followed).subscribe(
      res=>{
        this.seguidos.push(iduser)
        this.stats.followed += 1; 
      },
      error=>{
        error.log(error)
      }
    )
  }

  eliminarSeguidor(iduser:any){
    this._followService.deleteFollow(this.token, iduser).subscribe(
      res=>{
        let index = this.seguidos.indexOf(iduser);
        this.seguidos.splice(index, 1);
        this.stats.followed -= 1; 
      },
      error=>{

      }
    )
  }

  ObtenerUsuariosFollow(){
    this._usuarioService.getUsers().subscribe(
      res=>{
        this.seguidos = res.usuario_following;
        this.seguidores = res.usuario_followed;
        
        this.seguidores.forEach((element:any) => {
          if(element == this.userId){
            this.followed = true
          }
        });
        
      },
      error=>{
        console.log(error);
      }
    )
  }

  public folloeUserOver:any;
  mouseEnter(user_id:any){
    this.folloeUserOver = user_id;
  }
  

  mouseLeave(user_id:any){
    this.folloeUserOver = 0;
  }

  obtenerStast(){
    this._usuarioService.getCouter(this.userId).subscribe(
      res=>{
        this.stats = res;
        },
      err=>{
        console.log(err)
      }
    )
  }

  obtenerPublicacionesUSer(page:any=1){
    this._publicationService.getPublicationsUser(this.token, this.userId, page ).subscribe(
      res=>{
        
        this.totalPage = res.totalPage;
        if(this.page == 1){
          this.publicacionesId = res.publicaciones;
        }else{
         
          let arrayA = this.publicacionesId;
          let arrayB = res.publicaciones;
          this.publicacionesId = arrayA.concat(arrayB);
        }
        
      },
      err=>{
        console.log(<any>err);
      }
    )
  }

  getTimestamp(timestamp: any) {

    const fecha: any = new Date(timestamp * 1000);
    const fechaActual: any = new Date();
    let transcurrido: any;

    const tiempoTranscurrido: any = fechaActual - fecha;
    const tiempoTranscurridoSeg = Math.floor(tiempoTranscurrido / 1000)


    const dias = Math.floor(tiempoTranscurridoSeg / (24 * 3600));
    const horas = Math.floor((tiempoTranscurridoSeg % (24 * 3600)) / 3600);
    const minutos = Math.floor((tiempoTranscurridoSeg % 3600) / 60);
    const segundos = tiempoTranscurridoSeg % 60;

    if (dias > 1) {
      transcurrido = `hace ${dias} dias`;

    } else if (dias <= 0 && horas >= 1) {
      transcurrido = `hace ${horas} hora(s)`;

    } else if (horas <= 0 && minutos >= 1) {
      transcurrido = `hace ${minutos} minuto(s)`;

    } else if (minutos <= 0 && segundos >= 1) {
      transcurrido = `hace ${segundos} segundo(s)`;
    }

    return transcurrido
  }

  
 viewMore(){
  this.page = this.page + 1
  this.obtenerPublicacionesUSer(this.page)
  setTimeout(()=>{
    let height = document.body.clientHeight;
    window.scrollTo({
      top: height,
      behavior: 'smooth'
    })
  }, 1000 / 6)
 }
  
}
