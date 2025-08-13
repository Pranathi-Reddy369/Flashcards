import { Component } from '@angular/core';
import { Flashcard, FlashcardSet } from '../../models/app.model';
import { FlashcardService } from '../../services/flashcard.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { SearchService } from '../../services/search.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-explore',
  imports: [CommonModule,RouterLink,FormsModule],
  templateUrl: './explore.component.html',
  styleUrl: './explore.component.css'
})
export class ExploreComponent {
  flashcardSets: FlashcardSet[] = [];
  filteredSets: FlashcardSet[] = [];
  searchTerm: string = '';

  constructor(
    private flashcardService: FlashcardService,
    private searchService: SearchService
  ) {}

  ngOnInit(): void {
    this.flashcardService.getAllSets().subscribe((data) => {
      this.flashcardSets = data;
      this.filteredSets = data;

      this.searchService.searchTerm$.subscribe((term) => {
        this.searchTerm = term;
        this.filterSets();
      });
    });
  }

  filterSets() {
    const term = this.searchTerm.trim().toLowerCase();
    if (!term) {
      this.filteredSets = this.flashcardSets;
    } else {
      this.filteredSets = this.flashcardSets.filter(set =>
        set.title.toLowerCase().includes(term) ||
        (set.tags || []).some(tag => tag.toLowerCase().includes(term))
      );
    }
  }

  onSearchChange(term: string) {
    this.searchService.setSearchTerm(term);
  }

  countByDifficulty(cards: Flashcard[], level: 'Easy' | 'Medium' | 'Hard'): number {
    return cards.filter(card => card.difficulty === level).length;
  }

  countReviewed(cards: Flashcard[]): number {
    return cards.filter(card => card.isReviewed).length;
  }

  getProgress(cards: Flashcard[]): number {
    if (!cards.length) return 0;
    const reviewedCount = this.countReviewed(cards);
    return Math.round((reviewedCount / cards.length) * 100);
  }

  deleteSet(id: string) {
    const confirmDelete = confirm('Are you sure you want to delete this set?');
    if (confirmDelete) {
      this.flashcardService.deleteSet(id).subscribe(() => {
        this.flashcardSets = this.flashcardSets.filter(set => set._id !== id);
        this.filterSets(); 
      });
    }
  }
}
