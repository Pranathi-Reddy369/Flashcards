import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, switchMap } from 'rxjs';
import { DailyActivity, StreakStats } from '../models/app.model';

@Injectable({
  providedIn: 'root'
})
export class ActivityService {
 private baseUrl = 'http://localhost:3002/activity';

  constructor(private http: HttpClient) {}

  private getTodayDate(): string {
    return new Date().toISOString().split('T')[0];
  }

  getTodayActivity(): Observable<DailyActivity | null> {
    const today = this.getTodayDate();
    return this.http.get<DailyActivity[]>(`${this.baseUrl}?date=${today}`).pipe(
      map(data => data.length > 0 ? data[0] : null)
    );
  }

  updateTodayActivity(update: Partial<DailyActivity>): Observable<DailyActivity> {
    const today = this.getTodayDate();
    return this.getTodayActivity().pipe(
      switchMap(existing => {
        if (existing) {
          const updated = { ...existing, ...update };
          return this.http.put<DailyActivity>(`${this.baseUrl}/${existing.id}`, updated);
        } else {
          const newActivity: DailyActivity = {
            date: today,
            minutesWatched: update.minutesWatched || 0,
            questionsAttempted: update.questionsAttempted || 0
          };
          return this.http.post<DailyActivity>(this.baseUrl, newActivity);
        }
      })
    );
  }

  getAllActivities(): Observable<DailyActivity[]> {
    return this.http.get<DailyActivity[]>(this.baseUrl);
  }

  calculateStreaks(): Observable<StreakStats> {
    return this.getAllActivities().pipe(
      map(activities => {
        const sorted = [...activities].sort((a, b) => a.date.localeCompare(b.date));
        let current = 0, longest = 0;
        let prevDate: Date | null = null;

        for (const act of sorted) {
          const date = new Date(act.date);
          if (
            prevDate &&
            (date.getTime() - prevDate.getTime()) / (1000 * 3600 * 24) === 1
          ) {
            current++;
          } else {
            current = 1;
          }
          longest = Math.max(longest, current);
          prevDate = date;
        }

        return { currentStreak: current, longestStreak: longest };
      })
    );
  }
}
