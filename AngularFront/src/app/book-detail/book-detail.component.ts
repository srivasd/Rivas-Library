import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { BooksService } from '../services/books.service';
import { Book } from '../model/book.model';

import { ViewContainerRef } from '@angular/core';
import { TdDialogService } from '@covalent/core';

@Component({
      selector: 'app-book-detail',
      templateUrl: './book-detail.component.html'
})
export class BookDetailComponent {

    book: Book;

    constructor(private router: Router, activatedRoute: ActivatedRoute, private service: BooksService, private _dialogService: TdDialogService,
              private _viewContainerRef: ViewContainerRef) {

        let id = activatedRoute.snapshot.params['id'];
        service.getBook(id).subscribe(
            book => this.book = book,
            error => console.error(error)
        );
    }

    removeBook() {
        let okResponse = this._dialogService.openConfirm({
      message: 'You are going to delete this book. Do you agree?',
      viewContainerRef: this._viewContainerRef,
    }).afterClosed().subscribe((accept: boolean) => {
      if (accept) {
        this.service.removeBook(this.book).subscribe(
                book => this.router.navigate(['/books']),
                error => console.error(error)
        )
      }
    });
    }

    editBook() {
        this.router.navigate(['/books/edit', this.book.id ]);
    }

    gotoBooks() {
        this.router.navigate(['/books']);
    }
}
