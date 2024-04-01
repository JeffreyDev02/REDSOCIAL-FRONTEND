import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';
import { PublicacionService } from '../../services/publicacion.service';
import { Global } from '../../services/global';

@Component({
  selector: 'app-publications',
  templateUrl: './publications.component.html',
  styleUrl: './publications.component.css',
  providers: [UsuarioService, PublicacionService]
})
export class PublicationsComponent implements OnInit {
  public title: string;
  public url: string;
  public identidad: any
  public token: any
  public page: any;
  public total: any;
  public publications: any;
  public modo = false;

  constructor(private _route: Router, private _router: ActivatedRoute, private _usuarioService: UsuarioService, private _publicationService: PublicacionService) {
    this.title = "Publicaciones";
    this.url = Global.url;
    this.page = 1;
    this.identidad = this._usuarioService.getIdentity();
    this.token = this._usuarioService.getToken();
  }

  ngOnInit(): void {
    this.getPublicationMe(this.page)
  }

  getPublicationMe(page: any, adding: any = false) {
    this._publicationService.getPublications(this.token, page).subscribe(
      res => {
        this.total = res.total;
        this.page = res.page;
        console.log(res.publications)
        if (!adding) {
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

  
  viewMore() {
    if (this.publications.length == this.total) {
      this.modo = true
    } else {
      this.page = parseInt(this.page) + 1;
      this.getPublicationMe(this.page, true);
    }
  }
  //Obtener el transcurso del timeStamp
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

}


