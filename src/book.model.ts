// book/src/book.model.ts
export class BookDto {
  id: number;
  title: string;
  author: string;
  createdAt: Date;
  updatedAt: Date;
  isAvailable: boolean;

  constructor(
    id: number,
    title: string,
    author: string,
    createdAt: Date,
    updatedAt: Date,
    isAvailable: boolean,
  ) {
    this.id = id;
    this.title = title;
    this.author = author;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.isAvailable = isAvailable;
  }
}
