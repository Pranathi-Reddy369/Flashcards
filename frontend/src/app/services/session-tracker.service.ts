import { Injectable } from '@angular/core';
import { interval, Subscription } from 'rxjs';
import { ActivityService } from './activity.service';

@Injectable({
  providedIn: 'root'
})
export class SessionTrackerService {
private timer$: Subscription | null = null;
  private minutes = 0;

  constructor(private activityService: ActivityService) {}

  startTracking() {
    if (this.timer$) return; 
    this.timer$ = interval(60000).subscribe(() => {
      this.minutes++;
      this.activityService.updateTodayActivity({ minutesWatched: this.minutes }).subscribe();
    });
  }

  stopTracking() {
    if (this.timer$) {
      this.timer$.unsubscribe();
      this.timer$ = null;
    }
  }
}
