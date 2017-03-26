import {Component, Inject} from '@angular/core';
import {SessionService} from "./auth/session.service";

@Component({
    selector: 'agile-app',
    template: `
      <nav id="menu" class="navbar navbar-toggleable-sm navbar-inverse">
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarToggler" aria-controls="navbarToggler" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="container">
          <div class="collapse navbar-collapse" id="navbarToggler">
            <a class="navbar-brand hidden-sm-down" routerLink="/projects" routerLinkActive="active">Agile Tool</a>
            <ul class="navbar-nav ml-auto">
              <li class="nav-item">
                <a routerLink="/backlog-item/create" routerLinkActive="active">Create Backlog Item</a>
              </li>
              <li class="nav-item">
                <a routerLink="/project/create" routerLinkActive="active">Create Project</a>
              </li>
              <li class="nav-item">
                <a routerLink="/projects" routerLinkActive="active">Dashboard</a>
              </li>
              <li class="nav-item">
                <a (click)="logout()" routerLinkActive="active">Logout</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <router-outlet></router-outlet>`
})
export class AppComponent {
  isSignedIn: boolean;

  constructor(@Inject(SessionService) private _sessionService: SessionService) {
    this.isSignedIn = !!_sessionService.getSignedInUser();
  }

  logout() {
    this._sessionService.logout();
  }
}
