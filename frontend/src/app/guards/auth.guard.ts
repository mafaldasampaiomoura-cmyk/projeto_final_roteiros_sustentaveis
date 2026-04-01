import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = () => {
  const router = inject(Router);

  const session = localStorage.getItem('session');
  const user = localStorage.getItem('user');

  if (session && user) {
    return true;
  }

  router.navigate(['/login']);
  return false;
};