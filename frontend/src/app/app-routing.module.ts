import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {BookComponent} from './components/add-book/book.component';
import {BooksComponent} from './components/books-list/books.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'books-list' },
  { path: 'add-book', component: BookComponent },
  { path: 'edit-book/:id', component: BookComponent },
  { path: 'books-list', component: BooksComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
