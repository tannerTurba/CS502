import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";

export const profileGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
):
  | Observable<boolean | UrlTree>
  | Promise<boolean | UrlTree>
  | boolean
  | UrlTree => {
  
  let router = inject(Router);
  const currentUserId = sessionStorage.getItem('uid') as string;
  const requestId = route.params["uid"];

  // Redirects to another route
  if (currentUserId === '' && router.navigated) {
    return router.navigate([`/login`]);
  }

  // Grants or deny access to this route
  return currentUserId === requestId
};