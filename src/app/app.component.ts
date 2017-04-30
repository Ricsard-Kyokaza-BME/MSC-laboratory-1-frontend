import {Component, Inject} from '@angular/core';
import {SessionService} from './auth/session.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  isSignedIn: boolean;

  constructor(@Inject(SessionService) private _sessionService: SessionService) {
    this.isSignedIn = !!SessionService.getSignedInUser();
  }

  logout() {
    SessionService.logout();
  }
}
