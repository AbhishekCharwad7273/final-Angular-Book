import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  userData: any;
  constructor(private user: LoginService, private router: Router) { }

  ngOnInit() {
    localStorage.removeItem('token');
    this.user.currentUserData.subscribe(userData => (this.userData = userData));
  }

  changeData(event: any) {
    var msg = event.target.value;
    this.user.changeData(msg);
  }

  login(data: any) {
    this.user.login(data).subscribe(res => {
      localStorage.setItem('token', res.token);
      localStorage.setItem('userId', res.id);
      localStorage.setItem('isAuthorUser', res.authorUser || false);
      this.user.emitdata(res);
      this.user.token = res.token;
      this.router.navigate(['searchBook']);
    },
      (error) => (error: any) => {
        alert(error.errorMessage)
        console.log(error);
      });
  }
}
