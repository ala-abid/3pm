import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {UserModel} from './user-model';
import {throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {LocalStorageService} from './local-storage.service';
import {baseUrl, loginUrl, userUrl} from '../AppConfig';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userInfo: UserModel;
  token = 'my-token';
  refreshToken: string;

  constructor(private http: HttpClient , private localStorage: LocalStorageService) { }

  /*
  USER LOGIN
   */
  login(email: string, password: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
      })
    };
    const loginInput = {'email': email, 'password': password};
    const url = baseUrl + loginUrl;
    return this.http.post(url, loginInput , httpOptions).pipe(catchError(this.handleError));
  }


  getNewToken() {

  }

  getUserInfo() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': this.token
      })
    };
    const url = baseUrl + userUrl;
    return this.http.get(url, httpOptions).pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  }

   cacheValues() {
     this.localStorage.set('token', this.token) ;
     this.localStorage.set('refresh_token', this.refreshToken) ;
     this.localStorage.set('userinfo', this.userInfo) ;
   }
   readValues() {
     this.token = this.localStorage.get('token', 'No_Token') ;
     this.refreshToken = this.localStorage.get('refresh_token', 'No_REfresh_Token') ;
     this.userInfo = this.localStorage.get('userinfo', null) ;
   }

}
