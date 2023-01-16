import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  userData: any;
  constructor(private user: LoginService, private router: Router) { }

  ngOnInit() {
    localStorage.removeItem('token');
    this.user.signUpUserDataSource.subscribe(userData => (this.userData = userData));
  }

  changeData(event: any) {
    var msg = event.target.value;
    this.user.login(msg);
  }

  signUp(data: any) {
    this.user.signUp(data).subscribe(res => {
      console.log('data response', res);
      this.router.navigate(['signIn']);
    });
  }
}

