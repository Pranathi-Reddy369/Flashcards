import { Component } from '@angular/core';
import { Bookmark } from '../../models/app.model';
import { BookmarkService } from '../../services/bookmark.service';
import { FlashcardService } from '../../services/flashcard.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-bookmarks',
  imports: [CommonModule],
  templateUrl: './bookmarks.component.html',
  styleUrl: './bookmarks.component.css'
})
export class BookmarksComponent {
  bookmarks: Bookmark[] = [];
  flashcards: any[] = [];

  constructor(
    private bookmarkService: BookmarkService,
    private flashcardService: FlashcardService
  ) {}

  ngOnInit() {
    this.bookmarkService.getAll().subscribe(bookmarks => {
      this.bookmarks = bookmarks;
      this.flashcards = [];

      bookmarks.forEach(b => {
        this.flashcardService.getSet(b.setId).subscribe(set => {
          const card = set.cards.find((c: { id: number }) => c.id === b.cardId);
          if (card) {
            this.flashcards.push({ setTitle: set.title, ...card });
          }
        });
      });
    });
  }
}
