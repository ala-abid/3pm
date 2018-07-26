import {Component, Input, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';
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
      }
    ) ;
  }
}
