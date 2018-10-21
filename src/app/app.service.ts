import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  constructor(private http: HttpClient) { }

  list(collection, filter) {
    return this.http.post<any>(environment.api + '/api/v1/search/' + collection, filter);
  }

  get(collection, id) {
    return this.http.get(environment.api + '/api/v1/' + collection + '/' + id);
  }

  insert(collection, document) {
    return this.http.post<any>(environment.api + '/api/v1/' + collection, document);
  }

  update(collection, document) {
    return this.http.put<any>(environment.api + '/api/v1/' + collection, document);
  }

  delete(collection, id) {
    return this.http.delete(environment.api + '/api/v1/' + collection + '/' + id);
  }
}
