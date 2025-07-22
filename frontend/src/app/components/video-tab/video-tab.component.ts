import { Component, Input } from '@angular/core';
import { FlashcardSet, VideoResource } from '../../models/app.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-video-tab',
  imports: [CommonModule],
  templateUrl: './video-tab.component.html',
  styleUrl: './video-tab.component.css'
})
export class VideoTabComponent {
   @Input() set!: FlashcardSet;

  get videos(): VideoResource[] {
    return this.set?.videos || [];
  }

  extractYouTubeId(url: string): string {
    const match = url.match(/(?:\?v=|\/embed\/|\.be\/)([a-zA-Z0-9_-]{11})/);
    return match ? match[1] : '';
  }

}
