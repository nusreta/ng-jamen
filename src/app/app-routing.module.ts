import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsersComponent } from './users/users.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [ 
  { path: 'users', component: UsersComponent, canActivate: [AuthGuard] }, 
  { path: 'login', component: LoginComponent},
  { path: '**', redirectTo: 'users' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
