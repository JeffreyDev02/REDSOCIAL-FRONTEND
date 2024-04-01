import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  public title:any;

  constructor(){
    this.title = "Bienvenido a NGSOCIAL"
  }

  ngOnInit(): void {
  
  }
}
