import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthHomeComponent } from './components/auth-home/auth-home.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { RegistrationFormComponent } from './components/registration-form/registration-form.component';

const routes: Routes = [
  {
    path: '',
    component: AuthHomeComponent,
    children: [
      {
        path: '',
        component: LoginFormComponent,
      },
      { path: 'signup', component: RegistrationFormComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
