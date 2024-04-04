import { OnInit, Component } from '@angular/core';
import { AuthService } from './auth/services/auth.service';
import { Subject, takeUntil } from 'rxjs';
import { user } from './auth/interfaces/auth.model';
import { DashboardService } from './dashboard/services/dashboard.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  destroyer$ = new Subject<void>();

  appNavDetails: {
    label: string;
    navPath: string;
    iconPath: string;
    iconClassName: string;
  }[] = [
    {
      label: 'Dashboard',
      navPath: 'dashboard',
      iconPath: 'assets/icons/icon-pie-chart.svg',
      iconClassName: 'te-nav__icon icon-pie-chart',
    },
  ];

  isUserAuthenticated = false;
  userDetails: user;
  isUserOptionsMenuOpen: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.authService
      .checkAuth()
      .pipe(takeUntil(this.destroyer$))
      .subscribe({
        next: (res: any) => {
          if (res.signedin) this.isUserAuthenticated = true;
        },
      });

    this.authService.user$.pipe(takeUntil(this.destroyer$)).subscribe({
      next: (res: any) => {
        this.userDetails = res;
      },
    });

    this.authService.signedin$.pipe(takeUntil(this.destroyer$)).subscribe({
      next: (res: any) => {
        if (typeof res === 'boolean') this.isUserAuthenticated = res;
      },
    });
  }

  logoutUser() {
    this.authService.deleteJwtToken();
    this.router.navigate(['/', 'auth']);
  }

  ngOnDestroy() {
    this.destroyer$.next();
    this.destroyer$.complete();
  }
}
