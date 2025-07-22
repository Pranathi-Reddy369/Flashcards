import { Component, Input } from '@angular/core';
import { FlashcardSet } from '../../models/app.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-flashcard-tab',
  imports: [CommonModule],
  templateUrl: './flashcard-tab.component.html',
  styleUrl: './flashcard-tab.component.css'
})
export class FlashcardTabComponent {
    @Input() set!: FlashcardSet; 
}
