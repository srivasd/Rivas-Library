import { visitValue } from '@angular/compiler/src/util';
import { ValueProvider } from '@angular/core/core';
import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { BooksService } from '../services/books.service';
import { Book } from '../model/book.model';

import { ITdDynamicElementConfig, TdDynamicElement, TdDynamicType } from '@covalent/dynamic-forms';

@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
})
export class BookFormComponent {

  newBook: boolean;
  book: Book;
  books: Book[];


  constructor(private router: Router, activatedRoute: ActivatedRoute, private service: BooksService) {

    let id = activatedRoute.snapshot.params['id'];
    if (id) {
      service.getBook(id).subscribe(
        book => {this.book = book},
        error => console.error(error)
      );
      this.newBook = false;
    } else {
      this.book = { title: '', description: '' };
      this.newBook = true;
    }
  }

  cancel() {
    window.history.back();
  }

  save() {
    if(this.newBook){
    this.service.addBook(this.book).subscribe(
      book => {     
        window.history.back();
        this.service.getBooks().subscribe(
        books => this.books = books,
        error => console.log(error)
      );},
      error => console.error('Error creating new book: ' + error)
    );
    } else {
      this.service.updateBook(this.book).subscribe(
      book => {    
        window.history.back();
        this.service.getBooks().subscribe(
        books => this.books = books,
        error => console.log(error)
      ); },
      error => console.error('Error creating new book: ' + error)
    );
    }

  } 
}
