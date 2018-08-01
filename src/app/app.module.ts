import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {AuthGuardService, AuthService} from './services/auth.service';
import { LoginComponent } from './components/login/login.component';
import {FormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';
import { ErrorPageComponent } from './components/error-page/error-page.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import {InterceptorService} from './services/interceptor.service';
import { PresalesInputsFormComponent } from './components/presales-inputs-form/presales-inputs-form.component';




const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'error', component: ErrorPageComponent, canActivate: [AuthGuardService] },
  { path: 'home', component: HomepageComponent , canActivate: [AuthGuardService] },
  { path: 'presalesinputs', component: PresalesInputsFormComponent, canActivate: [AuthGuardService]},
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ErrorPageComponent,
    HomepageComponent,
    PresalesInputsFormComponent,
     ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [AuthService, AuthGuardService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi: true,
    }

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
