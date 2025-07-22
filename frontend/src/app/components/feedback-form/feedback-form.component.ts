import { Component } from '@angular/core';
import { Feedback } from '../../models/app.model';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FeedbackService } from '../../services/feedback.service';

@Component({
  selector: 'app-feedback-form',
  imports: [CommonModule,FormsModule],
  templateUrl: './feedback-form.component.html',
  styleUrl: './feedback-form.component.css'
})
export class FeedbackFormComponent {
  name = '';
  email = '';
  message = '';
  rating = 0;
  submitted = false;

  constructor(private feedbackService: FeedbackService) {}

  submitForm() {
    if (this.name && this.email && this.message && this.rating > 0) {
      const feedback: Feedback = {
        name: this.name,
        email: this.email,
        message: this.message,
        rating: this.rating,
        date: new Date().toISOString()
      };

      this.feedbackService.submitFeedback(feedback).subscribe({
        next: () => {
          this.submitted = true;
        },
        error: (err) => {
          console.error('Error submitting feedback:', err);
          alert('Failed to submit feedback');
        }
      });
    } else {
      alert('Please fill out all fields and provide a rating.');
    }
  }
}
