import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AuthService} from './services/auth.service';




export interface InputModel {
  name: string;
  familyName: string;
}


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'app';
  constructor(private http: HttpClient, private authService: AuthService){}
  ngOnInit(){
    this.authService.login('testusr', 'testpw')
      .subscribe((data: any) => this.title = data.token);

    this.authService.getUserInfo();
  }
}
