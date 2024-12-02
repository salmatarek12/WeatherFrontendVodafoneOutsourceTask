import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})

export class NavigationGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const navigationState = history.state;

    console.log('Navigation State: ', navigationState);
    if (navigationState?.navigationId) {
      console.log('Guard passed, navigation allowed');

      return true; // Allow navigation
    }

    console.log('Guard not passed, Nooooooo');
    // Redirect if accessed manually
    this.router.navigate(['/cities']);
    return false;
  }
}