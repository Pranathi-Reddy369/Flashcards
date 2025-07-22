import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Issue } from '../models/app.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IssuesService {
 private api = 'http://localhost:3002/issues';

  constructor(private http: HttpClient) {}

  // Save a new issue
  sendIssue(issue: Issue): Observable<Issue> {
    return this.http.post<Issue>(this.api, issue);
  }

  // Optional: get all issues
  getIssues(): Observable<Issue[]> {
    return this.http.get<Issue[]>(this.api);
  }
}
