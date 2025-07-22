import { Component, Input } from '@angular/core';
import { ExternalResource, FlashcardSet } from '../../models/app.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-resource-tab',
  imports: [CommonModule],
  templateUrl: './resource-tab.component.html',
  styleUrl: './resource-tab.component.css'
})
export class ResourceTabComponent {
    @Input() set!: FlashcardSet;
      get resources(): ExternalResource[] {
    return this.set?.resources || [];
  }
}
