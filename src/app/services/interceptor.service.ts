import {Injectable, Injector} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {from, Observable, throwError} from 'rxjs';
import {AuthService} from './auth.service';
import {catchError, map, tap} from 'rxjs/operators';
import {baseUrl, refreshTokenUrl, refreshTokenUrlError} from '../AppConfig';
import {Router} from '@angular/router';
import {post, sendRequest} from 'selenium-webdriver/http';
import {getResponseURL} from '@angular/http/src/http_utils';

@Injectable()
export class InterceptorService implements HttpInterceptor {

  constructor(private authService: AuthService , http: HttpClient) {

  }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.authService.readValues();


      req = req.clone({
        headers: req.headers.set( 'Authorization',  this.authService.token )
      });


    return next.handle(req).pipe(catchError( err => this.handleError(err, this) ) );

  }
  private handleError(error: HttpErrorResponse , _this: InterceptorService) {

    if (error.error instanceof ErrorEvent) {

    } else if ( error.status === 401 && error.url !==  baseUrl + refreshTokenUrlError) {
      console.log('session expired');
      _this.authService.readValues();
       console.log('we are gonna ridirect your request with another token tour old token is ' + _this.authService.token) ;
       _this.authService.getNewToken().subscribe((data: any) => _this.authService.token = _) ;
      _this.authService.readValues();
       console.log('youe new token is '+ _this.authService.token ) ;

    } else if ( error.status === 401 && error.url ===  baseUrl + refreshTokenUrlError) {
      localStorage.clear();
      location.replace('/login');
      console.log('login again');
    } else {
     /* console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`); */
    }

    return throwError(error);
  }



}

