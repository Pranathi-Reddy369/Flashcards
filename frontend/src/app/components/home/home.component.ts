import { Component, OnInit } from '@angular/core';
import { Contact, Flashcard, FlashcardSet } from '../../models/app.model';
import { FlashcardService } from '../../services/flashcard.service';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SearchService } from '../../services/search.service';
import { ContactService } from '../../services/contact.service';


@Component({
  selector: 'app-home',
  imports: [RouterLink,CommonModule,FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  flashcardSets: FlashcardSet[] = [];
  searchTerm: string = '';
  selectedTag: string | null = null;

  faqs = [
  {
    question: 'What is "Learn Now" and who is it for?',
    answer: 'Learn Now is a flashcard-based learning app built for students, professionals, and anyone who wants to learn smart and stay consistent.'
  },
  {
    question: 'How can I track my learning streak?',
    answer: 'The app tracks your daily study streak, minutes watched, and questions attempted so you stay motivated every day.'
  },
  {
    question: 'Can I bookmark important flashcards?',
    answer: 'Yes, you can bookmark your favorite flashcards and access them anytime from the Bookmark section in the navbar.'
  },
  {
    question: 'Are there quizzes for each topic?',
    answer: 'Absolutely! Each flashcard set offers quizzes to help you test your understanding in a fun way.'
  },
  {
    question: 'Is my data saved if I refresh or close the app?',
    answer: 'Yes, your progress, bookmarks, and streak data are stored locally using localStorage and db.json.'
  },
  {
    question: 'How can I clear my doubts or ask questions?',
    answer: 'Each topic has a doubt-resolution tab where you can ask questions and get answers in a community-like environment.'
  }
];


  // Contact form state
  contactData: Contact = { name: '', email: '', message: '' };
  showContactModal: boolean = false;

  constructor(
    private flashcardService: FlashcardService,
    private searchService: SearchService,
    private contactService: ContactService
  ) {}

  ngOnInit() {
    this.loadSets();
    this.searchService.searchTerm$.subscribe(term => {
      this.searchTerm = term;
    });
  }

  loadSets() {
    this.flashcardService.getAllSets().subscribe(data => {
      this.flashcardSets = data;
    });
  }

  get filteredSets(): FlashcardSet[] {
    const term = this.searchTerm.trim().toLowerCase();

    if (this.selectedTag) {
      return this.flashcardSets.filter(set =>
        (set.tags || []).some(tag => tag.toLowerCase() === this.selectedTag?.toLowerCase())
      );
    }

    if (!term) return this.flashcardSets;

    return this.flashcardSets.filter(set =>
      set.title.toLowerCase().includes(term) ||
      (set.tags || []).some(tag => tag.toLowerCase().includes(term))
    );
  }

  deleteSet(id: string) {
    const confirmDelete = confirm('Are you sure you want to delete this set?');
    if (confirmDelete) {
      this.flashcardService.deleteSet(id).subscribe(() => {
        this.flashcardSets = this.flashcardSets.filter(set => set._id !== id);
      });
    }
  }

  logSet(set: FlashcardSet) {
    console.log('Clicked Edit for set:', set);
  }

  filterByTag(tag: string) {
    this.selectedTag = tag;
  }

  clearTag() {
    this.selectedTag = null;
  }

  countByDifficulty(cards: Flashcard[], level: 'Easy' | 'Medium' | 'Hard'): number {
    return cards.filter(card => card.difficulty === level).length;
  }

  countReviewed(cards: Flashcard[]): number {
    return cards.filter(card => card.isReviewed).length;
  }

  getProgress(cards: Flashcard[]): number {
    if (!cards.length) return 0;
    return (this.countReviewed(cards) / cards.length) * 100;
  }

  getTagColor(tag: string): string {
    const colors = ['#6f42c1', '#d63384', '#fd7e14', '#198754', '#0d6efd'];
    const hash = Array.from(tag).reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return colors[hash % colors.length];
  }

  // 🟢 Modal control methods
  openModal() {
    this.showContactModal = true;
  }

  closeModal() {
    this.showContactModal = false;
  }

  submitContact() {
    const { name, email, message } = this.contactData;

    if (!name || !email || !message) return;

    this.contactService.submitContact(this.contactData).subscribe(() => {
      alert('Thank you for contacting us!');
      this.contactData = { name: '', email: '', message: '' };
      this.closeModal();
    });
  }
}
