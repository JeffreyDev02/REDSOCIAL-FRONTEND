import { Component, OnInit,ViewChild, viewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { usuario } from '../../models/usuario';
import { UsuarioService } from '../../services/usuario.service';
import { NgForm } from '@angular/forms';
import "sweetalert2/src/sweetalert2.scss";
import Swal from 'sweetalert2';
 

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  providers: [UsuarioService]
})
export class LoginComponent implements OnInit {
    public title:string;
    public usuario:usuario;
    public idenity:any;
    public token:any
    public status:string;
    @ViewChild('loginForm') formulario!:NgForm; 

    constructor(private _route: ActivatedRoute, private _router: Router, private _userService: UsuarioService){
        this.title = "Login"
        this.status = "";
        this.idenity;
        this.token;
        this.usuario = new usuario("","","","","","","","");
    }

    ngOnInit() {
      
    }

    onSubmit(){
      this._userService.login(this.usuario, "false").subscribe(
        resposive=>{
          this.idenity = resposive.usuario;
          if(!this.idenity && !this.idenity._id){
            this.status = "error";
          }else{
            //Persitir Datos Usuario
            this.status = "success";
            localStorage.setItem("usuario", JSON.stringify(this.idenity));
            this.getToken();
            
            this._router.navigate(["/"]);
            //Conseguir token
          }
        },
        err=>{
          console.log(<any>err)
          Swal.fire({
            position: "center",
            icon: "error",
            title: err.error.message,
            showConfirmButton: false,
            timer: 1500
          });
        }
      )
    }

    getToken(){
      this._userService.login(this.usuario, "true").subscribe(
        resposive=>{
          this.token = resposive.token;
          if(this.token.length < 0){
            
          }else{
            //Persitir Toekn
            localStorage.setItem("token", this.token);
            this.getCouters();
            
            //Conseguir contadores de usuario
          }
          
        },
        error=>{
          console.log(<any>error)
        }
      )
    }

    getCouters(){
      this._userService.getCouter().subscribe(
        responsive=>{
          let stast = Object.keys(responsive).length ;
            if(stast > 0){
              localStorage.setItem("stats", JSON.stringify(responsive));
            }
          console.log(responsive)
        },
        error =>{
          console.log(<any>"hola "+error)
        }
      )
    }

}
