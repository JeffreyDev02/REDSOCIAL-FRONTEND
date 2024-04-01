import { Component, OnInit, DoCheck } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UsuarioService } from '../../../services/usuario.service';
import { MessagesService } from '../../../services/messages.service';
import { Global } from '../../../services/global';

@Component({
  selector: 'app-received',
  templateUrl: './received.component.html',
  styleUrl: './received.component.css',
  providers: [UsuarioService, MessagesService]
})
export class ReceivedComponent implements OnInit {
  public title:any = "Mensajes recibidos";
  public identidad:any;
  public token: any;
  public messages:any;
  public url:string;
  public prev_page:any;
  public next_page:any;
  public pages:any;
  public page:any


  constructor( private _usuarioService: UsuarioService, private _messageService: MessagesService, private _router:Router, private _route: ActivatedRoute ){
    this.identidad = this._usuarioService.getIdentity;
    this.token = this._usuarioService.getToken();
    this.messages = [];
    this.url = Global.url;
  }
  ngOnInit(): void {
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
      
      this.getMessagesReceive(page);
    })
  }

  getMessagesReceive(page:any){
    this._messageService.getMessagesReceiver(this.token, page).subscribe(
      res=>{
        this.messages = res.messages;
        this.pages = res.page;
      },
      err=>{
        console.log(<any>err)
      }
    )
  }

  

  
}
