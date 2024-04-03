import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { user } from '../interfaces/auth.model';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  NODE_API_URL = `${environment.NODE_API_URL}/api`;
  destroyer$ = new Subject<void>();

  signedin$ = new BehaviorSubject<boolean | null>(null);
  user$ = new BehaviorSubject<user | null>(null);

  constructor(private http: HttpClient) {}

  setJwtToken(token: any) {
    localStorage.setItem('bearerToken', token);
  }

  getJwtToken() {
    return localStorage.getItem('bearerToken');
  }

  deleteJwtToken() {
    localStorage.removeItem('bearerToken');
  }

  loginUser(userDetails: any) {
    const url = `${this.NODE_API_URL}/users/login`;
    return this.http.post<any>(url, userDetails);
  }

  registerUser(userDetails: any) {
    const url = `${this.NODE_API_URL}/users/register`;
    return this.http.post(url, userDetails);
  }

  logoutUser() {}

  checkAuth() {
    return this.http
      .get<SignedinResponse>(`${this.NODE_API_URL}/users/signedin`)
      .pipe(
        catchError((err) => {
          this.signedin$.next(false);
          throw err;
        })
      );
  }

  usernameAvailable(username: string, orgId: string) {
    return this.http.post(`${this.NODE_API_URL}/users/checkusername`, {
      username,
      orgId,
    });
  }

  addOrg(organizationName) {
    return this.http.post(`${this.NODE_API_URL}/org`, { organizationName });
  }

  getOrgData() {
    return this.http.get(`${this.NODE_API_URL}/org`);
  }
}

export interface SignedinResponse {
  authenticated: boolean;
  username: string;
  userId: string;
}
