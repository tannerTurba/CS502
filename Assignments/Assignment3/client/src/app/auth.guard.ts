import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "./auth.service";

export const profileGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
):
  | Observable<boolean | UrlTree>
  | Promise<boolean | UrlTree>
  | boolean
  | UrlTree => {

  let auth = inject(AuthService);
  const currentUser = auth.currentUser;

  // Redirects to another route
  const isAnonymous = !currentUser;
  if (isAnonymous && auth.isNavigated) {
    return inject(Router).createUrlTree(["/"]);
  }

  // Grants or deny access to this route
  const requestId = route.params["uid"];
  const attemptsToAccessItsOwnPage = currentUser?._id === requestId;
  return attemptsToAccessItsOwnPage || !auth.isNavigated;
};