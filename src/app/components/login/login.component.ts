import {Component, Input, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {UserModel} from '../../services/user-model';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email: string;
  password: string;
  message: string ;
  constructor(private authService: AuthService , private router: Router) {  }

  ngOnInit() {}

  /**
   * Login Method
   */
  login() {
    this.authService.login(this.email , this.password).subscribe(
      (data: any) => {
        this.authService.token = data.result.token ;
        this.authService.refreshToken = data.result.refresh_token ;
        this.authService.cacheValues();
        this.getUserInfo();
        this.router.navigate(['/home']);
      },
      (error: any) => {

        console.log('Loging in=====>', error) ;
        // ridirect to error page
      }
    );
  }

  /**
   * Getting User Info
   */
  getUserInfo() {
    this.authService.getUserInfo().subscribe(
      (data: any) => {
        this.message = data.message ;
        this.authService.userInfo = data.result.user ;
        this.authService.cacheValues();
      } ,
      (error: any) => {

        console.log('Getting User Info====>', error) ;
        // ridirect to error page
      }

    ) ;
  }
}
