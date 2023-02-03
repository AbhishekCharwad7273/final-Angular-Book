import { Component, OnInit } from '@angular/core';
import { DigitalBookService } from 'src/app/services/digital-book.service';

@Component({
  selector: 'app-all-book',
  templateUrl: './all-book.component.html',
  styleUrls: ['./all-book.component.css']
})
export class AllBookComponent implements OnInit {
  bookList: any;
  constructor(private digitalBookService: DigitalBookService) { }

  ngOnInit(): void {
  }

  searchAllBooks() {
    this.digitalBookService.searchAllBook(null)
      .subscribe({
        next: (data) => {
          this.bookList = data;
        },
        error: (e) => console.error(e)
      });
  }

}
