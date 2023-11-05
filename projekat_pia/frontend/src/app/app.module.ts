import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { AdminComponent } from './admin/admin.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AgencyComponent } from './agency/agency.component';
import { ClientComponent } from './client/client.component';
import { RegisterComponent } from './register/register.component';
import { NotregComponent } from './notreg/notreg.component';
import { EditObjComponent } from './edit-obj/edit-obj.component';
import { HeaderComponent } from './headers/header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderRegisterComponent } from './headers/header-register/header-register.component';
import { HeaderAdminLoginComponent } from './headers/header-admin-login/header-admin-login.component';
import { NotRegAgencyComponent } from './not-reg-agency/not-reg-agency.component';
import { EditClientComponent } from './edit-client/edit-client.component';
import { EditAgencyComponent } from './edit-agency/edit-agency.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AdminComponent,
    AdminLoginComponent,
    AgencyComponent,
    ClientComponent,
    RegisterComponent,
    NotregComponent,
    EditObjComponent,
    HeaderComponent,
    FooterComponent,
    HeaderRegisterComponent,
    HeaderAdminLoginComponent,
    NotRegAgencyComponent,
    EditClientComponent,
    EditAgencyComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
