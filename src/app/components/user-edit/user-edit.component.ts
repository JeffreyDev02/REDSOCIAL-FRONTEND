import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { usuario } from '../../models/usuario';
import { UsuarioService } from '../../services/usuario.service';
import { UploadService } from '../../services/upload.service';
import { Global } from '../../services/global';

import 'sweetalert2/src/sweetalert2.scss'
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrl: './user-edit.component.css',
  providers: [UsuarioService, UploadService]
})
export class UserEditComponent implements OnInit {
  public title: string;
  public usuario: any;
  public identidad: any;
  public token: any;
  public fileToUpload: any;
  public url: string;


  constructor(private _router: Router, private _route: ActivatedRoute, private _userService: UsuarioService, private _uploadService: UploadService) {
    this.title = "Editar Usuario"
    this.usuario = this._userService.getIdentity();
    this.identidad = this.usuario;
    this.token = this._userService.getToken();
    this.url = Global.url;
  }

  ngOnInit() {

  }

  onSubmit() {
    this._userService.editUser(this.usuario).subscribe(
      responsive => {
        if (!responsive.userUpdate) {
          Swal.fire({
            position: "center",
            icon: "error",
            title: responsive.message,
            showConfirmButton: false,
            timer: 1500
          });
        } else {
          localStorage.setItem('usuario', JSON.stringify(this.usuario));
          this.identidad = this.usuario;

          Swal.fire({
            position: "center",
            icon: "success",
            title: "Usuario Actualizado",
            showConfirmButton: false,
            timer: 1500
          });
        }
      },
      err => {
        console.log(<any>err)
        Swal.fire({
          position: "center",
          icon: "error",
          title: "No se pudo actuzaliar el usuario",
          showConfirmButton: false,
          timer: 1500
        });
      }
    )
  }

  fileChangeEvent(fileInput: any) {
    this.fileToUpload = <Array<File>>fileInput.target.files;
    console.log(this.fileToUpload)
  }

  updateImage() {
    this._uploadService.makeFile(this.url + 'subirImage/' + this.usuario._id, [], this.fileToUpload, this.token, 'images')
      .then((res: any) => {
        if(res.userUpdate){
          this.usuario.image = res.userUpdate.image;
          localStorage.setItem("usuario", JSON.stringify(this.usuario));
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Imagen Actulizada",
            showConfirmButton: false,
            timer: 1500
          });
          this.fileToUpload = "";
        }else{
          
          Swal.fire({
            position: "center",
            icon: "error",
            title: res.message,
            showConfirmButton: false,
            timer: 1500
          });
          this.fileToUpload = "";
        }
        
      })
      .catch((err: any) => {
        console.log(err)
      })
  }
}
