import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { UserDetailsComponent } from './components/user-details/user-details.component';
import { UserFormComponent } from './components/user-form/user-form.component';
import { UserListComponent } from './components/user-list/user-list.component';


const routes: Routes = [
  { path: "", redirectTo: "users", pathMatch: "full"},
  { path: "users", component: UserListComponent},
  { path: "users/add", component: UserFormComponent},
  { path: "users/:id", component: UserDetailsComponent},
  { path: "users/:id/edit", component: UserFormComponent},
  { path: "**", component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
