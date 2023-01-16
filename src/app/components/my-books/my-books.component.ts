import { Component, OnInit } from '@angular/core';
import { DigitalBookService } from 'src/app/services/digital-book.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-my-books',
  templateUrl: './my-books.component.html',
  styleUrls: ['./my-books.component.css']
})

export class MyBooksComponent implements OnInit {
  bookList: any;
  isAuthor: any;
  constructor(private digitalBookService: DigitalBookService, private user: LoginService) { }

  ngOnInit(): void {
    this.isAuthor = localStorage.getItem('isAuthorUser') || '';
    this.getMyBooks();
  }

  getMyBooks() {
    this.digitalBookService.getAllSubscribedBook(Number(localStorage.getItem('userId')))
      .subscribe({
        next: (data) => {
          if (data.length === 0) {
            this.bookList = data;
            alert("No Book Found, Please Subscribe the book")
          }
          else {
          this.bookList = data;
          }
        },
        error: (e) => console.error(e)
      });
  }

  blockUnblockBook(isBlock:boolean, bookId:any){
    this.digitalBookService.blockUnblockBook(isBlock,bookId)
    .subscribe({
      next: (data) => {
        this.bookList = data;
        isBlock ? alert("Book blocked"): alert("Book Un-blocked!!") 
        this.getMyBooks();
      },
      error: (e) => console.error(e)
    });
  }

  unSubscribeBook(bookId: any) {
    const userId = Number(localStorage.getItem('userId'));
    this.digitalBookService.unSubscribeBook(bookId, userId)
      .subscribe({
        next: (data) => {
          alert("Book UnSubscribed");
          this.getMyBooks();
        },
        error: (e) => console.error(e)
      });
  }
}
