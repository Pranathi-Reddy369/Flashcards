import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Issue } from '../models/app.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IssuesService {
  private api = 'http://localhost:4000/issues';  

  constructor(private http: HttpClient) {}
  sendIssue(issue: Issue): Observable<Issue> {
    const token = localStorage.getItem('token');
    const headers = {
      Authorization: `Bearer ${token}`
    };
    return this.http.post<Issue>(this.api, issue, { headers });
  }

  getIssues(): Observable<Issue[]> {
    const token = localStorage.getItem('token');
    const headers = {
      Authorization: `Bearer ${token}`
    };
    return this.http.get<Issue[]>(this.api, { headers });
  }
}
