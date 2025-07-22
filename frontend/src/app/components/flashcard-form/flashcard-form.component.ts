import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FlashcardSet } from '../../models/app.model';
import { ActivatedRoute, Router } from '@angular/router';
import { FlashcardService } from '../../services/flashcard.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-flashcard-form',
  imports: [FormsModule,CommonModule],
  templateUrl: './flashcard-form.component.html',
  styleUrl: './flashcard-form.component.css'
})
export class FlashcardFormComponent implements OnInit {
  set: FlashcardSet = {
    _id: '',
    title: '',
    description: '',
    cards: [],
    tags: []
  };

  editing = false;
  tagsInput: string = '';

  constructor(
    private route: ActivatedRoute,
    private flashcardService: FlashcardService,
    private router: Router
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.editing = true;
      this.flashcardService.getSet(id).subscribe({
        next: (data) => {
          this.set = data;
          this.tagsInput = (data.tags || []).join(', ');
        },
        error: (err) => {
          console.error('Failed to load set:', err);
          alert('Flashcard set not found');
          this.router.navigate(['/home']);
        }
      });
    } else {
      this.addCard();
    }
  }

  addCard() {
    this.set.cards.push({
      id: Date.now(),
      question: '',
      answer: '',
      difficulty: 'Easy' // ✅ default difficulty
    });
  }

  removeCard(index: number) {
    this.set.cards.splice(index, 1);
  }

  saveSet() {
    this.set.tags = this.tagsInput
      .split(',')
      .map(tag => tag.trim())
      .filter(tag => tag !== '');

    const invalidCard = this.set.cards.some(
      card => !card.question.trim() || !card.answer.trim() || !card.difficulty
    );

    if (!this.set.title.trim()) {
      alert('Title is required!');
      return;
    }

    if (invalidCard) {
      alert('All cards must have a question, answer, and difficulty!');
      return;
    }

    if (this.editing) {
      this.flashcardService.updateSet(this.set._id!, this.set).subscribe(() => {
        alert('Updated!');
        this.router.navigate(['/home']);
      });
    } else {
      this.set.cards.forEach(card => {
        card.id = Date.now() + Math.floor(Math.random() * 1000);
      });

      const { _id, ...dataWithoutId } = this.set;

      this.flashcardService.createSet(dataWithoutId as Omit<FlashcardSet, 'id'>).subscribe(createdSet => {
        alert('Created!');
        console.log("Created set with ID:", createdSet._id);
        this.router.navigate(['/home']);
      });
    }
  }
}
