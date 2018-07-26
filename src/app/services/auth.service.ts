import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {UserModel} from './user-model';
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

  login(email: string, password: string) {
    const loginInput = {'email': email, 'password': password};
    const url = baseUrl + loginUrl;
    return this.http.post(url, loginInput);
  }


  getNewToken() {

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

}
