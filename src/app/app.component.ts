import { Component,OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';




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
  constructor(private http: HttpClient){}
  ngOnInit(){
    this.http.get<Array<InputModel>>('http://localhost:4200/assets/logininputs/input1.json')
      .subscribe(data => this.title = (JSON.parse(JSON.stringify(data))).familyName);
  }
}
