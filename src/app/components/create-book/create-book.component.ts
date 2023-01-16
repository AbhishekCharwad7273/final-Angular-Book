import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { DigitalBookService } from "../../services/digital-book.service";
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-create-book',
  templateUrl: './create-book.component.html',
  styleUrls: ['./create-book.component.css']
})
export class CreateBookComponent implements OnInit {

  form: FormGroup = new FormGroup({
    title: new FormControl(''),
    category: new FormControl(''),
    publisher: new FormControl(''),
    active: new FormControl(false),
    price: new FormControl(''),
    content: new FormControl(''),
    authorId: new FormControl(1),
    publishedDate: new FormControl(new Date())
  });
  submitted = false;
  bookData = {};
  bookId: any;
  bookList: any;

  constructor(private bookService: DigitalBookService, private formBuilder: FormBuilder, private router: ActivatedRoute) { }

  ngOnInit(): void {
    this.router.params.subscribe((params: { [x: string]: any; }) =>
      this.bookId = params['bookId']
    )

    if (this.bookId) {
      this.bookService.getBookById(this.bookId)
        .subscribe({
          next: (data) => {
            this.bookList = data;
            this.form = this.formBuilder.group(
              {
                title: [this.bookList.title, Validators.required],
                category: [this.bookList.category, Validators.required],
                price: [this.bookList.price, Validators.required],
                content: [this.bookList.content, Validators.required],
                publisher: [this.bookList.publisher, Validators.required],
                active: [true],
                blocked: [false, Validators.requiredTrue],
                authorId: [1],
                publishedDate: [new Date()]
              }
            );
          },
          error: (e) => console.error(e)
        });
    }
    this.bookService.bookData.subscribe(bookData => (this.bookData = bookData));
    if (!this.bookId) {
      this.form = this.formBuilder.group(
        {
          title: ['', Validators.required],
          category: ['', Validators.required],
          price: ['', Validators.required],
          content: ['', Validators.required],
          publisher: ['', Validators.required],
          active: [true],
          blocked: [false, Validators.requiredTrue],
          authorId: [1],
          publishedDate: [new Date()]
        }
      );
    }

  }


  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  onSubmit(): void {
    this.submitted = true;
    this.bookService.createBook(this.form.value).subscribe(res => {
      alert("Book Created");
      this.submitted = false;
      this.form.reset();
    });
  }

  updateBook() {
    this.bookService.updateBook(this.form.value, this.bookId).subscribe(res => {
      alert("Book Updated");
      this.submitted = false;
    });
  }

  onReset(): void {
    this.submitted = false;
    this.form.reset();
  }
}
