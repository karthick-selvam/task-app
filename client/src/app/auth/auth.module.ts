import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthHomeComponent } from './components/auth-home/auth-home.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { RegistrationFormComponent } from './components/registration-form/registration-form.component';
import { MaterialModule } from '../shared/material/material.module';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AuthHomeComponent,
    LoginFormComponent,
    RegistrationFormComponent,
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    AngularSvgIconModule.forRoot(),
    MaterialModule,
  ],
})
export class AuthModule {}
