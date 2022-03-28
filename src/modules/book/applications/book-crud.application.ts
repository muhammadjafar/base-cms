import { BookResponse } from '../responses/book.response';
import { BookCreateRequest } from '../requests/book-create.request';
import { BookService } from '../services/book.service';
import { Book } from 'src/models/book.model';
import { Injectable } from '@nestjs/common';

@Injectable()
export class BookCRUDApplication {
    constructor(private readonly bookService: BookService) {}

    async detail(id: number): Promise<BookResponse | any> {
        const book = await this.bookService.findById(id);
        return book;
    }

    async create(bookRequest: BookCreateRequest): Promise<BookResponse | any> {
        const newBook = new Book();
        Object.assign(newBook, bookRequest);

        const createdBook = await this.bookService.create(newBook);

        return createdBook;
    }

    async update(
        id: number,
        bookRequest: BookCreateRequest,
    ): Promise<BookResponse | any> {
        const oldBook = await this.bookService.findById(id);
        if (!oldBook) {
            return null;
        }

        const { title, content } = bookRequest;
        const createdBook = await this.bookService.update(oldBook, {
            title,
            content,
        });

        return createdBook;
    }

    async delete(id: number): Promise<boolean> {
        const oldBook = await this.bookService.findById(id);
        if (!oldBook) {
            return null;
        }

        await this.bookService.delete(oldBook);

        return true;
    }
}
