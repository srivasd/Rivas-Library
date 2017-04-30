import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { BooksService } from '../services/books.service';
import { Book } from '../model/book.model';

@Component({
    selector: 'app-book-list',
    templateUrl: './book-list.component.html'
})
export class BookListComponent implements OnInit {

    books: Book[];

    constructor(private router:Router, private service: BooksService) {}

    ngOnInit(){
      this.service.getBooks().subscribe(
        books => this.books = books,
        error => console.log(error)
      );
    }

    newBook() {
      this.router.navigate(['/books/new']);
    }
}
