import React, { Component } from 'react';
import { Book } from '../../Book';
import { BooksService } from '../../services/BooksService';
import { RouteComponentProps } from 'react-router';
import { RemoteBooksService } from '../../services/RemoteBooksService';
import { BookOverviewFC } from './BookOverviewFC';

export interface Props extends RouteComponentProps {
  bookService: BooksService
}

interface State {
  books: Book[];
}

export class BookOverviewContainer extends Component<Props, State> {
  state: State = {
    books: []
  };

  bookService: BooksService = new RemoteBooksService();

  componentDidMount(): void {
    this.bookService.findAll().then(books => this.setState({books}));
  }

  selectBook = (book: Book) => {
    this.props.history.push(`/book-app/book/${book.id}`);
  };

  render() {
    return (
      <BookOverviewFC books={this.state.books} selectBook={this.selectBook} />
    );
  }
}
