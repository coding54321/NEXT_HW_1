// book/src/book.service.ts
import { Injectable } from '@nestjs/common';
import { BookDto } from './book.model';

@Injectable()
export class BookService {
  private books: BookDto[] = [];

  addBook(book: BookDto): BookDto {
    this.books.push(book);
    return book;
  }

  getBooks(): BookDto[] {
    return this.books;
  }

  getBookById(id: number): BookDto | undefined {
    return this.books.find((book) => book.id === id);
  }

  updateBook(id: number, updatedBook: Partial<BookDto>): BookDto | undefined {
    const bookIndex = this.books.findIndex((book) => book.id === id);
    if (bookIndex !== -1) {
      const existingBook = this.books[bookIndex];
      this.books[bookIndex] = {
        ...existingBook,
        ...updatedBook,
        updatedAt: new Date(),
      };
      return this.books[bookIndex];
    }
    return undefined;
  }

  deleteBook(id: number): boolean {
    const bookIndex = this.books.findIndex((book) => book.id === id);
    if (bookIndex !== -1) {
      this.books.splice(bookIndex, 1);
      return true;
    }
    return false;
  }
}
