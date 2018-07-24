import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {UserModel} from './user-model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  usrModel = new UserModel('','','','','','');
  token: string;
  refreshToken: string;

  constructor(private http: HttpClient) { }

  login(){

  }

  getNewToken(){

  }
}
