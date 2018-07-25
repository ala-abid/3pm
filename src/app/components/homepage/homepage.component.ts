import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit() {
    // console.log(this.authService.userInfo.mobile);
  }
  show() {
    this.authService.readValues() ;
    return this.authService.userInfo.mobile + '<br>'  + this.authService.token + this.authService.refreshToken ;
  }

}
