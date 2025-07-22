import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DoubtThread } from '../models/app.model';

@Injectable({
  providedIn: 'root'
})
export class DoubtService {
  private apiUrl = 'http://localhost:3002/doubts';

  constructor(private http: HttpClient) {}

  getDoubts(): Observable<DoubtThread[]> {
    return this.http.get<DoubtThread[]>(this.apiUrl);
  }

  addDoubt(doubt: DoubtThread): Observable<DoubtThread> {
    return this.http.post<DoubtThread>(this.apiUrl, doubt);
  }

  updateDoubt(doubt: DoubtThread): Observable<DoubtThread> {
    return this.http.put<DoubtThread>(`${this.apiUrl}/${doubt.id}`, doubt);
  }
}
