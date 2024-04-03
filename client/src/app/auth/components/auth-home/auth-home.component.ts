import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-auth-home',
  templateUrl: './auth-home.component.html',
  styleUrls: ['./auth-home.component.scss'],
})
export class AuthHomeComponent {
  isUserLoggedIn: boolean = false;
  currentYear = new Date().getFullYear();
  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.signedin$.subscribe({
      next: (res) => {
        if (res) {
          this.isUserLoggedIn = res;
        }
      },
    });
  }
}
