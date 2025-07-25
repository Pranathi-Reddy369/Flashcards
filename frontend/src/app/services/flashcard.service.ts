import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FlashcardSet } from '../models/app.model';
import { Observable, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FlashcardService {

  private baseUrl = 'http://localhost:4000';
  
  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token') || '';
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }

  // 🔹 Get all flashcard sets
  getAllSets(): Observable<FlashcardSet[]> {
    return this.http.get<FlashcardSet[]>(`${this.baseUrl}/flashcards`, {
      headers: this.getAuthHeaders()
    });
  }

  // 🔹 Get a single flashcard set
  getSet(id: string): Observable<FlashcardSet> {
    return this.http.get<FlashcardSet>(`${this.baseUrl}/flashcards/${id}`, {
      headers: this.getAuthHeaders()
    });
  }

  // 🔹 Create a new flashcard set
  createSet(set: Omit<FlashcardSet, '_id'>): Observable<FlashcardSet> {
    return this.http.post<FlashcardSet>(`${this.baseUrl}/flashcards`, set, {
      headers: this.getAuthHeaders()
    });
  }

  // 🔹 Update an existing flashcard set
  updateSet(id: string, set: FlashcardSet): Observable<FlashcardSet> {
    return this.http.put<FlashcardSet>(`${this.baseUrl}/flashcards/${id}`, set, {
      headers: this.getAuthHeaders()
    });
  }

  // 🔹 Soft delete (move to trash or mark deleted)
  deleteSet(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/flashcards/${id}`, {
      headers: this.getAuthHeaders()
    });
  }

  // 🔹 Get all deleted sets (if soft-deletion used)
  getDeletedSets(): Observable<FlashcardSet[]> {
    return this.http.get<FlashcardSet[]>(`${this.baseUrl}/deletedflashcards`, {
      headers: this.getAuthHeaders()
    });
  }

  // 🔹 Restore deleted set (if soft-deletion supported)
  restoreSet(set: FlashcardSet): Observable<any> {
    return this.http.post(`${this.baseUrl}/flashcards/restore/${set._id}`, set, {
      headers: this.getAuthHeaders()
    });
  }

  // 🔹 Permanently delete from trash
  permanentlyDeleteSet(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/deletedflashcards/${id}`, {
      headers: this.getAuthHeaders()
    });
  }
}
