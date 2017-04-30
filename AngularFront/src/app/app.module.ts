import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { HttpModule, JsonpModule } from '@angular/http';

import { CovalentCoreModule } from '@covalent/core';
import { CovalentHttpModule } from '@covalent/http';
import { CovalentHighlightModule } from '@covalent/highlight';
import { CovalentMarkdownModule } from '@covalent/markdown';
import { CovalentDynamicFormsModule } from '@covalent/dynamic-forms';
import { CovalentDialogsModule } from '@covalent/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MdButtonModule, MdCheckboxModule} from '@angular/material';


import { AppComponent } from './app.component';
import { BookDetailComponent } from './book-detail/book-detail.component';
import { BookListComponent } from './book-list/book-list.component';
import { BookFormComponent } from './book-form/book-form.component';
import { BooksService } from './services/books.service';
import { routing } from './app.routing';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';

;

@NgModule({
  declarations: [AppComponent, BookDetailComponent, BookListComponent, BookFormComponent, FooterComponent, HeaderComponent],
  imports: [CovalentCoreModule, BrowserModule, FormsModule, HttpModule, JsonpModule, routing, CovalentHttpModule.forRoot(),
    CovalentHighlightModule,
    CovalentMarkdownModule,
    CovalentDynamicFormsModule, CovalentDialogsModule, BrowserAnimationsModule, MdButtonModule, MdCheckboxModule],
  providers: [BooksService],
  bootstrap: [AppComponent]
})
export class AppModule { }
