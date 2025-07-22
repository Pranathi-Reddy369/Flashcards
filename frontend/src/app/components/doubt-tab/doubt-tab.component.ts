import { Component, Input } from '@angular/core';
import { DoubtThread } from '../../models/app.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DoubtService } from '../../services/doubt.service';

@Component({
  selector: 'app-doubt-tab',
  imports: [CommonModule,FormsModule],
  templateUrl: './doubt-tab.component.html',
  styleUrl: './doubt-tab.component.css'
})
export class DoubtTabComponent {  
   @Input() setId!: string;
  doubts: DoubtThread[] = [];
  newDoubt = '';
  replyMap: { [key: string]: string } = {};

  constructor(private doubtService: DoubtService) {}

  ngOnInit() {
    this.loadDoubts();
  }

  loadDoubts() {
    this.doubtService.getDoubts().subscribe((data) => {
      this.doubts = data.filter(d => d.setId === this.setId);
    });
  }

  addDoubt() {
    if (!this.newDoubt.trim()) return;

    const newThread: DoubtThread = {
      id: Date.now().toString(),
      setId: this.setId,
      user: 'Anonymous',
      question: this.newDoubt,
      upvotes: 0,
      responses: []
    };

    this.doubtService.addDoubt(newThread).subscribe((created) => {
      this.doubts.unshift(created); // Reflect immediately in UI
      this.newDoubt = '';
    });
  }

  addReply(doubtId: string) {
    const reply = this.replyMap[doubtId];
    if (!reply?.trim()) return;

    const thread = this.doubts.find(d => d.id === doubtId);
    if (thread) {
      thread.responses.push({ user: 'User', answer: reply });

      this.doubtService.updateDoubt(thread).subscribe(() => {
        this.replyMap[doubtId] = '';
      });
    }
  }

 upvote(doubtId: string) {
  const thread = this.doubts.find(d => d.id === doubtId);
  if (thread) {
    if (thread.likedByUser) {
      thread.upvotes -= 1;
      thread.likedByUser = false;
    } else {
      thread.upvotes += 1;
      thread.likedByUser = true;
    }

    this.doubtService.updateDoubt(thread).subscribe();
  }
}

}
