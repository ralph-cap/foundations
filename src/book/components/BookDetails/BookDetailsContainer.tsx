import { RouteComponentProps } from 'react-router';
import React, { Component } from 'react';
import { RemoteBooksService } from '../../services/RemoteBooksService';
import { Book } from '../../Book';
import { BooksService } from '../../services/BooksService';
import { BookDetails } from './BookDetails';

interface RouteParams {
  id: string;
}

interface BookDetailsContainerProps extends RouteComponentProps<RouteParams> {
}

interface BookDetailsContainerPropsState {
  book: Book
}

export class BookDetailsContainer extends Component<BookDetailsContainerProps, BookDetailsContainerPropsState> {

  newBook: Book = { title: "", authors: ""};

  state = {
    book: this.newBook
  };

  bookService: BooksService = new RemoteBooksService();

  componentDidMount(): void {
    const bookIdAsNumber = +this.props.match.params.id;
    if (isNaN(bookIdAsNumber)) {
      this.props.history.push('/book-app/book');
    } else {
      this.bookService.findOne(bookIdAsNumber).then(
        book => this.setState({book}),
        () => this.props.history.push('/book-app/book'));
    }
  }

  onBookChange = (book: Book): Promise<any> => {
    return this.bookService.save(book).then(
      () => this.props.history.push('/book-app/books'));
  }

  render() {
    return <BookDetails key={this.state.book.id} book={this.state.book} onBookChange={this.onBookChange}/>
  }
}
