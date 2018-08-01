import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {HttpClient} from '@angular/common/http';
import {baseUrl, error401Url, refreshTokenUrlError} from '../../AppConfig';

@Component({
  selector: 'app-error-page',
  templateUrl: './error-page.component.html',
  styleUrls: ['./error-page.component.css']
})
export class ErrorPageComponent implements OnInit {

  constructor(private authService: AuthService , private http: HttpClient ) { }

  ngOnInit() {
     this.http.get(baseUrl + error401Url).subscribe() ;
  }

}
