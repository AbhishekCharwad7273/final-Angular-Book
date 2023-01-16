import { Component } from '@angular/core';
import { LoginService } from "./services/login.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  isAuthor: any = false;
  isUserLoggedIn: boolean = false;
  currentUser: string = '';
  constructor(private user: LoginService) { }
  title = 'DigitalBooK';
  ngOnInit() {
    this.isAuthor = localStorage.getItem('isAuthorUser');
    this.user.data$.subscribe(
      (data) => {
        this.isAuthor = data.authorUser;
        this.currentUser = data.name;
        this.isUserLoggedIn = data.token ? true : false
      }
    );
  }


  signOut() {
    this.isAuthor = null;
    this.currentUser = '';
    this.isUserLoggedIn = false;
    this.user.emitdata(null);
  }
}
