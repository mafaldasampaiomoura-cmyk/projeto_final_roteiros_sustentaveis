import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, NavigationEnd } from '@angular/router';
import { filter, Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar implements OnInit, OnDestroy {
  isLoggedIn = false;
  userEmail = '';
  private routerSubscription?: Subscription;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.checkLoginStatus();

    this.routerSubscription = this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.checkLoginStatus();
      });
  }

  checkLoginStatus(): void {
    const session = localStorage.getItem('session');
    const user = localStorage.getItem('user');

    this.isLoggedIn = !!session;

    if (user) {
      const parsedUser = JSON.parse(user);
      this.userEmail = parsedUser.email || '';
    } else {
      this.userEmail = '';
    }
  }

  logout(): void {
    localStorage.removeItem('session');
    localStorage.removeItem('user');
    this.isLoggedIn = false;
    this.userEmail = '';
    this.router.navigate(['/']);
  }

  ngOnDestroy(): void {
    this.routerSubscription?.unsubscribe();
  }
}