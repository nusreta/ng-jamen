import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from '../environments/environment';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class AuthService {
  constructor(private http: HttpClient, private router: Router, private toastr: ToastrService) { }
  
  login(username: string, password: string): Observable<any> {
    return this.http.post<{token: string, current: any}>(environment.api + '/api/v1/auth', {username: username, password: password})
    .pipe(
      map(result => {
        localStorage.setItem('access_token', result.token);
        localStorage.setItem('current', JSON.stringify(result.current));
        return true;
      })
    );
  }

  logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('current');
  }

  public get loggedIn(): boolean {
    return (localStorage.getItem('access_token') !== null);
  }

  public get loggedUser(): any {
    return JSON.parse(localStorage.getItem('current'));
  }

  public error(error){
    if(error.status === 401){
      this.logout();
      this.router.navigate(['login']);
      this.toastr.info('Vaša sesija je istekla. Prijavite se ponovo!');
    }
    else {
    this.toastr.error('Desila se greška. Pokušajte ponovo!');
    }
  }

  public success(message) {   
    this.toastr.success(message);
  }
  
}
