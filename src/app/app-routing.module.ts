import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { RegistroComponent } from './components/registro/registro.component';
import { HomeComponent } from './components/home/home.component';
import { UserEditComponent } from './components/user-edit/user-edit.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { TimelineComponent } from './components/timeline/timeline.component';
import { PerfilesComponent } from './components/perfiles/perfiles.component';
import { FollowingComponent } from './components/following/following.component';
import { FollowedComponent } from './components/followed/followed.component';

import { SessionService } from './services/session.service';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'home', component: HomeComponent},
  {path: 'login', component : LoginComponent },
  {path: 'registro', component: RegistroComponent},
  {path: 'mis-datos', component: UserEditComponent, canActivate:[SessionService]},
  {path: 'usuarios', component: UsuariosComponent, canActivate:[SessionService]},
  {path: 'usuarios/:page', component: UsuariosComponent, canActivate:[SessionService]},
  {path: 'timeline', component: TimelineComponent, canActivate:[SessionService]},
  {path: 'perfil/:id', component: PerfilesComponent, canActivate:[SessionService]},
  {path: 'siguiendo/:id/:page', component: FollowingComponent, canActivate:[SessionService]},
  {path: 'seguidores/:id/:page', component: FollowedComponent, canActivate:[SessionService]},
  {path: '**', component: HomeComponent}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
