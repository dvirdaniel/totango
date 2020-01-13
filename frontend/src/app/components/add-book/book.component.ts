import {Component, NgZone, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {ApiService} from '../../services/api.service';
import {Book} from '../../model/book';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {

  @ViewChild('chipList', { static: true } ) chipList;
  @ViewChild('resetBookForm', { static: true } ) myNgForm;
  bookForm: FormGroup;
  genres: any;
  bookId: any;

  constructor(
    public fb: FormBuilder,
    private router: Router,
    private actRoute: ActivatedRoute,
    private ngZone: NgZone,
    private bookApi: ApiService
  ) {
    this.handleAddOrEdit();
    this.initGenres();
  }

  ngOnInit() { }

  handleAddOrEdit() {
    this.bookId = this.actRoute.snapshot.paramMap.get('id');

    if (this.bookId) {
      this.bookApi.getBook(this.bookId).subscribe(data => {
        this.initBookForm(data);
      });
    } else {
      this.initBookForm(new Book());
    }
  }

  initGenres() {
    this.bookApi.getGenres().subscribe(data => {
      this.genres = data;
    });
  }

  /* Reactive book form */
  initBookForm(book: Book) {
    this.bookForm = this.fb.group({
      title: [book.title || '', [Validators.required]],
      author: [book.author || '', [Validators.required]],
      description: [book.description || '', []],
      iSBN: [book.iSBN || '', [Validators.required]],
      price: [book.price || '', [Validators.required, Validators.min(0)]],
      publicationDate: [book.publicationDate || '', [Validators.required]],
      genre: [book.genre || '', [Validators.required]]
    });
  }

  /* Get errors */
  public handleError = (controlName: string, errorName: string) => {
    return this.bookForm.controls[controlName].hasError(errorName);
  };

  /* Submit book */
  submitBookForm() {
    if (this.bookForm.valid) {
      if (this.bookId) {
        this.bookApi.updateBook(this.bookId, this.bookForm.value).subscribe(res => {
          this.ngZone.run(() => this.router.navigateByUrl('/books-list'));
        });
      } else {
        this.bookApi.addBook(this.bookForm.value).subscribe(res => {
          this.ngZone.run(() => this.router.navigateByUrl('/books-list'));
        });
      }
    }
  }

  getGenres() {
    if (this.genres) {
      return Object.keys(this.genres);
    }
  }

}
