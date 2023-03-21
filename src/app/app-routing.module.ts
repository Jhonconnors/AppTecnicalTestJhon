import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateUserComponent } from './components/create-user/create-user.component';
import { EditUserComponent } from './components/edit-user/edit-user.component';
import { ListUsersComponent } from './components/list-users/list-users.component';


const routes: Routes = [
  { path: 'list-users', component: ListUsersComponent},
  { path: 'create', component: CreateUserComponent},
  { path: 'edit/:id', component: EditUserComponent},
  { path: '**', pathMatch: 'full', redirectTo: 'list-users'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
