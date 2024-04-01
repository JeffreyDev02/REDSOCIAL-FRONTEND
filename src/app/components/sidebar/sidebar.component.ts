import { Component, OnInit, DoCheck, EventEmitter, input, Output ,ViewChild} from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { PublicacionService } from '../../services/publicacion.service';
import { publicacion } from '../../models/publicacion';

import { UploadService } from '../../services/upload.service';
import { UsuarioService } from '../../services/usuario.service';
import { Global } from '../../services/global';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
  providers: [UsuarioService, PublicacionService, UploadService]
})
export class SidebarComponent implements OnInit, DoCheck{
  public identidad:any;
  public token: any;
  public stats: any;
  public url:string;
  public status:any;
  public publication:publicacion;
  public uploadFiles: Array<File>;
  @ViewChild('newPubForm') form! : NgForm;
  
  constructor(private _router: Router, private _route:ActivatedRoute, private _userService: UsuarioService, private _publicacionService:PublicacionService, private _UploadService: UploadService){
    this.identidad = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.stats = this._userService.getStast();
    this.url = Global.url;
    this.publication =  new publicacion("","","","", this.identidad._id);
    this.uploadFiles = [];
  }
  ngOnInit(): void {
    this.stats = this._userService.getStast();
    this.getCouters()
  }

  ngDoCheck(): void {
    this.stats = this._userService.getStast();
  }

  onSubmit(){
      this._publicacionService.addPublication(this.token, this.publication).subscribe(
        res=>{
          
          if(this.uploadFiles && this.uploadFiles.length > 0){
            this._UploadService.makeFile(this.url + 'uploadImagePublication/' + res.publicationStored._id, [], this.uploadFiles, this.token, 'image')
            .then((result:any)=>{
              this.publication.file = result.image;
              this.stats.publication += 1
              localStorage.setItem("stats", JSON.stringify(this.stats));
              this.status = "success";
              
            })
            .catch((err:any)=>{
              console.log(err);
            })
          }else{
            this.stats.publication += 1
            localStorage.setItem("stats", JSON.stringify(this.stats));
            this.status = "success"; 
          }
          

          setTimeout(() => {
              this.form.resetForm();
              this.status = ""
              
              this._router.navigate(['/timeline'])
          }, 1000);
        },
        err=>{
          this.status = "error";
          console.log(<any>err)
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
      },
      error =>{
        console.log(<any>"hola "+error)
      }
    )
  }

  
  fileChangeEvento(fileInput:any){
    this.uploadFiles = <Array<File>>fileInput.target.files;
  }

  //output
 @Output() sended = new EventEmitter();
 sendPublication(event:any){
  this.sended.emit({sended:'true'})
 } 

}
