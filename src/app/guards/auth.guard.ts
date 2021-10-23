import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router, CanLoad, Route, UrlSegment } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { UsuarioService } from '../services/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {
  constructor( private userServise: UsuarioService , private router: Router){}
  
  canLoad(route: Route, segments: UrlSegment[]): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return this.userServise.verificarToken()
                      .pipe(
                        tap( isAuth => {
                          if( !isAuth ){
                            this.router.navigateByUrl('/login');
                          }
                        })
                      )
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot){
      return this.userServise.verificarToken()
                      .pipe(
                        tap( isAuth => {
                          if( !isAuth ){
                            this.router.navigateByUrl('/login');
                          }
                        })
                      )
  }
  
}
