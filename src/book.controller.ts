// book/src/book.controller.ts
import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { BookService } from './book.service';
import { BookDto } from './book.model';

@Controller('books')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Post()
  addBook(@Body() book: BookDto): BookDto {
    return this.bookService.addBook(book);
  }

  @Get()
  getBooks(): BookDto[] {
    return this.bookService.getBooks();
  }

  @Get(':id')
  getBookById(@Param('id') id: number): BookDto | undefined {
    return this.bookService.getBookById(Number(id));
  }

  @Put(':id')
  updateBook(
    @Param('id') id: number,
    @Body() updatedBook: Partial<BookDto>,
  ): BookDto | undefined {
    return this.bookService.updateBook(Number(id), updatedBook);
  }

  @Delete(':id')
  deleteBook(@Param('id') id: number): boolean {
    return this.bookService.deleteBook(Number(id));
  }
}
