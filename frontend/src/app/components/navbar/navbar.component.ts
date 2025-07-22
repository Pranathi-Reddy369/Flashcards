  import { CommonModule } from '@angular/common';
  import { Component, Renderer2 } from '@angular/core';
  import { RouterLink } from '@angular/router';
  import { SearchService } from '../../services/search.service';
  import { FormsModule } from '@angular/forms';
  import { NgbDropdownModule, NgbModal, NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';
  import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
  import { IssuesComponent } from '../issues/issues.component';
  import { IssuesService } from '../../services/issues.service';
import { DailyActivity, StreakStats } from '../../models/app.model';
import { ActivityService } from '../../services/activity.service';

  @Component({
    selector: 'app-navbar',
    imports: [RouterLink,CommonModule,FormsModule,NgbDropdownModule,NgbModalModule],
    templateUrl: './navbar.component.html',
    styleUrl: './navbar.component.css'
  })
  export class NavbarComponent {
  searchTerm: string = '';
  selectedTheme: string = 'auto';
  darkMode: boolean = false;

  // 🔥 New properties for streak and activity
  todayActivity: DailyActivity = {
    date: '',
    minutesWatched: 0,
    questionsAttempted: 0
  };

  streakStats: StreakStats = {
    currentStreak: 0,
    longestStreak: 0
  };

  constructor(
    private searchService: SearchService,
    private renderer: Renderer2,
    private modalService: NgbModal,
    private offcanvasService: NgbOffcanvas,
    private reportService: IssuesService,
    private activityService: ActivityService // ✅ Injected new service
  ) {}

  ngOnInit() {
    // Theme logic
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme') || 'auto';
      this.selectedTheme = savedTheme;
      this.darkMode = savedTheme === 'dark';
      this.applyTheme(savedTheme);
    }

    // ✅ Fetch today's activity and streak data
    this.activityService.getTodayActivity().subscribe(data => {
      console.log("Today's activity: ", data); // 👈 Add this
      if (data) this.todayActivity = data;
    });

    this.activityService.calculateStreaks().subscribe(stats => {
      this.streakStats = stats;
    });
  }

  toggleTheme() {
    this.selectedTheme = this.darkMode ? 'dark' : 'light';
    this.applyTheme(this.selectedTheme);
    if (typeof window !== 'undefined') {
      localStorage.setItem('theme', this.selectedTheme);
    }
  }

  onSearchChange() {
    this.searchService.setSearchTerm(this.searchTerm);
  }

  onThemeChange(theme: string) {
    this.selectedTheme = theme;
    this.applyTheme(theme);
    if (typeof window !== 'undefined') {
      localStorage.setItem('theme', theme);
    }
  }

  applyTheme(theme: string) {
    const htmlEl = document.documentElement;
    this.renderer.removeClass(htmlEl, 'dark-theme');
    this.renderer.removeClass(htmlEl, 'light-theme');

    if (theme === 'dark') {
      this.renderer.addClass(htmlEl, 'dark-theme');
    } else if (theme === 'light') {
      this.renderer.addClass(htmlEl, 'light-theme');
    } else {
      const prefersDark = typeof window !== 'undefined' &&
        window.matchMedia('(prefers-color-scheme: dark)').matches;
      this.renderer.addClass(htmlEl, prefersDark ? 'dark-theme' : 'light-theme');
    }
  }

  openTerms(content: any) {
    this.modalService.open(content, { centered: true });
  }

  openReport() {
    this.offcanvasService.open(IssuesComponent, {
      position: 'end',
      panelClass: 'issue-panel',
      backdrop: true
    });
  }
  }
