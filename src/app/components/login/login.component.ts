import {Component, Input, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {UserModel} from '../../services/user-model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email: string;
  password: string;
  message: string ;
  constructor(private authService: AuthService) {  }

  ngOnInit() {}

  /**
   * Login Method
   */
  login() {
    this.authService.login(this.email , this.password).subscribe(
      (data: any) => {
        this.authService.token = data.result.token ;
        this.authService.refreshToken = data.result.refresh_token ;
        this.getUserInfo();
      },
      (error: any) => {

        console.log('Loging in=====>', error) ;
        // ridirect to error page
      }
    );
    this.authService.getUserInfo();
  }

  /**
   * Getting User Info
   */
  getUserInfo() {
    this.authService.getUserInfo().subscribe(
      (data: any) => {
        this.message = data.message ;
        this.authService.userInfo = data.result.user ;

        console.log(this.authService.userInfo);
      } ,
      (error: any) => {

        console.log('Getting User Info====>', error) ;
        // ridirect to error page
      }

    ) ;
  }
}
