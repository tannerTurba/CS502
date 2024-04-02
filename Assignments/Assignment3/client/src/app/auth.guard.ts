import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';

export const authGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  // if (/* your authentication condition */) {
  //   return true;
  // } else {
  //   this.router.navigate(['/login']);
  //   return false;
  // }
  return inject(TokenService).authenticated()
    ? true
    : inject(Router).navigateByUrl('login');
};
