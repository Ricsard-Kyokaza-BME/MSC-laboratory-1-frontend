import {Component, Inject} from '@angular/core';
import {SessionService} from "./auth/session.service";

@Component({
    selector: 'my-app',
    template: `
      <nav class="blue-grey">
        <div class="nav-wrapper">
        <span style="padding: 0 15px; font-size: 20px;"><a routerLink="/" routerLinkActive="active">Agile Tool</a></span>
          <ul id="nav-mobile" class="right hide-on-med-and-down">
            <li><a routerLink="/backlog-item/create" routerLinkActive="active">Create Backlog Item</a></li>
            <li><a routerLink="/" routerLinkActive="active">Dashboard</a></li>
            <li><a href="/logout" routerLinkActive="active">Logout</a></li>
          </ul>
        </div>
      </nav>
      <router-outlet></router-outlet>`
})
export class AppComponent {
  isSignedIn: boolean;

  constructor(@Inject(SessionService) sessionService: SessionService) {
    this.isSignedIn = !!sessionService.getSignedInUser();
  }
}
