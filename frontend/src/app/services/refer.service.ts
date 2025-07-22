import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Referral, UserRewards } from '../models/app.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReferService {
private baseUrl = 'http://localhost:3002';

  constructor(private http: HttpClient) {}

  getReferrals(): Observable<Referral[]> {
    return this.http.get<Referral[]>(`${this.baseUrl}/referrals`);
  }

  addReferral(referral: Referral): Observable<Referral> {
    return this.http.post<Referral>(`${this.baseUrl}/referrals`, referral);
  }

  getRewards(): Observable<UserRewards[]> {
    return this.http.get<UserRewards[]>(`${this.baseUrl}/rewards`);
  }

  updateRewards(user: UserRewards): Observable<UserRewards> {
    return this.http.put<UserRewards>(`${this.baseUrl}/rewards/${user.referralCode}`, user);
  }

}
