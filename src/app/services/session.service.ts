import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { UsuarioService } from './usuario.service';

@Injectable({
  providedIn: 'root'
})
export class SessionService implements CanActivate {

  constructor(private _router: Router, private _userService: UsuarioService) { }

  canActivate() {
    let identidad = this._userService.getIdentity();
    if(identidad && identidad._id){
      return true
    }else{
      this._router.navigate(['/login']);
      return false;
    }
  }
  
}
