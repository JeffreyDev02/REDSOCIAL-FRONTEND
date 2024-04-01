import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';
import { FollowsService } from '../../services/follows.service';
import { Global } from '../../services/global';
import { usuario } from '../../models/usuario';
import { seguimiento } from '../../models/seguimiento';

@Component({
  selector: 'app-following',
  templateUrl: './following.component.html',
  styleUrl: './following.component.css',
  providers: [UsuarioService, FollowsService]
})
export class FollowingComponent implements OnInit {
  public title:string;
  public url = Global.url;
  public token: string;
  public identidad: any;
  public stats:any;
  public usuario: usuario;
  public page:any;
  public pages:any;
  public userId:any;
  public getUserId:any;

  public next_page:any;
  public prev_page:any;

  public users:any;
  public total:any;
  public followed:any;
  public following:any;

  constructor (private _router: Router, private _route: ActivatedRoute, private _usuarioService: UsuarioService, private _followService: FollowsService ){
    this.identidad = this._usuarioService.getIdentity();
    this.title = "Usuarios seguido por: ";
    this.token = this._usuarioService.getToken();
    this.stats = this._usuarioService.getStast();
    this.usuario = new usuario("","","","","","","","");
    this.getUserId = "";
  }

  ngOnInit(): void {
    this.actualPage();
  }

  actualPage(){
    this._route.params.subscribe(params=>{
      let idParams = params['id']
      this.userId = idParams;
      let pageParams = +params['page'];
      this.page = pageParams;

      if(!this.page && !pageParams){
        this.page = 1;
        pageParams = 1;
      }
      
      this.next_page = pageParams + 1;
      this.prev_page = pageParams - 1;
      
      if(this.prev_page <= 0){
        this.prev_page = 1;
      }
      this.getFollows( this.userId, this.page);
      this.obtenerUsuario();
    })
  }

  getFollows(user_id:any ,page:any){
    this._followService.getFollowing(this.token, user_id, page).subscribe(
      res=>{
        
        if(this.page > res.page){
          this._router.navigate(['/usuarios/1'])
        }
        this.users = res.follow;
        this.total = res.total;
        this.pages = res.pages;
        this.following = res.usuario_following
        
      },
      err=>{
        console.log(err)
        this._router.navigate(['/home'])
      }
    )
  }

  obtenerUsuario(){
    this._usuarioService.getUser(this.userId, this.token).subscribe(
      res=>{
        this.getUserId = res.usuario
      },
      err=>{
        console.error(<any> err);
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


  followUser(follow:any){
    let followed = new seguimiento("", this.identidad._id, follow);
    this._followService.addFollow(this.token, followed).subscribe(
      res=>{
        this.following.push(follow)
        this.stats.following += 1; 
        localStorage.setItem("stats", JSON.stringify(this.stats))
      },
      err =>{
        console.log(err)
      }
    ) 
  }

  removeFollowUser(follow:any){
    this._followService.deleteFollow(this.token, follow).subscribe(
      res=>{
        let index = this.following.indexOf(follow);
        this.following.splice(index, 1);
        this.stats.following -= 1; 
        localStorage.setItem("stats", JSON.stringify(this.stats))
      },
      err=>{
        console.log(<any>err)
      }
    )
  }
}
