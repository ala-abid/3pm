import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {UserModel} from './user-model';
import {LocalStorageService} from './local-storage.service';
import {baseUrl, loginUrl, refreshTokenUrl, refreshTokenUrlError, userUrl} from '../AppConfig';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userInfo: UserModel;
  token = 'my-token';
  refreshToken: string;

  constructor(private http: HttpClient , private localStorage: LocalStorageService , private router: Router) { }

  login(email: string, password: string) {
    const loginInput = {'email': email, 'password': password};
    const url = baseUrl + loginUrl;
    return this.http.post(url, loginInput);
  }


  getNewToken() {
    const url = baseUrl + refreshTokenUrlError;
    const refToken = this.localStorage.get('refresh_token', 'null') ;
    return this.http.post(url, null, { headers: refToken}).subscribe(
      ( data: any) => this.localStorage.set('token', data.result.token)
     /* (error: HttpErrorResponse) => {
        this.clearValues() ;
                (error.status === 401) ? this.router.navigate(['/login']) :
          this.router.navigate(['/error']) ;
      }*/
    );

  }

  getUserInfo() {
    const url = baseUrl + userUrl;
    return this.http.get(url);
  }

  cacheValues() {
    this.localStorage.set('token', this.token) ;
    this.localStorage.set('refresh_token', this.refreshToken) ;
    this.localStorage.set('userinfo', this.userInfo) ;
  }
  readValues() {
    this.token = this.localStorage.get('token', 'No_Token') ;
    this.refreshToken = this.localStorage.get('refresh_token', 'No_Refresh_Token') ;
    this.userInfo = this.localStorage.get('userinfo', null) ;
  }
  clearValues() {
   this.localStorage.set('token', 'No_Token');
    this.localStorage.set('refresh_token', 'No_Refresh_Token');
    this.localStorage.set('userinfo', null);
    console.log('cleared') ;
  }

}


@Injectable({
  providedIn: 'root'
})
 export class AuthGuardService implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.authService.userInfo) {
      return true;
    } else {
      this.router.navigate(['/login'], {
        queryParams: {
          return: state.url
        }
      });
      return false;
    }
  }
}
