import { Component, OnInit, ViewChild  } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { usuario } from '../../models/usuario';
import { UsuarioService } from '../../services/usuario.service';
import { NgForm } from '@angular/forms';

import 'sweetalert2/src/sweetalert2.scss';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css',
  providers: [UsuarioService]
})
export class RegistroComponent implements OnInit {
    public title:string;
    public user:usuario;  
    @ViewChild('registerForm') formulario! : NgForm;
    

    constructor( private _route: ActivatedRoute, private _router: Router, private _userService:UsuarioService ){
      this.title = "Registrate";
      this.user = new usuario("","","","","","","ROLE_USER","");
      
    }

    ngOnInit() {  
      
    }

    onSubmit(){
      this._userService.register(this.user).subscribe(
        res=>{
          if(res.usuario && res.usuario._id){
            Swal.fire({
              position: "center",
              icon: "success",
              title: "Usuario registrado",
              showConfirmButton: false,
              timer: 2000
            });
            this.formulario.reset();
            
            
          }else{
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: res.message,
            });
            setInterval(()=>{
              this.formulario.reset();
            }, 2000)
          }
        },
        err=>{
            console.log(<any>err)
        }
      )
    }

}
