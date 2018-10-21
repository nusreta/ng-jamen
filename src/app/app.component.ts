import { Component } from '@angular/core';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  public auth: AuthService;
  
  constructor(private authorization: AuthService) {
    this.auth = authorization;
  }

  logout() {
    this.auth.logout();
  }

}
