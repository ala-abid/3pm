import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {AuthService} from './auth.service';
import {catchError} from 'rxjs/operators';

@Injectable()
export class InterceptorService implements HttpInterceptor {
  constructor(private authService: AuthService) {}
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.authService.readValues();


      req = req.clone({
        headers: req.headers.set( 'Authorization',  this.authService.token )
      });


    return next.handle(req).pipe( catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {

    } else if ( error.status === 401) {
      console.log(error.error);
    } else {
     /* console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`); */
    }
   console.log('am here')
    return throwError(
      'Something bad happened; please try again later.');
  }

}
