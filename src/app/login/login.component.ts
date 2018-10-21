import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {
  public username: string;
  public password: string;
  public error: string;
  public auth: any;

  constructor(private authorization: AuthService, private router: Router) { 
    this.auth = authorization;
  }

  public submit() {
    this.auth.login(this.username, this.password)
      .pipe(first())
      .subscribe(
        result => {              
          this.router.navigate(['users'])
        },
        err => this.error = 'Wrong username or password!'
      );
  }

}
