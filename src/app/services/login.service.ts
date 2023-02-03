import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BehaviorSubject, Subject } from 'rxjs';

//const baseUrl = 'http://localhost:8080/api/tutorials';
const USER_ROOT_URL:string = "http://43.207.54.29";

const loginUrl = USER_ROOT_URL+':9091/api/v1/digitalbooks/authentication/sign-in';
@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private userDataSource = new BehaviorSubject({ emailId: '', password: '' });
  currentUserData = this.userDataSource.asObservable();

  private signupUserDataSource = new BehaviorSubject({ emailId: '', password: '', userName: '', authorUser: false });
  signUpUserDataSource = this.signupUserDataSource.asObservable();

  private data = new Subject<any>();
  public data$ = this.data.asObservable();
  public token = '';

  emitdata(x: any) {
    this.data.next(x);
  }

  constructor(private http: HttpClient) { }

  changeData(newUserData: any) {
    this.userDataSource.next(newUserData)
  }

  login(data: any): Observable<any> {
    return this.http.post(loginUrl, data);
  }

  signUp(data: any): Observable<any> {
    return this.http.post(USER_ROOT_URL+':9091/api/v1/digitalbooks/authentication/sign-up', data);
  }

}
