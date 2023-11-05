import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { ClientComponent } from './client/client.component';
import { AgencyComponent } from './agency/agency.component';
import { AdminComponent } from './admin/admin.component';
import { RegisterComponent } from './register/register.component';
import { NotregComponent } from './notreg/notreg.component';
import { EditObjComponent } from './edit-obj/edit-obj.component';
import { NotRegAgencyComponent } from './not-reg-agency/not-reg-agency.component';
import { EditClientComponent } from './edit-client/edit-client.component';
import { EditAgencyComponent } from './edit-agency/edit-agency.component';

const routes: Routes = [
  {path: "", component: LoginComponent},
  {path: "adminLogin", component: AdminLoginComponent},
  {path: "client", component: ClientComponent},
  {path: "agency", component: AgencyComponent},
  {path: "admin", component: AdminComponent},
  {path: "register", component: RegisterComponent},
  {path: "notreg", component: NotregComponent},
  {path: "edit-obj", component: EditObjComponent},
  {path: "notreg-agency", component: NotRegAgencyComponent},
  {path: "edit-client", component: EditClientComponent},
  {path: "edit-agency", component: EditAgencyComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
