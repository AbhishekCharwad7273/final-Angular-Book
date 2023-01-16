import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookListComponent } from './components/book-list/book-list.component'
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { CreateBookComponent } from './components/create-book/create-book.component';
import { ReadBookComponent } from './components/read-book/read-book.component';
import { MyBooksComponent } from './components/my-books/my-books.component';
import { AllBookComponent } from './components/all-book/all-book.component';

const routes: Routes = [
  { path: '', redirectTo: '', pathMatch: 'full' },
  { path: 'searchBook', component: BookListComponent },
  { path: 'searchAllBook', component: AllBookComponent },
  { path: 'myBooks', component: MyBooksComponent },
  { path: 'createBook', component: CreateBookComponent },
  { path: 'createBook/:bookId', component: CreateBookComponent },
  { path: 'readBook/:bookId', component: ReadBookComponent },
  { path: 'signIn', component: LoginComponent },
  { path: 'signup', component: SignupComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
