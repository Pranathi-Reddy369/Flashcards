import { CommonModule } from '@angular/common';
import { Component, ElementRef, HostListener } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-help-widget',
  imports: [CommonModule,RouterLink],
  templateUrl: './help-widget.component.html',
  styleUrl: './help-widget.component.css'
})
export class HelpWidgetComponent {
   menuOpen = false;

  constructor(private eRef: ElementRef) {}

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  @HostListener('document:click', ['$event'])
  handleClickOutside(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (!this.eRef.nativeElement.contains(target)) {
      this.menuOpen = false;
    }
  }
}
