import { ActivatedRouteSnapshot, CanActivateFn, Router } from '@angular/router';
import { FlashcardService } from '../services/flashcard.service';
import { inject } from '@angular/core';
import { catchError, map, of } from 'rxjs';

export const validSetGuard: CanActivateFn = (route: ActivatedRouteSnapshot) => {
  const flashcardService = inject(FlashcardService);
  const router = inject(Router);

  const id = route.paramMap.get('id');

  if (!id || id.trim() === '') {
    router.navigate(['/']);
    return of(false);
  }

  return flashcardService.getSet(id).pipe(
    map(set => {
      if (set) return true;
      router.navigate(['/']);
      return false;
    }),
    catchError(() => {
      router.navigate(['/']);
      return of(false);
    })
  );
};
