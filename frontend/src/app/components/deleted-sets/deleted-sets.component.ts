import { Component } from '@angular/core';
import { FlashcardSet } from '../../models/app.model';
import { FlashcardService } from '../../services/flashcard.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { concatMap, finalize, from } from 'rxjs';

@Component({
  selector: 'app-deleted-sets',
  imports: [CommonModule,FormsModule],
  templateUrl: './deleted-sets.component.html',
  styleUrl: './deleted-sets.component.css'
})
export class DeletedSetsComponent {
  deletedSets: (FlashcardSet & { selected?: boolean })[] = [];
  selectAll: boolean = false;
  selectionMode: boolean = false;
  viewMode: 'grid' | 'list' = 'grid';

  constructor(private flashcardService: FlashcardService) {}

  ngOnInit(): void {
    this.loadDeletedSets();
  }

  loadDeletedSets() {
    this.flashcardService.getDeletedSets().subscribe(data => {
      this.deletedSets = data.map(set => ({ ...set, selected: false }));
    });
  }

  toggleSelectionMode() {
    this.selectionMode = !this.selectionMode;
    if (!this.selectionMode) {
      this.selectAll = false;
      this.deletedSets.forEach(set => set.selected = false);
    }
  }

  toggleSelectAll() {
    this.deletedSets.forEach(set => set.selected = this.selectAll);
  }

  checkIfAllSelected() {
    this.selectAll = this.deletedSets.every(set => set.selected);
  }

  selectedSets(): FlashcardSet[] {
    return this.deletedSets.filter(set => set.selected);
  }

  restoreSet(set: FlashcardSet) {
    this.flashcardService.restoreSet(set).subscribe(() => {
      this.loadDeletedSets();
    });
  }

  restoreSelected() {
    const setsToRestore = this.selectedSets();
    setsToRestore.forEach(set => {
      this.flashcardService.restoreSet(set).subscribe(() => {
        this.loadDeletedSets();
      });
    });
  }

  deleteSelected() {
    const setsToDelete = this.selectedSets();
    from(setsToDelete).pipe(
      concatMap(set => this.flashcardService.permanentlyDeleteSet(set._id!)),
      finalize(() => this.loadDeletedSets())
    ).subscribe({
      error: err => console.error('Bulk delete failed', err)
    });
  }
}
