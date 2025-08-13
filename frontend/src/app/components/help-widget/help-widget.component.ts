import { CommonModule } from '@angular/common';
import { Component, ElementRef, HostListener } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Feedback } from '../../models/app.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FeedbackService } from '../../services/feedback.service';

@Component({
  selector: 'app-help-widget',
  imports: [CommonModule,RouterLink],
  templateUrl: './help-widget.component.html',
  styleUrl: './help-widget.component.css'
})
export class HelpWidgetComponent {
   feedbacks: Feedback[] = [];
  feedbackForm!: FormGroup;
  submitting = false;
  errorMessage = '';
  successMessage = '';

  constructor(private feedbackService: FeedbackService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.loadFeedbacks();

    this.feedbackForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      message: ['', Validators.required],
      rating: [5, [Validators.required, Validators.min(1), Validators.max(5)]]
    });
  }

  loadFeedbacks(): void {
    this.feedbackService.getAllFeedback().subscribe({
      next: (data) => this.feedbacks = data.reverse(),
      error: (err) => this.errorMessage = 'Failed to load feedbacks'
    });
  }

  onSubmit(): void {
    if (this.feedbackForm.invalid) return;

    this.submitting = true;
    this.errorMessage = '';
    this.successMessage = '';

    const feedback: Feedback = {
      ...this.feedbackForm.value,
      date: new Date().toISOString()
    };

    this.feedbackService.submitFeedback(feedback).subscribe({
      next: (newFeedback) => {
        this.feedbacks.unshift(newFeedback);
        this.feedbackForm.reset({ rating: 5 });
        this.successMessage = 'Thank you for your feedback!';
        this.submitting = false;
      },
      error: (err) => {
        this.errorMessage = 'Failed to submit feedback.';
        this.submitting = false;
      }
    });
  }

}
