import { Component, Input } from '@angular/core';
import { FlashcardSet, QuizQuestion } from '../../models/app.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-quiz-tab',
  imports: [CommonModule],
  templateUrl: './quiz-tab.component.html',
  styleUrl: './quiz-tab.component.css'
})
export class QuizTabComponent {
  @Input() set!: FlashcardSet;

  currentIndex = 0;
  selectedAnswer: string | null = null;
  showResult = false;
  score = 0;
  quizCompleted = false;
  showInstructions = false;
  selectedQuestions: QuizQuestion[] = [];

  ngOnInit() {
    const saved = localStorage.getItem('quizProgress');
    if (saved) {
      const state = JSON.parse(saved);
      this.currentIndex = state.currentIndex;
      this.score = state.score;
      this.quizCompleted = state.quizCompleted;
      this.selectedQuestions = state.selectedQuestions.length ? state.selectedQuestions : (this.set.quizzes ?? []);
    } else {
      this.selectedQuestions = this.set.quizzes ?? [];
    }
  }

  toggleInstructions() {
    this.showInstructions = !this.showInstructions;
  }

  selectOption(option: string) {
    this.selectedAnswer = option;
    this.showResult = true;
    if (option === this.currentQuestion?.answer) {
      this.score++;
    }
  }

  skipQuestion() {
    this.showResult = false;
    this.selectedAnswer = null;
    this.currentIndex++;
    if (this.currentIndex >= this.selectedQuestions.length) {
      this.finishQuiz();
    } else {
      this.saveProgress();
    }
  }

  nextQuestion() {
    this.selectedAnswer = null;
    this.showResult = false;
    if (this.currentIndex < this.selectedQuestions.length - 1) {
      this.currentIndex++;
      this.saveProgress();
    }
  }

  prevQuestion() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      this.selectedAnswer = null;
      this.showResult = false;
      this.saveProgress();
    }
  }

  finishQuiz() {
    this.quizCompleted = true;
    this.saveProgress();
  }

  restart() {
    this.currentIndex = 0;
    this.selectedAnswer = null;
    this.showResult = false;
    this.score = 0;
    this.quizCompleted = false;
    this.selectedQuestions = this.set.quizzes ?? [];
    localStorage.removeItem('quizProgress');
  }

  get currentQuestion(): QuizQuestion | null {
    return this.selectedQuestions.length ? this.selectedQuestions[this.currentIndex] : null;
  }

  isLastQuestion(): boolean {
    return this.currentIndex === this.selectedQuestions.length - 1;
  }

  toggleQuestionSelection(q: QuizQuestion) {
    if (this.selectedQuestions.includes(q)) {
      this.selectedQuestions = this.selectedQuestions.filter(item => item !== q);
    } else {
      this.selectedQuestions.push(q);
    }
  }

  saveProgress() {
    localStorage.setItem('quizProgress', JSON.stringify({
      currentIndex: this.currentIndex,
      score: this.score,
      quizCompleted: this.quizCompleted,
      selectedQuestions: this.selectedQuestions
    }));
  }

  get totalQuestions(): number {
    return this.selectedQuestions.length;
  }}
