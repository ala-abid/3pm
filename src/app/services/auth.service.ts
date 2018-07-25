import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {UserModel} from './user-model';
import {throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userInfo: UserModel;
  token: string = 'my-token';
  refreshToken: string;

  constructor(private http: HttpClient) { }

  /*
  USER LOGIN
   */
  login(email: string, password: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
      })
    };
    let loginInput = {'email': email, 'password': password};
    const url = 'https://reqres.in/api/login';
    return this.http.post(url, loginInput , httpOptions).pipe(catchError(this.handleError));
  }


  getNewToken(){

  }

  getUserInfo(){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': this.token
      })
    };
    const url = 'https://reqres.in/api/users/2';
    this.http.get(url, httpOptions).pipe(catchError(this.handleError));
                                 // .subscribe((data:any) => {this.userInfo = data.data;console.log(this.userInfo);});
    // add httpOptions as argument
  return   this.http.get(url).pipe(catchError(this.handleError)) ;
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



}
