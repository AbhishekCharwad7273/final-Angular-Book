import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DigitalBookService } from 'src/app/services/digital-book.service';

@Component({
  selector: 'app-read-book',
  templateUrl: './read-book.component.html',
  styleUrls: ['./read-book.component.css']
})
export class ReadBookComponent implements OnInit {

  constructor(private bookService: DigitalBookService, private router: ActivatedRoute) { }
  bookId: any;
  bookData: any;
  ngOnInit(): void {
    this.router.params.subscribe((params: { [x: string]: any; }) =>
      this.bookId = params['bookId']
    )
    this.bookService.getBookById(this.bookId)
      .subscribe({
        next: (data) => {
          this.bookData = data;
          console.log(data);
        }
      })
  }

}
