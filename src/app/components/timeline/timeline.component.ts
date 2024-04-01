import { Component, OnInit, DoCheck } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';
import { PublicacionService } from '../../services/publicacion.service';
import { Global } from '../../services/global';




@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrl: './timeline.component.css',
  providers: [UsuarioService, PublicacionService]
})
export class TimelineComponent implements OnInit {
  public title: string;
  public url: string;
  public identidad: any;
  public stats:any;
  public token: any;
  public page: any;
  public totalPage:any;
  public total: any;
  public publications: any;
  public modo = false;
  public showImage:any;

 


  constructor(private _route: Router, private _router: ActivatedRoute, private _usuarioService: UsuarioService, private _publicationService: PublicacionService) {
    this.title = "Timeline";
    this.url = Global.url;
    this.page = 1;
    this.identidad = this._usuarioService.getIdentity();
    this.token = this._usuarioService.getToken();
    this.stats = this._usuarioService.getStast();

  }

  ngOnInit(): void {
    this.getPublicationMe(this.page);
  }
  

  getPublicationMe(page: any=1) {
    this._publicationService.getPublications(this.token, page).subscribe(
      res => {
        this.total = res.total;
        this.totalPage = res.totalPage;
        if (page ==1) {
          this.publications = res.publications;
          
        } else {
          let arrayA = this.publications;
          let arrayB = res.publications;
          this.publications = arrayA.concat(arrayB);
          
          
        }
      },

      err => {
        console.log(<any>err)
      }
    )
  }

  deletePublication(idPublication:any){
    this._publicationService.deletePublication(this.token, idPublication).subscribe(
      res=>{
        this.stats.publication -= 1;
        localStorage.setItem("stats", JSON.stringify(this.stats)); 
        this.getPublicationMe(this.page)

      },
      err=>{
        console.log(<any>console)
      }
    )
  }

  
  viewMore() {
    this.page = this.page + 1
    this.getPublicationMe(this.page)

    
  }
 
  getTimestamp(timestamp: any) {

    const fecha: any = new Date(timestamp * 1000);
    const fechaActual: any = new Date();
    let transcurrido: any;

    const tiempoTranscurrido: any = fechaActual - fecha;
    const tiempoTranscurridoSeg = Math.floor(tiempoTranscurrido / 1000)


    const dias = Math.floor(tiempoTranscurridoSeg / (24 * 3600));
    const horas = Math.floor((tiempoTranscurridoSeg % (24 * 3600)) / 3600);
    const minutos = Math.floor((tiempoTranscurridoSeg % 3600) / 60);
    const segundos = tiempoTranscurridoSeg % 60;

    if (dias > 1) {
      transcurrido = `hace ${dias} dias`;

    } else if (dias <= 0 && horas >= 1) {
      transcurrido = `hace ${horas} hora(s)`;

    } else if (horas <= 0 && minutos >= 1) {
      transcurrido = `hace ${minutos} minuto(s)`;

    } else if (minutos <= 0 && segundos >= 1) {
      transcurrido = `hace ${segundos} segundo(s)`;
    }

    return transcurrido
  }

  refresh(event:any = null){
    setTimeout(()=>{
      this.getPublicationMe(1)
    }, 1000 / 5)
  }

  scrollDown(){
    setTimeout(()=>{
        let height = window.document.body.scrollHeight;
        window.scrollTo({
        top: height,
        behavior: 'smooth'
      });
    }, 1000/8)
  }

  showThisImage(id:any){
      this.showImage = id;
  }
  hiddenThisImage(){
    this.showImage = 0;
  }

}
