import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';

const BOOK_ROOT_URL:string = "http://54.95.195.175";
const USER_ROOT_URL:string = "http://43.207.54.29";

@Injectable({
  providedIn: 'root'
})
export class DigitalBookService {
  private bookDataSource = new BehaviorSubject({});
  bookData = this.bookDataSource.asObservable();

  constructor(private http: HttpClient) { }
  public searchBook(data: any): Observable<any> {
    const url = USER_ROOT_URL+`:9091/api/v1/digitalbooks/books/`;
    return this.http.get(url);
  }

  public createBook(data: any): Observable<any> {
    const url = BOOK_ROOT_URL+':9090/api/v1/digitalbooks/1/books'
    return this.http.post(url, data);
  }

  public getBookById(bookId: any): Observable<any> {
    const url = BOOK_ROOT_URL+`:9090/api/v1/digitalbooks/books/${bookId}`
    return this.http.get(url);
  }

  public updateBook(data: any, bookId: number): Observable<any> {
    const url = USER_ROOT_URL+`:9091/api/v1/digitalbooks/author/${data.authorId}/books/${bookId}`
    return this.http.put(url, data);
  }

  public getAllSubscribedBook(UserId: any): Observable<any> {
    const url = USER_ROOT_URL+`:9091/api/v1/digitalbooks/user/subscribe/${UserId}`
    return this.http.get(url);
  }

  public blockUnblockBook(isBlock:boolean,bookId: any): Observable<any> {
    const url = BOOK_ROOT_URL+`:9090/api/v1/digitalbooks/1/books/${bookId}?block=${isBlock}`
    return this.http.get(url);
  }

  public subscribeBook(userId: any, bookId: any): Observable<any> {
    const url = USER_ROOT_URL+`:9091/api/v1/digitalbooks/user/subscribe/${userId}/${bookId}`
    return this.http.get(url);
  }

  public unSubscribeBook(userId: any, bookId: any): Observable<any> {
    const url = USER_ROOT_URL+`:9091/api/v1/digitalbooks/user/unsubscribe/${userId}/${bookId}`
    return this.http.get(url);
  }

  public searchAllBook(data: any): Observable<any> {
    const url = BOOK_ROOT_URL+`:9090/api/v1/digitalbooks/books`;
    return this.http.get(url);
  }
}
