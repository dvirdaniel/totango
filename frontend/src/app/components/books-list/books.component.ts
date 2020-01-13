import {Component, OnInit, ViewChild} from '@angular/core';
import {ApiService} from '../../services/api.service';
import {MatPaginator, MatTableDataSource} from '@angular/material';
import {Book} from '../../model/book';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {

  bookData: any = [];
  dataSource: MatTableDataSource<Book>;
  genres;

  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  displayedColumns: string[] = ['_id', 'title', 'author', 'iSBN' , 'genre', 'price' , 'publicationDate', 'description', 'action'];

  constructor(private bookApi: ApiService) {
    this.initBooks();
    this.initGenres();
  }

  ngOnInit() { }

  initBooks() {
    this.bookApi.getBooks().subscribe(data => {
      this.bookData = data;
      this.dataSource = new MatTableDataSource<Book>(this.bookData);
      setTimeout(() => {
        this.dataSource.paginator = this.paginator;
      }, 0);
    });
  }

  initGenres() {
    this.bookApi.getGenres().subscribe(data => {
      this.genres = data;
    });
  }

  deleteBook(index: number, e): void {
    if (window.confirm('Are you sure you want to delete ' + e.title + '?')) {
      const data = this.dataSource.data;
      data.splice((this.paginator.pageIndex * this.paginator.pageSize) + index, 1);
      this.dataSource.data = data;
      this.bookApi.deleteBook(e._id).subscribe( result => {
        // If you want to notify user
        // window.alert('The book was deleted!');
        }
      );
    }
  }

  formatDate(e) {
    if (e) {
      return new Date(e).toLocaleDateString();
    }
  }

  getGenre(g) {
    if (this.genres) {
      return this.genres[g];
    }
  }

}
