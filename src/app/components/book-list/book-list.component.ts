import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { DigitalBookService } from 'src/app/services/digital-book.service';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookListComponent implements OnInit {
  visible: boolean = false;
  constructor(private digitalBookService: DigitalBookService, private cd: ChangeDetectorRef, private formBuilder: FormBuilder, private user: LoginService) { }
  title: any;
  bookList: any = [];
  form: FormGroup = new FormGroup({
    title: new FormControl(''),
    category: new FormControl(''),
    publisher: new FormControl(''),
    active: new FormControl(false),
    price: new FormControl(''),
    content: new FormControl(''),
    author: new FormControl(''),
    authorId: new FormControl(1),
    publishedDate: new FormControl(new Date())
  });
  submitted = false;
  bookData = {};
  isAuthor = '';
  myBookList = [];
  authorId = localStorage.getItem('authorId');

  ngOnInit(): void {
    this.isAuthor = localStorage.getItem('isAuthorUser') || '';
    this.form = this.formBuilder.group(
      {
        title: ['', Validators.required],
        category: ['', Validators.required],
        price: ['', Validators.required],
        content: ['', Validators.required],
        publisher: ['', Validators.required],
        active: [true, Validators.requiredTrue],
        authorId: [1],
        publishedDate: [new Date(), Validators.required]
      }
    );
  }

  searchBook(bookId: any): void {
    this.digitalBookService.getAllSubscribedBook(Number(localStorage.getItem('userId')))
      .subscribe({
        next: (data) => {
          this.myBookList = data.map((e: any) => e.book.bookId);
        },
        error: (e) => console.error(e)
      });
    this.digitalBookService.searchBook(this.form.value)
      .subscribe({
        next: (data) => {
          data.forEach((e: any) => {

            if (this.myBookList.includes(e.bookId as never)) {
              e['subscription'] = true;
            }
            else {
              e['subscription'] = false;
            }
            if (e.bookId == bookId) {
              e['subscription'] = true;
            }
            this.cd.detectChanges();
          });
          let bookFIlterData: any = [];
          if (this.form.value.title) {
            bookFIlterData = data.filter((x: any) => x.title.toLowerCase() === this.form.value.title.toLowerCase());
          }
          if (this.form.value.category) {
            bookFIlterData = data.filter((x: any) => x.category.toLowerCase() === this.form.value.category.toLowerCase());
          }
          if (this.form.value.publisher) {
            bookFIlterData = data.filter((x: any) => x.publisher.toLowerCase() === this.form.value.publisher.toLowerCase());
          }
          else if (this.form.value.title && this.form.value.category) {
            bookFIlterData = data.filter((x: any) => x.title.toLowerCase() === this.form.value.title.toLowerCase() || x.category.toLowerCase() === this.form.value.category.toLowerCase());
          }
          else if (this.form.value.title && this.form.value.category && this.form.value.publisher) {
            bookFIlterData = data.filter((x: any) => x.title.toLowerCase() === this.form.value.title.toLowerCase() && x.category.toLowerCase() === this.form.value.category.toLowerCase() && x.publisher.toLowerCase() === this.form.value.publisher.toLowerCase());
          }


          if (bookFIlterData.length === 0) alert("No Book Available")
          this.bookList = bookFIlterData
          this.cd.detectChanges();
        },
        error: (e) => console.error(e)
      });
  }

  getBookById(bookId: any) {
    this.digitalBookService.getBookById(bookId)
      .subscribe({
        next: (data) => {
          this.bookList = [...data];
        },
        error: (e) => console.error(e)
      });
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  subscribeBook(bookId: any) {
    const userId = Number(localStorage.getItem('userId'));
    this.digitalBookService.subscribeBook(bookId, userId)
      .subscribe({
        next: (data) => {
          alert("Book Subscribed");
          this.bookList = [...data];
        },
        error: (e) => console.error(e)
      });
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
  }

  onReset(): void {
    this.submitted = false;
    this.form.reset();
  }
}
