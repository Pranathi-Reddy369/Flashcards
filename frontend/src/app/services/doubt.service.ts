import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DoubtThread } from '../models/app.model';

@Injectable({
  providedIn: 'root'
})
export class DoubtService {
  private apiUrl = 'http://localhost:4000/doubts';

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token') || '';
    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  }

  getDoubts(): Observable<DoubtThread[]> {
    return this.http.get<DoubtThread[]>(this.apiUrl, { headers: this.getAuthHeaders() });
  }

  addDoubt(doubt: Omit<DoubtThread, '_id'>): Observable<DoubtThread> {
    return this.http.post<DoubtThread>(this.apiUrl, doubt, { headers: this.getAuthHeaders() });
  }

  updateDoubt(doubt: DoubtThread): Observable<DoubtThread> {
    return this.http.put<DoubtThread>(`${this.apiUrl}/${doubt._id}`, doubt, { headers: this.getAuthHeaders() });
  }

  deleteDoubt(id: string): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.apiUrl}/${id}`, { headers: this.getAuthHeaders() });
  }
}
