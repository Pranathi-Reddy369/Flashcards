import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/app.model';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userUrl = 'http://localhost:4000';

  constructor(private http: HttpClient, private router: Router) {}

  // 🟢 Register a new user
  register(user: Partial<User>): Observable<any> {
    return this.http.post(`${this.userUrl}/signup`, user);
  }

  // 🔐 Get Authorization header
  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token') || '';
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  // ✅ Get current logged-in user from JWT token
  getCurrentUser(): Observable<User | null> {
    const token = localStorage.getItem('token');
    if (!token) return of(null);

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const userId = payload.id;
      return this.http.get<User>(`${this.userUrl}/users/${userId}`, {
        headers: this.getAuthHeaders()
      });
    } catch (error) {
      console.error('Invalid token format:', error);
      return of(null);
    }
  }

  // 🔄 Update user
  updateUser(id: string, user: Partial<User>): Observable<User> {
    return this.http.put<User>(`${this.userUrl}/users/${id}`, user, {
      headers: this.getAuthHeaders()
    });
  }

  // ❌ Delete user
  deleteUser(id: string): Observable<any> {
    return this.http.delete(`${this.userUrl}/users/${id}`, {
      headers: this.getAuthHeaders()
    });
  }

  // 🚪 Logout user
  logout(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  // ✅ Check login status
  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  // 🔑 Login user
  login(user: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.userUrl}/login`, user);
  }
}
