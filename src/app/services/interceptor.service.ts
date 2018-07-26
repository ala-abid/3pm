import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import { HttpEvent, HttpInterceptor, HttpResponse, HttpHandler, HttpRequest }
  from '@angular/common/http';
import { AccountService } from './account.service';
import { Stock } from './stocks.model';
import { ConfigService } from './config.service';
import {AuthService} from './auth.service';




@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {

  constructor( private authService: AuthService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const request = req.clone();
    request.headers.append('Accept', 'application/json');
    return next.handle(request).do(event => {
      if (event instanceof HttpResponse && event.status) {


      }
    }

  }
}
