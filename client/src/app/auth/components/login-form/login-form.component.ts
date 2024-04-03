import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent {
  loginForm: FormGroup = new FormGroup<any>({
    username: new FormControl<string>('', [Validators.required]),
    password: new FormControl<string>('', [Validators.required]),
    organization: new FormControl<string>('', [Validators.required]),
  });
  passwordVisible: boolean = false;
  loader = false;
  organizations = [];

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit() {
    this.getOrg();
  }

  getOrg() {
    this.authService.getOrgData().subscribe({
      next: (res: any) => {
        if (res.length) {
          this.organizations = res;
        }
      },
      error: (err) => {},
    });
  }

  togglePasswordVisbility(event: any) {
    if (event.pointerType == 'mouse') {
      this.passwordVisible = !this.passwordVisible;
      setTimeout(() => {
        this.passwordVisible = !this.passwordVisible;
      }, 400);
    }
  }

  onPressEnter(keyCode: number) {
    if (keyCode == 13) this.loginUser();
    else return;
  }

  loginUser() {
    if (this.loginForm.invalid) {
      return;
    }

    const userLoginDetails = this.loginForm.value;

    this.loader = true;

    this.authService.loginUser(userLoginDetails).subscribe({
      next: (loginRes: any) => {
        if (loginRes.status) {
          this.loader = false;
          const userDetails = loginRes.user;
          this.authService.setJwtToken(loginRes.token);
          this.authService.signedin$.next(true);
          this.authService.user$.next(userDetails);
          this.router.navigate(['/dashboard']);
        } else {
          console.error('Login error:', loginRes.message);
          this.loader = false;
          this.loginForm.setErrors({ invalidAuth: true });
        }
      },
      error: (loginError) => {
        console.error('Error during login:', loginError);
        this.loader = false;
        this.loginForm.setErrors({ reqFailed: true });
      },
    });
  }
}
