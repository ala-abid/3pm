import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {UserModel} from './user-model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userModel = new UserModel('','','','','','');

  token: string;
  refreshToken: string;

  constructor(private http: HttpClient) { }

  login(email: string, password: string){

  }

  getNewToken(){

  }

  getUserInfo(){

    return this.userModel;
  }


}
