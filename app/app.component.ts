import {Component, Inject} from '@angular/core';
import {SessionService} from "./auth/session.service";

@Component({
    selector: 'my-app',
    template: `
      <!--<nav class="blue-grey">-->
        <!--<div class="nav-wrapper">-->
        <!--<span style="padding: 0 15px; font-size: 20px;"><a routerLink="/" routerLinkActive="active">Agile Tool</a></span>-->
          <!--<ul id="nav-mobile" class="right hide-on-med-and-down">-->
            <!--<li><a routerLink="/backlog-item/create" routerLinkActive="active">Create Backlog Item</a></li>-->
            <!--<li><a routerLink="/" routerLinkActive="active">Dashboard</a></li>-->
            <!--<li><a href="/logout" routerLinkActive="active">Logout</a></li>-->
          <!--</ul>-->
        <!--</div>-->
      <!--</nav>-->
      <nav id="menu" class="navbar navbar-toggleable-sm navbar-inverse">
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarToggler" aria-controls="navbarToggler" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="container">
          <div class="collapse navbar-collapse" id="navbarToggler">
            <a class="navbar-brand hidden-sm-down" routerLink="/" routerLinkActive="active">Agile Tool</a>
            <ul class="navbar-nav ml-auto">
              <li class="nav-item">
                <a routerLink="/backlog-item/create" routerLinkActive="active">Create Backlog Item</a>
              </li>
              <li class="nav-item">
                <a routerLink="/" routerLinkActive="active">Dashboard</a>
              </li>
              <li class="nav-item">
                <a href="/logout" routerLinkActive="active">Logout</a>
              </li>
            </ul>
          </div>
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
