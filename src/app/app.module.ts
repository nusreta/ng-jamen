import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { JwtModule } from '@auth0/angular-jwt';
import { GoogleChartsModule } from 'angular-google-charts';
import { DataTableModule } from "angular-6-datatable";
import { AppRoutingModule } from './app-routing.module';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
 
import { ToastrModule } from 'ngx-toastr';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { UsersComponent } from './users/users.component';

import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { AppService } from './app.service';

import { environment } from '../environments/environment';


export function tokenGetter() {
  return localStorage.getItem('access_token');
}

@NgModule({
  declarations: [
    AppComponent,   
    UsersComponent,
    LoginComponent  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: environment.whitelistedDomains,
        blacklistedRoutes: environment.blacklistedRoutes
      }
    }),
    GoogleChartsModule,
    DataTableModule,
    BrowserAnimationsModule, 
    ToastrModule.forRoot()
  ],
  providers: [
    AuthService,
    AuthGuard,   
    AppService  
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
