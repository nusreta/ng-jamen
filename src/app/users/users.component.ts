import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html'
})
export class UsersComponent implements OnInit {
  models: Array<any>;
  model: any;
  keyword: string;
  auth: AuthService;  
  private all: Array<any>;
  private collection: string;

  constructor(private appService: AppService, private authService: AuthService) {
    this.auth = authService;
    this.collection = 'users';   
    this.models = [];
    this.all = [];
    this.model = {};
    this.keyword = ''; 
  }

  ngOnInit() {
    this.list();
  }

  list() {
    this.appService.list(this.collection, {}).subscribe((data) => {
      this.models = data;
      this.all = this.models;
      this.model = {};
    },
      error => {
        this.authService.error(error);
      });
  }

  insert() {
    this.appService.insert(this.collection, this.model).subscribe(() => { 
      this.authService.success('Uspješno ste obavili akciju!'); 
      this.list(); 
    },
      error => { this.authService.error(error); });
  }

  delete() {
    this.appService.delete(this.collection, this.model._id).subscribe(() => { 
      this.authService.success('Uspješno ste obavili akciju!'); 
      this.list();
    },
      error => { this.authService.error(error); });
  }

  update() {
    this.appService.update(this.collection, this.model).subscribe(() => { 
      this.authService.success('Uspješno ste obavili akciju!'); 
      this.list(); 
    },
      error => { this.authService.error(error); });
  }

  onFileChanged(event: any) {
    var reader = new FileReader();
    reader.onload = (function (file) {
      return function (e) {
        this.model.file = e.target.result;
      };
    })(event.target.files[0]);
    reader.readAsDataURL(event.target.files[0]);
  }

  search() {   
    if (!this.keyword) {
      this.models = this.all;
    }
    else {
      var search = this.keyword.toLowerCase();
      this.models = this.all.filter(function (o) {
        return o.firstname.toString().toLowerCase().indexOf(search) != -1 || o.lastname.toString().toLowerCase().indexOf(search) != -1;
      });
    }
  }
}
