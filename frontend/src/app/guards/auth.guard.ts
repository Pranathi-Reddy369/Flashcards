import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const token = localStorage.getItem('token'); // you're storing JWT token in localStorage after login

  if (!token) {
    alert('Please login to continue');
    router.navigate(['/login']);
    return false;
  }

  return true;
};
