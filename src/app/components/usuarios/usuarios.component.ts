import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';
import { FollowsService } from '../../services/follows.service';
import { Global } from '../../services/global';
import { usuario } from '../../models/usuario';
import { seguimiento } from '../../models/seguimiento';


@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.css'
})
export class UsuariosComponent implements OnInit {
  public title: string;
  public url:string;
  public identidad: any;
  public token: string
  public page: any;
  public next_page: any;
  public prev_page: any;
  public total:any;
  public users:any;
  public pages:any;
  public stats:any;
  
  public followed:any;
  public following:any;


  constructor(private _router: Router, private _route: ActivatedRoute, private _usuarioService: UsuarioService, private _followService:FollowsService) {
    this.title = "Gente";
    this.url = Global.url;
    this.identidad = this._usuarioService.getIdentity();
    this.token = this._usuarioService.getToken();
    this.stats = this._usuarioService.getStast();
  

  }

  ngOnInit() {
    this.actualPage();
  }


  actualPage() {
    this._route.params.subscribe(params => {
      let page = +params['page'];
      this.page = page;


      if (!this.page && !page) {
        this.page = 1;
        page = 1;
      }
        
      this.next_page = page + 1;
      this.prev_page = page - 1;
      
      if(this.prev_page <= 0){
        this.prev_page = 1
      }
      
      
      //devolver usuarios;
      this.getUsers(page);
    })
  }

  getUsers(page:any){
    this._usuarioService.getUsers(page).subscribe(
      res=>{
        
        if(this.page > res.page){
          this._router.navigate(['/usuarios/1'])
        }
        this.users = res.usuarios;
        this.total = res.total;
        this.pages = res.page;

        this.following = res.usuario_following;
        
      },
      err=>{
        console.log(err)
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
        localStorage.setItem("stats", JSON.stringify(this.stats));
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
