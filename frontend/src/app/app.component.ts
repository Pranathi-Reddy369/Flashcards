import { Component } from '@angular/core';
import { NavigationEnd, RouterModule, RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { filter } from 'rxjs';
import { SessionTrackerService } from './services/session-tracker.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,RouterModule,NavbarComponent,CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'learn-now';
  showHelpWidget = true; // ✅ declare this

  constructor(private router: Router, private tracker: SessionTrackerService) {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        const url = event.urlAfterRedirects || event.url;
        this.showHelpWidget = !['/login', '/signup'].includes(url);
      });
  }

  shouldShowNavbar(): boolean {
    return !['/login', '/signup'].includes(this.router.url);
  }


  ngOnInit() {
    this.tracker.startTracking();
  }
}
