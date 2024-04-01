import { Component, OnInit, DoCheck } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UsuarioService } from '../../../services/usuario.service';
import { MessagesService } from '../../../services/messages.service';
import { FollowsService } from '../../../services/follows.service';
import { mensaje } from '../../../models/mensaje';
import { seguimiento } from '../../../models/seguimiento';
import { Global } from '../../../services/global';


@Component({
  selector: 'app-sended',
  templateUrl: './sended.component.html',
  styleUrl: './sended.component.css',
  providers: [MessagesService, UsuarioService, FollowsService]
})
export class SendedComponent implements OnInit {
  public title:any = "Mensajes enviados";
  public messages:any;
  public identidad:any;
  public token:any;
  public url:string;
  public follows:any;
  public status:any;
  public pages:any;
  public page:any;

  public prev_page:any;
  public next_page:any;

  constructor(private _route: Router, private _router: ActivatedRoute, private _usuarioService: UsuarioService, private _messageService: MessagesService, private _followService: FollowsService){
    this.identidad = this._usuarioService.getIdentity();
    this.token = this._usuarioService.getToken();
    this.url = Global.url;
  }


  ngOnInit(): void {
    this.actualPage();
  }

  actualPage(){
    this._router.params.subscribe(params=>{
      let page = +params['page'];
      this.page = page;

      if(!this.page && !page){
        this.page = 1;
        page = 1;
      }

      this.next_page = page + 1;
      this.prev_page = page - 1;

      if(this.prev_page <= 0){
        this.prev_page = 1;
      }
      this.getMessages(this.page)
    })
  }

  getMessages(page:any){
    this._messageService.getEmittMessages(this.token, page).subscribe(
      res=>{
        if(this.page > res.page){
          this._route.navigate(['/mensajes/enviados/1'])
        }
          if(res.messages){
          this.messages = res.messages;
          this.pages = res.page;

        }
      },
      err=>{
        console.log(<any>err)
      }
    )
  }


}
