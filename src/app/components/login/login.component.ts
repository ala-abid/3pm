import {Component, Input, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
 @Input()
 email: string;
 @Input()
 password: string;

  constructor(authService: AuthService) {  }

  ngOnInit() {
  }
  login() {

  }
}
