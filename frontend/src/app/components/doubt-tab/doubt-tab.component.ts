import { Component, Input, OnInit } from '@angular/core';
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
export class DoubtTabComponent implements OnInit {  
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
      _id: undefined,
      setId: this.setId,
      user: 'Anonymous',
      question: this.newDoubt,
      upvotes: 0,
      responses: []
    };

    this.doubtService.addDoubt(newThread).subscribe((created) => {
      this.doubts.unshift(created);
      this.newDoubt = '';
    });
  }

  addReply(threadId: string | undefined) {
    if (!threadId) return;

    const reply = this.replyMap[threadId];
    if (!reply?.trim()) return;

    const thread = this.doubts.find(d => d._id === threadId);
    if (thread) {
      thread.responses.push({ user: 'User', answer: reply });

      this.doubtService.updateDoubt(thread).subscribe(() => {
        this.replyMap[threadId] = '';
      });
    }
  }

  upvote(threadId: string | undefined) {
    if (!threadId) return;

    const thread = this.doubts.find(d => d._id === threadId);
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
  deleteDoubt(threadId: string) {
  if (!threadId) return;

  this.doubtService.deleteDoubt(threadId).subscribe(() => {
    // Remove from local list after successful deletion
    this.doubts = this.doubts.filter(d => d._id !== threadId);
  });
}

}
