import { Component, OnInit, DoCheck } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UsuarioService } from '../../../services/usuario.service';
import { MessagesService } from '../../../services/messages.service';
import { FollowsService } from '../../../services/follows.service';
import { mensaje } from '../../../models/mensaje';
import { seguimiento } from '../../../models/seguimiento';
import { Global } from '../../../services/global';



@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrl: './add.component.css',
  providers: [MessagesService, UsuarioService, FollowsService]
})
export class AddComponent implements OnInit {
  public title:any = "Enviar mensajes";
  public message:mensaje;
  public identidad:any;
  public token:any;
  public url:string;
  public follows:any;
  public status:any;

  constructor(private _route: Router, private _router: ActivatedRoute, private _usuarioService: UsuarioService, private _messageService: MessagesService, private _followService: FollowsService){
    this.identidad = this._usuarioService.getIdentity();
    this.token = this._usuarioService.getToken();
    this.url = Global.url;
    this.message = new mensaje("","","","",this.identidad._id,"");
  }


  ngOnInit(): void {
    this.getMyFollow();
  }
 
  onSubmit(form:any){
    console.log(this.message)
    this._messageService.addMessage(this.token, this.message).subscribe(
      res=>{
        
        console.log(res);
        this.status = "success";
        form.reset();
      },
      err=>{
        console.error(<any>err)
        this.status = "error";
      }
    )
  }

  getMyFollow(){
    this._followService.getMyFollows(this.token).subscribe(
      res=>{
        this.follows = res.result;
      },
      err=>{
        console.log(<any>err)
      }
    )
  }

  
}
