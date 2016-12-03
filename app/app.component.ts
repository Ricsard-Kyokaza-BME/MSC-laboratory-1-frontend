import {Component, Inject} from '@angular/core';
import {SessionService} from "./auth/session.service";

@Component({
    selector: 'my-app',
    template: `<h1 class="title">Angular Router</h1>
    <nav>
      <a *ngIf="isSignedIn == false" href="/" routerLinkActive="active">Login</a>
      <a *ngIf="isSignedIn == true" href="/logout" routerLinkActive="active">Logout</a>
    </nav>
    <router-outlet></router-outlet>`
})
export class AppComponent {
  isSignedIn: boolean;

  constructor(@Inject(SessionService) sessionService: SessionService) {
    this.isSignedIn = sessionService.getSignedInUser() ? true : false;
  }
}
