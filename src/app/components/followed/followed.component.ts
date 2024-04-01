import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';
import { FollowsService } from '../../services/follows.service';
import { Global } from '../../services/global';

import { seguimiento } from '../../models/seguimiento';



@Component({
  selector: 'app-followed',
  templateUrl: './followed.component.html',
  styleUrl: './followed.component.css',
  providers: [UsuarioService, FollowsService]
})
export class FollowedComponent implements OnInit {
  public title = "Seguidores de ";
  public url = Global.url;
  public identidad: any;
  public token: any;
  public stats: any;

  public idUser: any;
  public users: any;
  public page: any;
  public pages: any;
  public next_page: any;
  public prev_page: any;
  public followed: any = [];
  public getUserId:any = {};


  constructor(private _route: Router, private _router: ActivatedRoute, private _usuarioService: UsuarioService, private _followSeguimiento: FollowsService) {
    this.identidad = this._usuarioService.getIdentity();
    this.token = this._usuarioService.getToken();
    this.stats = this._usuarioService.getStast();


  }

  ngOnInit(): void {
    this.actualPage()
  }

  actualPage() {
    this._router.params.subscribe(params => {
      this.idUser = params['id'];
      let page = params['page'];
      this.page = page;

      if (!this.page && !page) {
        this.page = 1;
        page = 1;
      }

      this.next_page = page + 1;
      this.prev_page = page - 1;

      if (this.prev_page <= 0) {
        this.prev_page = 1;
      }

      this.followedUSer(this.idUser, page);
      this.getFollowUSerId()
    })
  }

  followedUSer(user_id: any, page: any) {
    this._followSeguimiento.getFollowed(this.token, user_id, page).subscribe(
      res => {
        this.users = res.seguidores;
        this.pages = res.page;
        this.followed = res.usuario_followed;
      },
      error => {
        console.error(<any>error)
        this._route.navigate(['/home']);
      }
    )
  }

  getFollowUSerId(){
    this._usuarioService.getUser(this.idUser, this.token).subscribe(
      res=>{
        
        this.getUserId = res.usuario;
      },
      err=>{
        console.error(<any>err)
      }
    )
  }
  
  public folloeUserOver: any;
  mouseEnter(user_id: any) {
    this.folloeUserOver = user_id;
  }


  mouseLeave(user_id: any) {
    this.folloeUserOver = 0;
  }

  addfollowUser(follow: any) {
    let followed = new seguimiento("", this.identidad._id, follow);
    this._followSeguimiento.addFollow(this.token, followed).subscribe(
      res => {
        this.followed.push(follow)
        this.stats.followed += 1;
        localStorage.setItem("stats", JSON.stringify(this.stats))
      },
      err => {
        console.log(err)
      }
    )
  }

  removeFollowUser(follow: any) {
    this._followSeguimiento.deleteFollow(this.token, follow).subscribe(
      res => {
        let index = this.followed.indexOf(follow);
        this.followed.splice(index, 1);
        this.stats.followed -= 1;
        localStorage.setItem("stats", JSON.stringify(this.stats))
      },
      err => {
        console.log(<any>err)
      }
    )
  }

}
