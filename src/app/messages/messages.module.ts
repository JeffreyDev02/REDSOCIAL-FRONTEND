import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { MessagesRoutingModule } from './messages-routing.module';
import { AddComponent } from './components/add/add.component';
import { MainComponent } from './components/main/main.component';
import { ReceivedComponent } from './components/received/received.component';
import { SendedComponent } from './components/sended/sended.component';

import { SessionService } from '../services/session.service';
import { UsuarioService } from '../services/usuario.service';

@NgModule({
  declarations: [
    MainComponent,
    AddComponent,
    ReceivedComponent,
    SendedComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    CommonModule,
    MessagesRoutingModule,
  ],
  exports: [
    MainComponent,
    AddComponent,
    ReceivedComponent,
    SendedComponent
  ],
  providers:[SessionService, UsuarioService]
})
export class MessagesModule { }
