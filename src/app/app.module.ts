import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule ,ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule,HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { BookListComponent } from './components/book-list/book-list.component';
import { CreateBookComponent } from './components/create-book/create-book.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RequestInterceptor } from './http.interceptor';
import { ReadBookComponent } from './components/read-book/read-book.component';
import { MyBooksComponent } from './components/my-books/my-books.component';
import { AllBookComponent } from './components/all-book/all-book.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    BookListComponent,
    CreateBookComponent,
    ReadBookComponent,
    MyBooksComponent,
    AllBookComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [ {provide: HTTP_INTERCEPTORS, useClass: RequestInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
