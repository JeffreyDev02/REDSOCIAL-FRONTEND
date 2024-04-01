import { Component, OnInit, DoCheck } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent implements OnInit, DoCheck{
  public title:string = "Mensajes privados"; 
  
  ngOnInit(): void {
    
  }
  ngDoCheck(): void {
    
  }
}
