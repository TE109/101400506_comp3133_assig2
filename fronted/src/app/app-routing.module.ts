import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { EmployeeListComponent } from './employee/employee-list/employee-list.component';
import { EmployeeAddComponent } from './employee/employee-add/employee-add.component';
import { EmployeeViewComponent } from './employee/employee-view/employee-view.component';
import { EmployyeEditComponent } from './employee/employye-edit/employye-edit.component';
import { LoginComponent } from './user/login/login.component';
import { SignUpComponent } from './user/sign-up/sign-up.component';
import { EmployeeSearchComponent } from './employee/employee-search/employee-search.component';

const routes: Routes = [{
  path:"emList", component: EmployeeListComponent
},{
  path:"emAdd", component: EmployeeAddComponent
},
{
  path:"emView/:id", component: EmployeeViewComponent
},
{
  path:"emEdit/:id", component: EmployyeEditComponent
},{
  path: "", component: LoginComponent
},{
  path: "signUp", component: SignUpComponent
},{
  path:"emSearch", component: EmployeeSearchComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
