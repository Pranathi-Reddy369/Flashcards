import { Component, OnDestroy, OnInit } from '@angular/core';
import { Flashcard, FlashcardSet } from '../../models/app.model';
import { ActivatedRoute } from '@angular/router';
import { FlashcardService } from '../../services/flashcard.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivityService } from '../../services/activity.service';
import { VideoTabComponent } from '../video-tab/video-tab.component';
import { ResourceTabComponent } from '../resource-tab/resource-tab.component';
import { QuizTabComponent } from '../quiz-tab/quiz-tab.component';
import { DoubtTabComponent } from '../doubt-tab/doubt-tab.component';
import { BookmarkService } from '../../services/bookmark.service';
import { FlashcardTabComponent } from '../flashcard-tab/flashcard-tab.component';

@Component({
  selector: 'app-flashcard-viewer',
  imports: [FormsModule,CommonModule,VideoTabComponent,ResourceTabComponent,QuizTabComponent,DoubtTabComponent],
  templateUrl: './flashcard-viewer.component.html',
  styleUrl: './flashcard-viewer.component.css'
})
export class FlashcardViewerComponent implements OnInit, OnDestroy{
 set?: FlashcardSet;
  currentIndex = 0;
  isFlipped = false;
  hasError = false;
  bookmarked = false;
  activeTab: string = 'flashcards';

  tabs = [
    { key: 'flashcards', label: 'Flashcards', icon: 'bi bi-grid' },
    { key: 'videos', label: 'Videos', icon: 'bi bi-play-btn' },
    { key: 'resources', label: 'Resources', icon: 'bi bi-link-45deg' },
    { key: 'quiz', label: 'Quiz', icon: 'bi bi-lightbulb' },
    { key: 'doubts', label: 'Doubts', icon: 'bi bi-question-circle' }
  ];

  constructor(
    private route: ActivatedRoute,
    private flashcardService: FlashcardService,
    private activityService: ActivityService,
    private bookmarkService: BookmarkService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      this.hasError = true;
      return;
    }

    const savedTab = localStorage.getItem('activeTab');
    if (savedTab) this.activeTab = savedTab;

    this.flashcardService.getSet(id).subscribe({
      next: (data) => {
        data.cards.forEach(card => {
          card.favorite ??= false;
          card.isReviewed ??= false;
        });
        this.set = data;
        this.currentIndex = 0;
        this.isFlipped = false;
        this.markCardAsReviewed(this.set.cards[0]);
        this.checkBookmark();
      },
      error: (err) => {
        console.error('Failed to load set:', err);
        this.hasError = true;
      },
    });
  }

  ngOnDestroy() {
    localStorage.removeItem('activeTab');
  }

  get currentCard(): Flashcard {
    if (!this.set || this.set.cards.length === 0) {
      return {
        id: 0,
        question: 'No card',
        answer: 'No answer',
        favorite: false,
        difficulty: 'Easy',
        isReviewed: false,
      };
    }
    return this.set.cards[this.currentIndex];
  }

  toggleFavorite(card: Flashcard) {
    card.favorite = !card.favorite;
    this.flashcardService.updateSet(this.set!._id!, this.set!).subscribe(() => {
      console.log('Favorite updated for card:', card.id);
    });
  }

  toggleBookmark() {
    const card = this.currentCard;
    if (!this.set) return;

    const setId = this.set._id!;
    this.bookmarkService.isBookmarked(setId, card.id).subscribe((exists: boolean) => {
      if (exists) {
        this.bookmarkService.remove(setId, card.id).subscribe(() => {
          console.log('Bookmark removed');
          this.checkBookmark();
        });
      } else {
        this.bookmarkService.add({
          id: Date.now().toString(),
          setId,
          cardId: card.id,
          question: card.question,
          answer: card.answer
        }).subscribe(() => {
          console.log('Bookmarked');
          this.checkBookmark();
        });
      }
    });
  }

  checkBookmark() {
    if (!this.set) return;
    this.bookmarkService.isBookmarked(this.set._id!, this.currentCard.id).subscribe((exists: boolean) => {
      this.bookmarked = exists;
    });
  }

  flip() {
    this.isFlipped = !this.isFlipped;
  }

  nextCard() {
    if (!this.set || !this.set.cards.length) return;
    this.currentIndex = (this.currentIndex + 1) % this.set.cards.length;
    this.isFlipped = false;
    this.markCardAsReviewed(this.set.cards[this.currentIndex]);
    this.checkBookmark();
    this.updateActivity();
  }

  prevCard() {
    if (!this.set || !this.set.cards.length) return;
    this.currentIndex = (this.currentIndex - 1 + this.set.cards.length) % this.set.cards.length;
    this.isFlipped = false;
    this.markCardAsReviewed(this.set.cards[this.currentIndex]);
    this.checkBookmark();
    this.updateActivity();
  }

  markCardAsReviewed(card: Flashcard) {
    if (!card.isReviewed) {
      card.isReviewed = true;
      this.flashcardService.updateSet(this.set!._id!, this.set!).subscribe(() => {
        console.log(`Card ${card.id} marked as reviewed ✅`);
      });
    }
  }

  updateActivity() {
    this.activityService.getTodayActivity().subscribe((today) => {
      const updatedCount = (today?.questionsAttempted || 0) + 1;
      this.activityService.updateTodayActivity({ questionsAttempted: updatedCount }).subscribe();
    });
  }

  get progressPercent(): number {
    if (!this.set || this.set.cards.length === 0) return 0;
    const reviewedCount = this.set.cards.filter(card => card.isReviewed).length;
    return Math.round((reviewedCount / this.set.cards.length) * 100);
  }

  setActiveTab(tab: string) {
    this.activeTab = tab;
    localStorage.setItem('activeTab', tab);
  }

  goBack() {
    history.back();
  }

  closeViewer() {
    history.back();
  }}
