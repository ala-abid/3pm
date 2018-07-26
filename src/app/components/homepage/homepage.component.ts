import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {UserModel} from '../../services/user-model';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  useinfo: UserModel ;
  token: string ;
  refreshtoken: string ;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    // console.log(this.authService.userInfo.mobile);
  }
  show() {
    this.authService.readValues() ;
     this.useinfo = this.authService.userInfo;
      this.token = this.authService.token ;
      this.refreshtoken = this.authService.refreshToken ;
  }

}
