import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { environment } from '../../environments/environment';
import { User } from '../models/user/user.model';
import { UserProfileUpdateRequest } from '../models/request/user-profile-update-request.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private userSource = new BehaviorSubject<User | null>(null);

  user$ = this.userSource.asObservable();

  private apiUrl = environment.apiUserServiceUrl; // ví dụ: http://localhost:8080/api
  constructor(private http: HttpClient) {}

  // ---------- AUTHENTICATION ----------
  signUp(data: {
    username: string;
    password: string;
    email: string;
    fullname: string;
  }): Observable<any> {
    return this.http.post(`${this.apiUrl}/authenticate/signup`, data, {
      responseType: 'text',
    });
  }

  login(data: {
    username: string;
    password: string;
  }): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(
      `${this.apiUrl}/authenticate/login`,
      data
    );
  }

  validateToken(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/authenticate/introspect`, data);
  }

  sendOtp(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/authenticate/password/otp`, data);
  }

  verifyOtp(data: any): Observable<any> {
    return this.http.post(
      `${this.apiUrl}/authenticate/password/otp/validation`,
      data
    );
  }

  resetPassword(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/authenticate/password/resets`, data);
  }

  // ---------- USER ----------

  deleteAccount(): Observable<any> {
    return this.http.delete(`${this.apiUrl}/users/account`);
  }

  getProfile(): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/users/profile`);
  }

  updateProfile(data: UserProfileUpdateRequest): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/users/profile`, data);
  }

  // Upload avatar
  uploadAvatar(file: File): Observable<string> {
    const formData = new FormData();
    formData.append('avatar', file);
    return this.http.post(`${this.apiUrl}/users/avatar`, formData, {
      responseType: 'text',
    });
  }

  setUser(user: User | null) {
    this.userSource.next(user);
  }

  clearUser() {
    this.userSource.next(null);
  }

  logout() {
    localStorage.removeItem('token');
    this.clearUser();
  }

  loadUserProfile() {
    if (localStorage.getItem('token')) {
      this.getProfile().subscribe({
        next: (user) => this.userSource.next(user),
        error: () => this.userSource.next(null),
      });
    }
  }
  getJwt() {
    return localStorage.getItem('token');
  }
}
