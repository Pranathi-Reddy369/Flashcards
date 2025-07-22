import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/app.model';
import { map, Observable, of } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  userUrl = 'http://localhost:4000'
  constructor(private http: HttpClient, private router: Router){}
  

  // 🟢 Register
  register(user: Partial<User>): Observable<any> {
    return this.http.post(`${this.userUrl}/signup`, user);
  }


  // 🟢 Get current logged-in user
  getCurrentUser(): Observable<User | null> {
    const token = localStorage.getItem('token');
    if (!token) return of(null);

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const userId = payload.id;

      return this.http.get<User>(`${this.userUrl}/${userId}`, { headers });
    } catch (e) {
      console.error('Invalid token format');
      return of(null);
    }
  }

  // 🟡 Update user
  updateUser(id: string, user: Partial<User>): Observable<User> {
    const token = localStorage.getItem('token') || '';
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.put<User>(`${this.userUrl}/${id}`, user, { headers });
  }

  // 🔴 Delete user
  deleteUser(id: string): Observable<any> {
    const token = localStorage.getItem('token') || '';
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.delete(`${this.userUrl}/${id}`, { headers });
  }

  // 🚪 Logout
   logout(): void {
    this.router.navigate(['/login'])
    localStorage.removeItem('token')
   }

  // ✅ Check login status
  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

login(user: any){
  return this.http.post<any>(`${this.userUrl}/login`, user)
 }
  }
